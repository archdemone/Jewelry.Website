const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function runLighthouse(url) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = {
    logLevel: 'info',
    output: 'json',
    onlyCategories: ['performance', 'accessibility', 'seo', 'best-practices'],
    port: chrome.port,
  };

  try {
    const runnerResult = await lighthouse(url, options);

    const scores = {
      performance: runnerResult.lhr.categories.performance.score * 100,
      accessibility: runnerResult.lhr.categories.accessibility.score * 100,
      seo: runnerResult.lhr.categories.seo.score * 100,
      bestPractices: runnerResult.lhr.categories['best-practices'].score * 100,
    };

    console.log('Lighthouse Scores:', scores);

    if (scores.performance < 90) throw new Error('Performance score too low');
    if (scores.accessibility < 95) throw new Error('Accessibility score too low');
    if (scores.seo < 100) throw new Error('SEO score too low');
  } finally {
    await chrome.kill();
  }
}

const urls = [
  'http://localhost:3000',
  'http://localhost:3000/products',
  'http://localhost:3000/products/diamond-solitaire-ring',
  'http://localhost:3000/cart',
  'http://localhost:3000/checkout',
];

urls.forEach((url) => runLighthouse(url));
