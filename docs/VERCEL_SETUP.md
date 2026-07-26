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

## 3. Add server-side environment variables

In **Project Settings -> Environment Variables**, add:

```text
APP_PASSWORD = your chosen private password
SESSION_SECRET = a long random secret
```

Select Production and Preview for both values. Do not add a `VITE_` prefix.

## 4. Redeploy

Open the latest deployment and choose Redeploy so the Functions and Routing Middleware receive the environment variables.

## 5. Use the app

Opening the production URL shows a blank login page with one password field. A correct password creates a secure session for 24 hours. Use **Log out / 退出登录** in the left sidebar to clear the session.
