# CMS Setup Guide

Your THINK website now has a Content Management System (CMS) powered by Decap CMS! This allows you and other team members to write and publish blog posts through a user-friendly interface.

## Accessing the CMS

Once deployed, access the CMS at: **`https://your-domain.com/admin`**

## Authentication Setup

The CMS uses GitHub for authentication. You need to set up a GitHub OAuth App (takes about 2 minutes):

### Step 1: Create a GitHub OAuth App

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: `THINK CMS`
   - **Homepage URL**: `https://your-vercel-domain.vercel.app` (or your custom domain)
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Click "Register application"
5. Copy your **Client ID** and **Client Secret**

### Step 2: Add OAuth App to Vercel

1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add these two variables:
   - `OAUTH_GITHUB_CLIENT_ID` = your Client ID
   - `OAUTH_GITHUB_CLIENT_SECRET` = your Client Secret
4. Redeploy your site

**Alternative: Use Netlify Identity (Even Simpler)**

If you prefer, you can deploy the CMS through Netlify instead:

1. Import your GitHub repo to Netlify (free)
2. Netlify automatically handles the OAuth for you
3. No manual OAuth setup needed!

## Using the CMS

### For You (Site Owner)

1. Visit `https://your-domain.com/admin`
2. Click "Login with GitHub"
3. Authorize the application
4. You'll see the CMS dashboard

### For Other Contributors

Anyone with write access to your GitHub repository can:

1. Visit the `/admin` URL
2. Log in with their GitHub account
3. Create/edit blog posts
4. Publish directly to the site

## Creating a Blog Post

1. In the CMS, click "Blog Posts" → "New Blog Post"
2. Fill in:
   - **Title**: Post title
   - **Description**: Brief summary
   - **Author**: Your name (defaults to Benjamin Breen)
   - **Date**: Publication date
   - **Tags**: Optional tags (e.g., "AI", "Pedagogy", "HistoryLens")
   - **Body**: Your post content (supports Markdown)
3. Click "Publish" when ready

The post will automatically:
- Create the proper file structure in GitHub
- Trigger a Vercel rebuild
- Appear on your blog within 1-2 minutes

## File Structure

Blog posts are stored in: `app/blog/[slug]/page.mdx`

The CMS automatically:
- Creates the folder structure
- Generates the MDX file
- Adds frontmatter metadata
- Handles image uploads (stored in `public/images/blog`)

## Editing Existing Posts

1. In the CMS, navigate to "Blog Posts"
2. Click on any post to edit
3. Make changes
4. Click "Publish" to save

Changes are committed to GitHub and trigger automatic redeployment.

## Local Development

To test the CMS locally:

1. Uncomment `local_backend: true` in `public/admin/config.yml`
2. Run `npx decap-server` in a terminal
3. Run `npm run dev` in another terminal
4. Visit `http://localhost:3000/admin`

## Troubleshooting

**"Error: Failed to load config.yml"**
- Make sure the site is deployed and the file exists at `/admin/config.yml`

**"Login failed"**
- Verify your GitHub OAuth App credentials in Vercel
- Check that the callback URL is correct

**"Cannot create post"**
- Ensure you have write access to the GitHub repository
- Check that the branch name in config.yml matches your repo

## No Subscription Needed!

- **Decap CMS**: 100% free and open source
- **GitHub**: Free for public repos
- **Vercel**: Free tier is plenty for this site
- **Total cost**: $0/month

---

For more help, see [Decap CMS Documentation](https://decapcms.org/docs/)
