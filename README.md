## Jewelry Website

Development setup:

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Lint: `npm run lint`
- Build: `npm run build`
- Start: `npm start`
- Run unit tests: `npm test`
- Run E2E tests: `npm run test:e2e`

Environment:

- Copy `.env.local.example` to `.env.local` and fill values
- For local SQLite: no variables required
- For auth (local dev) add at minimum:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```


Tech stack: Next.js (App Router) + TypeScript + Tailwind CSS + ESLint + Prettier.


