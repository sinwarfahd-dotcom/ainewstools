# Vercel Deployment Guide - AI News Tools

Your project is now prepared for deployment to Vercel. Follow these steps to go live.

## 1. Prerequisites (Supabase)
Since you mentioned you've already linked Supabase, ensure you have these two strings from your Supabase project settings (**Settings > Database**):
- **Transaction Connection String**: Used for `DATABASE_URL`.
- **Direct Connection String**: Used for `DIRECT_URL` (optional but recommended for migrations).

## 2. Vercel Environment Variables
Add the following variables in your **Vercel Project Settings > Environment Variables**:

| Variable | Value | Description |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgres://...` | Your Supabase connection string |
| `DIRECT_URL` | `postgres://...` | (Optional) Direct connection for migrations |
| `ADMIN_PASSWORD` | `azzi-admin-2026` | Password for your admin dashboard |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `your_cloud_name` | From Cloudinary dashboard |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | `your_preset` | From Cloudinary settings |
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` | Your Google Analytics ID |

## 3. Deployment Steps
1. **Push your code**: Push the latest changes to your GitHub/GitLab/Bitbucket repository.
2. **Import to Vercel**: If not already imported, create a new project on Vercel and select the repository.
3. **Build Settings**: Vercel should automatically detect Next.js. The build command is now `npx prisma generate && next build`.
4. **Deploy**: Click Deploy.

## 4. Database Setup (Initial Run)
Once the project is deployed, you might need to sync your local data or seed the database.
If your Supabase database is empty, you can run the seed script from your local terminal:
```bash
npx prisma db seed
```
*(Ensure your local `.env` is updated with the Supabase URL before running this)*

> [!CAUTION]
> Never share your `DATABASE_URL` or `ADMIN_PASSWORD` publicly.
