# Vercel Hobby Password Setup

## 1. Push the project to a private GitHub repository

From the project directory:

```bash
git init
git add .
git commit -m "Create private C2A agreement suite"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-PRIVATE-REPOSITORY.git
git push -u origin main
```

## 2. Import the repository into Vercel

Choose **Add New -> Project**, import the private GitHub repository, and deploy with the detected Vite settings.

## 3. Optional: add server-side environment variables for a custom gate

If you want to reintroduce a simple shared-password gate using the original middleware, add server-side environment variables in **Project Settings -> Environment Variables**. This project no longer requires these variables by default.

Do not add a `VITE_` prefix to server-side secrets.

## 4. Redeploy

Open the latest deployment and choose Redeploy so the Functions and Routing Middleware receive the environment variables.

## 5. Use the app

Open the production URL to access the agreement editors directly. Server-side environment variables are no longer required for access.
