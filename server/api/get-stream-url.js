// This is a server API route that will securely handle Cloudflare authentication
// The API token is only stored server-side and never exposed to clients

export default defineEventHandler(async (event) => {
  try {
    // Get the videoId from the query parameters
    const query = getQuery(event);
    const { videoId } = query;
    
    if (!videoId) {
      return {
        statusCode: 400,
        body: { error: 'Missing videoId parameter' }
      };
    }
    
    // Your Cloudflare API token (store this in .env variables)
    // DO NOT hardcode this - use environment variables
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    
    // Make a request to Cloudflare API to get a signed URL if needed
    // This is just an example - you may need to adjust based on your needs
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/{account_id}/stream/${videoId}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      return {
        statusCode: 500,
        body: { error: 'Failed to retrieve video information' }
      };
    }
    
    // Return only what's needed by the client
    return {
      embedUrl: `https://iframe.cloudflarestream.com/${videoId}?autoplay=true&muted=true&loop=true&controls=false&preload=auto`,
      thumbnailUrl: `https://videodelivery.net/${videoId}/thumbnails/thumbnail.jpg`
    };
  } catch (error) {
    console.error('Error retrieving stream URL:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal server error' }
    };
  }
}); 