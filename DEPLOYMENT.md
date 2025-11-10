# Stellar Property Group - Netlify Deployment Guide

## Prerequisites

1. A Supabase account and project (free tier works)
2. A Netlify account
3. Your GitHub repository connected to Netlify

## Step 1: Set Up Supabase (if not already done)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Once created, go to Project Settings > API
4. Copy these two values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (a long string starting with `eyJ...`)

## Step 2: Configure Netlify Environment Variables

1. Log in to your [Netlify dashboard](https://app.netlify.com)
2. Select your `stellarnew` site
3. Go to **Site Settings** > **Environment Variables**
4. Click **Add a variable** and add these two:

   **Variable 1:**
   - Key: `VITE_SUPABASE_URL`
   - Value: Your Supabase Project URL

   **Variable 2:**
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: Your Supabase anon/public key

5. Click **Save**

## Step 3: Trigger a New Deploy

1. Go to **Deploys** tab in Netlify
2. Click **Trigger deploy** > **Deploy site**
3. Wait for the build to complete

## Step 4: Set Up Custom Domain (Optional)

1. In Netlify, go to **Domain Settings**
2. Add your custom domain: `stellarpropertygroup.com`
3. Update your DNS settings at Hostinger:
   - Add a CNAME record pointing to your Netlify site URL
   - Or use Netlify's nameservers

## Troubleshooting

### Build fails with "Missing Supabase environment variables"
- Make sure both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set in Netlify
- Check for typos in the variable names (they're case-sensitive)

### Site loads but forms don't work
- Verify your Supabase project is active
- Check the browser console for errors
- Make sure the anon key has correct permissions

## Local Development

To run locally:

1. Create a `.env` file in the project root (use `.env.example` as template)
2. Add your Supabase credentials
3. Run `npm install`
4. Run `npm run dev`
5. Open http://localhost:5173
