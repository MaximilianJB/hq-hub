## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   
   Get these values from your Supabase project settings: https://app.supabase.com/project/_/settings/api

3. Run the app:
   ```bash
   npm run dev
   ```
