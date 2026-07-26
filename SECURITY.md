# Security Notes

- Never put `APP_PASSWORD` or `SESSION_SECRET` in React code or in variables beginning with `VITE_`.
- Configure secrets only in Vercel Environment Variables or a local `.env.local` file that is excluded by `.gitignore`.
- The login creates a signed, HttpOnly, Secure, SameSite=Strict cookie valid for 24 hours.
- The password gate is a lightweight shared-password system. It does not provide user accounts, audit logs, password recovery or strong brute-force protection.
- Customer agreement data remains in browser localStorage and is not encrypted. Use a private device and export backups.
