# Guide Thumbnails

This directory contains thumbnail images for the guides displayed on the `/guides` page.

## Usage

To add a thumbnail for a guide:

1. **Create an image** (recommended size: 800x600px or 4:3 aspect ratio)
2. **Name it after the guide ID** with a `.png`, `.jpg`, or `.webp` extension
3. **Place it in this directory**
4. **Update the guide entry** in `/app/guides/page.tsx` to include the thumbnail path

## Example

For a guide with ID `claude-code-basics`, you would:

1. Create an image named `claude-code-basics.png`
2. Place it in `/public/thumbnails/claude-code-basics.png`
3. Update the guide object in `/app/guides/page.tsx`:

```typescript
{
  id: 'claude-code-basics',
  title: 'Getting Started with Claude Code',
  // ... other properties
  thumbnail: '/thumbnails/claude-code-basics.png'
}
```

## Fallback Behavior

If no thumbnail is specified (or the `thumbnail` field is omitted), the guide card will display the traditional icon-based design.

## Current Guides

Guide IDs that can have thumbnails:
- `claude-code-basics`
- `prompt-engineering`
- `history-machine-intelligence`
- `building-simulations`
- `ai-assignments`
- `ai-historical-research`
- `critical-pedagogy`
- `responsible-ai-classroom`

## Image Specifications

- **Format**: PNG, JPG, or WebP
- **Recommended dimensions**: 800x600px (4:3 aspect ratio)
- **Max file size**: Keep under 500KB for optimal loading
- **Card display size**:
  - Card view: Full width of card, 192px height
  - List view: 128x96px
- **Optimization**: Images are automatically optimized by Next.js Image component
