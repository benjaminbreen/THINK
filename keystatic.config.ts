import { config, fields, collection } from '@keystatic/core'

export default config({
  storage: {
    // For local dev, use 'local'. For production with GitHub, use 'github'
    kind: process.env.NODE_ENV === 'development' ? 'local' : 'cloud',
  },
  cloud: {
    project: 'thinkucsc/think',
  },
  collections: {
    posts: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        description: fields.text({
          label: 'Description',
          description: 'A brief summary for the blog list and SEO',
          multiline: true,
        }),
        author: fields.select({
          label: 'Author',
          options: [
            { label: 'Benjamin Breen', value: 'Benjamin Breen' },
            { label: 'Pranav Anand', value: 'Pranav Anand' },
            { label: 'Zac Zimmer', value: 'Zac Zimmer' },
            { label: 'THINK Team', value: 'THINK Team' },
          ],
          defaultValue: 'THINK Team',
        }),
        date: fields.date({
          label: 'Publish Date',
          defaultValue: { kind: 'today' },
        }),
        tags: fields.multiselect({
          label: 'Tags',
          options: [
            { label: 'Announcement', value: 'Announcement' },
            { label: 'Tutorial', value: 'Tutorial' },
            { label: 'AI', value: 'AI' },
            { label: 'Pedagogy', value: 'Pedagogy' },
            { label: 'Research', value: 'Research' },
            { label: 'Event', value: 'Event' },
            { label: 'Project Update', value: 'Project Update' },
          ],
        }),
        image: fields.image({
          label: 'Featured Image',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        content: fields.mdx({
          label: 'Content',
        }),
      },
    }),
  },
})
