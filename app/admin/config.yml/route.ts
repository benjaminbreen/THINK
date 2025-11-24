import { NextResponse } from 'next/server'

// Set this to your Netlify site URL for Git Gateway auth
// e.g., 'https://think-cms.netlify.app'
const NETLIFY_SITE_URL = process.env.NETLIFY_SITE_URL || ''

const config = `backend:
  name: git-gateway
  branch: main
${NETLIFY_SITE_URL ? `  site_url: ${NETLIFY_SITE_URL}` : ''}

# For local development - run: npx decap-server
# Then uncomment the line below:
# local_backend: true

media_folder: "public/images/blog"
public_folder: "/images/blog"

# Simple publish mode (immediate commits)
publish_mode: simple

collections:
  - name: "blog"
    label: "Blog Posts"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    extension: "mdx"
    format: "frontmatter"
    fields:
      - label: "Title"
        name: "title"
        widget: "string"
        required: true

      - label: "Description"
        name: "description"
        widget: "string"
        required: true

      - label: "Author"
        name: "author"
        widget: "select"
        options:
          - "Benjamin Breen"
          - "Pranav Anand"
          - "Zac Zimmer"
          - "THINK Team"
        default: "THINK Team"

      - label: "Publish Date"
        name: "date"
        widget: "datetime"
        date_format: "YYYY-MM-DD"
        time_format: false
        required: true

      - label: "Tags"
        name: "tags"
        widget: "select"
        multiple: true
        options:
          - "Announcement"
          - "Tutorial"
          - "AI"
          - "Pedagogy"
          - "Research"
          - "Event"
          - "Project Update"
        required: false

      - label: "Featured Image"
        name: "image"
        widget: "image"
        required: false
        media_folder: "/public/images/blog"
        public_folder: "/images/blog"

      - label: "Body"
        name: "body"
        widget: "markdown"

    sortable_fields: ['date', 'title']

    view_filters:
      - label: "By Benjamin"
        field: author
        pattern: "Benjamin Breen"
      - label: "By Pranav"
        field: author
        pattern: "Pranav Anand"
      - label: "By Zac"
        field: author
        pattern: "Zac Zimmer"

  - name: "pages"
    label: "Pages"
    files:
      - label: "About Page Content"
        name: "about"
        file: "content/about.mdx"
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Body", name: "body", widget: "markdown" }
`

export async function GET() {
  return new NextResponse(config, {
    headers: {
      'Content-Type': 'text/yaml',
    },
  })
}
