Deploying the backend to Vercel

1) Connect the GitHub repository to Vercel
   - Go to https://vercel.com and import the project from your GitHub account.
   - Choose the `myNewBlog` repo and default settings.

2) Set environment variables in the Vercel project settings
   - `EMAIL_USER` = your Gmail address
   - `EMAIL_PASSWORD` = your Google App Password (4-group format)

3) Deploy
   - Trigger a deploy from Vercel UI or push to `main`.

4) After deploy
   - Note the deployment URL (e.g., https://my-new-blog.vercel.app).
   - Update your frontend `contact.html` fetch URL to point to `https://<your-vercel-url>/api/contact`.

Local testing
   - You can test the function locally with `vercel dev` (requires Vercel CLI).

Security note
   - Do NOT commit `.env` or credentials. Use Vercel environment variables.
