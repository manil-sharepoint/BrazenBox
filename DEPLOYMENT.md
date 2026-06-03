# BrazenBox Deployment

This app is ready for a simple free-tier launch with:

- Render Free Web Service for the Node/Express + React app.
- Supabase Free project for the Postgres database.

## 1. Create Supabase Database

1. Create a Supabase project.
2. Open the SQL editor.
3. Run `database/schema.sql`.
4. Copy these values from Project Settings > API:
   - Project URL
   - `service_role` secret key

Keep the service role key private. It belongs only on the server or hosting environment.

## 2. Local Environment

Create `.env` from `.env.example`:

```powershell
Copy-Item .env.example .env
```

Fill in:

```txt
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PORT=4174
```

Then run:

```powershell
powershell -ExecutionPolicy Bypass -File .\run-dev.ps1
```

Visit `http://127.0.0.1:5173`.

## 3. Render Deployment

Create a new Render Web Service from this repository.

Use:

```txt
Build Command: npm install && npm run build
Start Command: npm start
```

Set environment variables:

```txt
NODE_VERSION=20
SUPABASE_URL=your Supabase project URL
SUPABASE_SERVICE_ROLE_KEY=your Supabase service role key
RESEND_API_KEY=your Resend API key
RESEND_FROM=BrazenBox <your-verified-sender@yourdomain.com>
PROJECT_REQUEST_RECIPIENT=roy.manil@gmail.com
```

The Express server serves the built React app from `dist` in production and handles API routes under `/api`.

## 4. Verify

After deployment:

- Open `/api/health`; it should return `"database":"supabase"`.
- It should return `"email":"resend"` when Resend is configured.
- Submit the contact form.
- Check the `demo_requests` table in Supabase.

## Notes

The app falls back to in-memory demo data only when Supabase env vars are missing. For production, always configure Supabase.
