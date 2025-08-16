// tools/audit-images.mjs
import fs from "fs/promises";
import path from "path";
import puppeteer from "puppeteer";

const BASE = process.env.AUDIT_BASE_URL || "http://localhost:3000";
// Optional: comma-separated relative paths to crawl (e.g. "/,/products/ring")
const EXTRA = (process.env.AUDIT_PATHS || "").split(",").map(s => s.trim()).filter(Boolean);

const PAGES = ["/", ...EXTRA].map(p => p.startsWith("http") ? p : new URL(p, BASE).toString());

function htmlEscape(s){return s.replace(/[&<>"]/g, c=>({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;" }[c]));}

async function auditPage(page, url) {
  await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });

  // Audits <img> and CSS background-image elements
  const results = await page.evaluate(async () => {
    const all = [];

    // helper to resolve bg image URLs and measure intrinsic size
    async function getImageNaturalSize(src) {
      return new Promise(resolve => {
        const img = new Image();
        img.onload = () => resolve({ naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
        img.onerror = () => resolve({ naturalWidth: 0, naturalHeight: 0 });
        img.src = src;
      });
    }

    // 1) <img> elements
    const imgs = Array.from(document.querySelectorAll("img"));
    for (const el of imgs) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const dpr = window.devicePixelRatio || 1;
      const naturalWidth = el.naturalWidth || 0;
      const naturalHeight = el.naturalHeight || 0;
      const renderedWidth = rect.width;
      const renderedHeight = rect.height;

      // currentSrc gives the selected candidate from srcset
      const src = el.currentSrc || el.src || "";
      const scaleFactor =
        naturalWidth > 0 ? (renderedWidth * dpr) / naturalWidth : (renderedWidth > 0 ? Infinity : 0);

      all.push({
        type: "img",
        selector: el.outerHTML.slice(0, 200),
        src,
        renderedWidth: Math.round(renderedWidth),
        renderedHeight: Math.round(renderedHeight),
        naturalWidth,
        naturalHeight,
        dpr,
        scaleFactor: Number.isFinite(scaleFactor) ? +scaleFactor.toFixed(3) : scaleFactor,
        notes: style.filter && style.filter !== "none" ? `CSS filter active: ${style.filter}` : ""
      });
    }

    // 2) Elements with background-image
    const bgEls = Array.from(document.querySelectorAll("*")).filter(el => {
      const bg = getComputedStyle(el).backgroundImage;
      return bg && bg !== "none";
    });

    for (const el of bgEls) {
      const rect = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      const dpr = window.devicePixelRatio || 1;

      const bg = style.backgroundImage; // may contain multiple image-set or multiple urls
      // Try to extract first url(...) occurrence
      const m = bg.match(/url\((['"]?)(.*?)\1\)/);
      const src = m ? m[2] : "";

      let naturalWidth = 0, naturalHeight = 0;
      if (src) {
        const dims = await getImageNaturalSize(src);
        naturalWidth = dims.naturalWidth;
        naturalHeight = dims.naturalHeight;
      }

      const renderedWidth = rect.width;
      const renderedHeight = rect.height;
      const scaleFactor =
        naturalWidth > 0 ? (renderedWidth * dpr) / naturalWidth : (renderedWidth > 0 ? Infinity : 0);

      all.push({
        type: "background",
        selector: el.outerHTML.slice(0, 200),
        src,
        renderedWidth: Math.round(renderedWidth),
        renderedHeight: Math.round(renderedHeight),
        naturalWidth,
        naturalHeight,
        dpr,
        scaleFactor: Number.isFinite(scaleFactor) ? +scaleFactor.toFixed(3) : scaleFactor,
        notes: `background-size: ${style.backgroundSize};`
      });
    }

    return all;
  });

  // Try to fetch header info for each resource (best effort)
  const withHeaders = [];
  for (const r of results) {
    let contentType = "", contentLength = "";
    try {
      if (r.src && r.src.startsWith("http")) {
        const res = await page.evaluate(async (u) => {
          try {
            const resp = await fetch(u, { method: "HEAD" });
            return {
              contentType: resp.headers.get("content-type") || "",
              contentLength: resp.headers.get("content-length") || ""
            };
          } catch {
            return { contentType: "", contentLength: "" };
          }
        }, r.src);
        contentType = res.contentType;
        contentLength = res.contentLength;
      }
    } catch {}
    withHeaders.push({ page: url, ...r, contentType, contentLength });
  }

  return withHeaders;
}

async function main() {
  const outDir = path.join("tools");
  await fs.mkdir(outDir, { recursive: true });

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();

  const all = [];
  for (const url of PAGES) {
    try {
      const res = await auditPage(page, url);
      all.push(...res);
    } catch (e) {
      all.push({ page: url, error: String(e) });
    }
  }
  await browser.close();

  // Save JSON
  const jsonPath = path.join(outDir, "audit-images.json");
  await fs.writeFile(jsonPath, JSON.stringify(all, null, 2), "utf8");

  // Build quick HTML report
  const rows = all.map(r => {
    if (r.error) {
      return `<tr style="background:#ffe0e0"><td>${htmlEscape(r.page)}</td><td colspan="9">${htmlEscape(r.error)}</td></tr>`;
    }
    const color =
      !isFinite(r.scaleFactor) ? "#fff3cd"
      : r.scaleFactor > 1.0 ? "#ffe0e0"
      : r.scaleFactor > 0.95 ? "#fff3cd"
      : "#e9ffe9";

    const notes = [];
    if (r.scaleFactor > 1.0) notes.push("Upscaled → likely blur");
    if (r.naturalWidth && r.renderedWidth && r.dpr && r.naturalWidth < r.renderedWidth * r.dpr) {
      notes.push(`Asset too small for DPR=${r.dpr}`);
    }
    if (r.notes) notes.push(r.notes);

    return `<tr style="background:${color}">
      <td>${htmlEscape(r.page)}</td>
      <td>${htmlEscape(r.type)}</td>
      <td><code>${htmlEscape(r.src || "")}</code></td>
      <td>${r.renderedWidth}×${r.renderedHeight}</td>
      <td>${r.naturalWidth}×${r.naturalHeight}</td>
      <td>${r.dpr}</td>
      <td>${r.scaleFactor}</td>
      <td>${htmlEscape(r.contentType || "")}</td>
      <td>${htmlEscape(r.contentLength || "")}</td>
      <td>${htmlEscape(notes.join(" | "))}</td>
    </tr>`;
  }).join("\n");

  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Image Audit Report</title>
<style>
  body{font-family:system-ui,Segoe UI,Arial,sans-serif;padding:16px}
  table{border-collapse:collapse;width:100%}
  th,td{border:1px solid #ddd;padding:8px;font-size:14px;vertical-align:top}
  th{background:#f5f5f5;position:sticky;top:0}
  code{white-space:nowrap}
</style>
</head>
<body>
  <h1>Image Audit Report</h1>
  <p>Base: <strong>${htmlEscape(BASE)}</strong></p>
  <table>
    <thead>
      <tr>
        <th>Page</th>
        <th>Type</th>
        <th>URL</th>
        <th>Rendered (CSS px)</th>
        <th>Natural (px)</th>
        <th>DPR</th>
        <th>ScaleFactor</th>
        <th>Content-Type</th>
        <th>Bytes</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  <p style="margin-top:16px;color:#666">Red = upscaled (>1.0). Yellow ≈ borderline (0.95–1.0). Green = OK.</p>
</body>
</html>`;

  const htmlPath = path.join(outDir, "audit-images.html");
  await fs.writeFile(htmlPath, html, "utf8");

  // Summary to console
  const offenders = all.filter(r => !r.error && isFinite(r.scaleFactor) && r.scaleFactor > 1.0);
  if (offenders.length) {
    console.log(`❌ ${offenders.length} images appear soft (upscaled). See tools/audit-images.html`);
  } else {
    console.log("✅ No upscaled images detected. If it still looks soft, the source asset is likely the bottleneck.");
  }

  // Extra explicit verdict if top offender is too small:
  const worst = offenders.sort((a,b) => b.scaleFactor - a.scaleFactor)[0];
  if (worst) {
    const need = Math.round(worst.renderedWidth * worst.dpr);
    console.log(`Top offender needs at least ~${need}px width for DPR=${worst.dpr}. Current natural width=${worst.naturalWidth}px.`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
