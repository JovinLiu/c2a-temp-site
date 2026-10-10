# Security Notes

- This project does not include a built-in authentication mechanism by default. If you add one, do not put secrets in React code or in variables beginning with `VITE_`.
- Configure any server-side secrets in your hosting provider's environment variables or a local `.env.local` file that is excluded by `.gitignore`.
- Customer agreement data remains in browser localStorage and is not encrypted. Use a private device and export backups.
