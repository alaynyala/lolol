# Cloudflare Stream Setup Guide

This guide explains how to set up Cloudflare Stream for embedding videos in iframes while avoiding X-Frame-Options restrictions.

## The Problem

When embedding Cloudflare Stream videos in iframes, you might encounter this error:

```
Refused to display 'https://iframe.cloudflarestream.com/' in a frame because it set 'X-Frame-Options' to 'sameorigin'.
```

This happens because Cloudflare's default security settings prevent embedding videos on external domains.

## Solution 1: Direct Video Element

We've implemented a direct video approach in the `CloudflareStream.vue` component for case study hero videos. This bypasses the iframe restriction by using a direct video element.

## Solution 2: Create a Cloudflare Transform Rule

For a proper fix that enables all iframe embedding to work, follow these steps to create a Transform Rule in your Cloudflare dashboard:

1. Log in to your Cloudflare dashboard
2. Select your domain
3. Go to **Rules** > **Transform Rules**
4. Click **Create Transform Rule**
5. Set up the rule:
   - **Rule name**: `Allow Stream Embedding`
   - **When incoming requests match...**: 
     ```
     (http.host eq "iframe.cloudflarestream.com")
     ```
   - **Then...**: 
     - Select **Remove** for HTTP Response Header
     - Header name: `x-frame-options`
6. Click **Deploy**

## Solution 3: Modify Your CSP Header

If you're using a Content Security Policy, you might also need to update it:

1. In the Cloudflare dashboard, go to **Rules** > **Transform Rules**
2. Click **Create Transform Rule**
3. Set up the rule:
   - **Rule name**: `Stream CSP Fix`
   - **When incoming requests match...**: 
     ```
     (http.host eq "iframe.cloudflarestream.com")
     ```
   - **Then...**: 
     - Select **Set** for HTTP Response Header
     - Header name: `content-security-policy`
     - Value: `frame-ancestors 'self' https://your-domain.com https://*.your-domain.com`
4. Click **Deploy**

## Verifying the Fix

After setting up the transform rules, you can use the debug mode in the CloudflareStream component to verify that the X-Frame-Options header is removed:

```vue
<CloudflareStream 
  videoId="your-video-id" 
  videoType="caseStudyHero" 
  :debug="true"
/>
```

The debug panel will show you if the X-Frame-Options header is still present.

## Debugging Display Issues

If you encounter display issues with Cloudflare Stream videos:

1. **Check CSS Sizing**: 
   - Make sure container elements have appropriate width and height values
   - Set `width: 100%` to ensure videos span the full width of containers
   - Use `object-fit: cover` to maintain aspect ratio while filling the container

2. **Iframe Embedding**:
   - For case study hero videos, use the `videoType="caseStudyHero"` property
   - Ensure parent elements have a set aspect ratio (e.g., use `aspect-ratio: 16/9`)
   - For direct iframes, add `allowfullscreen` and appropriate `allow` attributes

3. **Console Errors**:
   - `ERR_BLOCKED_BY_CLIENT` errors are normal - these are Cloudflare analytics being blocked by adblockers
   - 404 errors for direct MP4 access are expected - use the iframe embed URLs instead

4. **Responsive Design**:
   - For mobile designs, ensure containers are properly sized with `!important` rules where needed
   - Use media queries to adjust video display on smaller screens

5. **Content Styles**:
   - When using CloudflareStream in markdown content, ensure CSS selectors properly target the component
   - Add specific styles for `.video-container .cloudflare-stream-container` to control the component's appearance

## API Token Security

Remember to keep your API token secure by using server-side endpoints for any authenticated requests. Never include your API token in client-side code.

## Additional Resources

- [Cloudflare Stream Documentation](https://developers.cloudflare.com/stream/)
- [Cloudflare Transform Rules](https://developers.cloudflare.com/rules/transform/) 