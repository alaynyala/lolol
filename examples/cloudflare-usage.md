---
title: "Cloudflare Stream Examples"
---

# Cloudflare Stream Usage Examples

## Using Just the Video ID

You can now use Cloudflare Stream videos in your markdown by just specifying the ID:

```markdown
<!-- Using the full component name -->
<CloudflareStream videoId="e3fa7f6840ea4c68a24530d34fc79ec1" height="500px" />

<!-- Using the shorter alias -->
<CFVideo videoId="e3fa7f6840ea4c68a24530d34fc79ec1" height="500px" />
```

## Example in Action

Here's how it looks:

<CloudflareStream 
  videoId="e3fa7f6840ea4c68a24530d34fc79ec1" 
  height="500px" 
  :controls="true"
/>

## Customizing the Video

You can customize various aspects of the video:

```markdown
<CFVideo 
  videoId="e3fa7f6840ea4c68a24530d34fc79ec1" 
  height="500px"
  width="100%"
  objectFit="cover"
  borderRadius="0.5rem"
  :controls="true"
  :loop="true"
  :muted="false"
/>
```

## Using in Case Studies

For your case studies, you can now use the simplified syntax in your frontmatter:

```markdown
---
title: "Project Name"
# ...other fields
featured_video: "/videos/local-video.webm"  # For local videos
landing_video: "e3fa7f6840ea4c68a24530d34fc79ec1"  # Just the Cloudflare ID
--- 