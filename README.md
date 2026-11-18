Build command:

```bash
cd client && npm ci && npm run build && cd ../server && npm ci && npx prisma migrate deploy && npx prisma generate && node ./scripts/seed.js
```

Run:

```bash
node server/app.js
```

Express will serve both frontend and backend.
