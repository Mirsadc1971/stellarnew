# Stellar Property Group Website

Modern React + TypeScript website for Stellar Property Group - Chicago's premier property management company.

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Web3Forms (free email service):
   - Go to [web3forms.com](https://web3forms.com)
   - Get a free access key
   - Replace `YOUR_WEB3FORMS_ACCESS_KEY` in:
     - `src/components/ContactForm.tsx`
     - `src/components/ViolationReportForm.tsx`

3. Run locally:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deploy to Netlify

1. Push code to GitHub
2. Connect repository to Netlify
3. Build settings are already configured in `netlify.toml`
4. No environment variables needed!

## Features

- Contact form with conditional fields
- Violation report form
- Board nomination application
- Fully responsive design
- Modern UI with Tailwind CSS
- TypeScript for type safety

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Lucide Icons
- Web3Forms (email service)
