# CMS Setup Guide

Blog posts on this site are edited through [Keystatic](https://keystatic.com), a
Git-based CMS. There is no database — every post is an MDX file committed to this
repository, so the editor is just a friendlier way to write those files.

The configuration lives in [`keystatic.config.ts`](./keystatic.config.ts).

## Where the editor lives

| Environment | URL | Where edits go |
| --- | --- | --- |
| Local development | `http://localhost:3000/keystatic` | Straight to your working copy on disk |
| Production | `https://<your-domain>/keystatic` | Keystatic Cloud → a commit in this repo |

The editor route is marked `noindex, nofollow`, so it will not appear in search
results.

## Editing locally

No accounts or tokens are needed — `storage.kind` is `local` whenever
`NODE_ENV === 'development'`.

```bash
npm run dev
# then open http://localhost:3000/keystatic
```

Saving in the editor writes directly to `content/blog/`. The changes show up as
ordinary modified files in `git status`, and you commit them like any other work.

## Editing in production

In production the config switches to `storage.kind: 'cloud'`, backed by the
Keystatic Cloud project `thinkucsc/think`. Contributors need to be invited to
that project before they can sign in; see the
[Keystatic Cloud docs](https://keystatic.com/docs/cloud) for managing access.

Publishing from the editor commits to this repository, which triggers a Vercel
rebuild. New posts are usually live within a couple of minutes.

## What a blog post contains

The `posts` collection writes one MDX file per post to `content/blog/`, with
these fields:

| Field | Type | Notes |
| --- | --- | --- |
| Title | slug | Also determines the filename and URL |
| Description | text (multiline) | Used on the blog index and for SEO |
| Author | select | Benjamin Breen, Pranav Anand, Zac Zimmer, or THINK Team |
| Publish Date | date | Defaults to today |
| Tags | multiselect | Announcement, Tutorial, AI, Pedagogy, Research, Event, Project Update |
| Featured Image | image | Uploaded to `public/images/blog/`, served from `/images/blog/` |
| Content | mdx | The body of the post |

Everything except Content is stored as YAML frontmatter; Content becomes the
body of the file.

## Adding a post by hand

The editor is optional. Creating `content/blog/my-post.mdx` with matching
frontmatter works exactly the same way:

```mdx
---
title: My Post Title
description: A brief summary for the blog list and SEO.
author: Benjamin Breen
date: 2025-11-24
tags:
  - Pedagogy
  - AI
image: /images/blog/my-post/hero.jpg
---

Your post content here. MDX means you can use React components as well as
Markdown.
```

Posts are read by [`lib/blog.ts`](./lib/blog.ts), which parses the frontmatter and
sorts by date.

## Changing the fields

Edit the `schema` for the `posts` collection in `keystatic.config.ts`. Adding an
author or a tag, for instance, means adding an entry to that field's `options`
array. Fields are documented in the
[Keystatic field reference](https://keystatic.com/docs/fields).

## Troubleshooting

**The editor is empty in production.** Check that your account has been added to
the `thinkucsc/think` Keystatic Cloud project.

**Local edits are not appearing on the site.** Local storage writes to disk but
does not commit. Check `git status` — your changes are there, waiting to be
committed and pushed.

**A post is missing from `/blog`.** Confirm the file is in `content/blog/`, ends
in `.mdx`, and has a valid `date` in its frontmatter.

## Cost

Keystatic is open source and free to self-host in local mode. Keystatic Cloud
has a free tier; see [their pricing](https://keystatic.com/docs/cloud) for
current limits.
