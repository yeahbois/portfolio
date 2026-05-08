# Supabase Setup Instructions

To set up the database for your portfolio, follow these steps:

1.  **Login to Supabase:** Go to the [Supabase Dashboard](https://app.supabase.com/) and select your project.
2.  **Open SQL Editor:** In the left sidebar, click on "SQL Editor".
3.  **Create a New Query:** Click "New query" or "Create a new blank query".
4.  **Copy and Paste:** Open the `supabase_migration.sql` file in this repository, copy its entire contents, and paste it into the Supabase SQL editor.
5.  **Run the Query:** Click the "Run" button (or press Cmd+Enter / Ctrl+Enter).
6.  **Verify Tables:** Once the query completes successfully, you should see three new tables (`experience`, `projects`, `skills`) in your Database Table Editor with the initial data.

### Environment Variables

Ensure your `.env.local` (or equivalent) contains the following:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_secure_admin_password
```
