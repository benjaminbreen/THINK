# Thumbnails

Card images for guides, projects, and pedagogy assignments.

## Specifications

| | |
| --- | --- |
| Format | WebP |
| Aspect ratio | 16:10 — cards crop to this, so compose for it |
| Width | Up to 1400px |
| File size | Aim for under 300KB |

Next/Image generates the responsive variants at request time, and
`next.config.mjs` caps `deviceSizes` at 1200px. A source wider than ~1400px adds
repository weight without improving what anyone sees.

To convert and resize a new image:

```bash
npx sharp-cli --input source.png --output ./ resize 1400 --withoutEnlargement \
  --format webp --quality 82
```

## Naming

The filename must match the item's id or slug.

**Projects** resolve their thumbnail automatically from the slug — no wiring
needed. `slug: 'young-darwin'` loads `/thumbnails/young-darwin.webp`.

**Guides** need an explicit path in the `guides` array in `app/guides/page.tsx`:

```typescript
{
  id: 'claude-code-basics',
  title: 'Getting Started with Claude Code',
  // ...
  thumbnail: '/thumbnails/claude-code-basics.webp'
}
```

**Assignments** take a `thumbnailPath` in the `assignments` array in
`app/pedagogy/page.tsx`.

## Fallback behaviour

If a file is missing or fails to load, the card falls back gracefully — guides
show their icon, assignments show a muted placeholder. Nothing breaks, but the
browser still requests the missing file, so remove dead references rather than
relying on the fallback.

## Known gap

`historylens.webp` is referenced by `app/projects/historylens/page.tsx` and
`lib/tags-data.ts` but does not exist in this directory, so those pages request
a file that 404s and fall back. Adding the image resolves it.
