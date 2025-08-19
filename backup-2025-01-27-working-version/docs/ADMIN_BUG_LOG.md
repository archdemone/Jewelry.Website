# Admin Bug Log

| Page | Steps to Reproduce | Expected | Actual | Root Cause | Fix PR/Commit | Status |
|------|---------------------|----------|--------|------------|---------------|--------|
| Admin → Products | View list; check Gem Details column | Gem color chip with background matching color and readable text | Black background with small dot | No contrast-aware color chip | Implemented `ColorChip` and `readableTextColor` utility; updated list | Fixed |
| Admin → Products → New | Hover gem colors | See hover preview image | No hover image or inconsistent behavior | Inline button rendering lacked preview handling | New `GemColorSelector` component with hover preview | Fixed |
| Admin → Products → New | Upload image | Thumbnail preview and remove | No upload | Missing file input handling | New `ImageUpload` with drag & drop and previews | Fixed |
| Admin → Products → New → Save | After save, go back to list | New ring appears in list | New ring missing | No persistence layer | Persist new items to `localStorage` and load on products page | Fixed |
| Admin Layout | Footer visible on admin pages | No footer on admin | Footer rendered from root layout | Global footer unconditionally rendered | Added `ConditionalFooter` using `usePathname()` | Fixed |

Add new rows as we iterate.
