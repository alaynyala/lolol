// This is a server API route that will securely handle Cloudflare Images authentication
// The API token is only stored server-side and never exposed to clients

export default defineEventHandler(async (event) => {
  try {
    // Get the imageId from the query parameters
    const query = getQuery(event);
    const { imageId } = query;
    
    if (!imageId) {
      return {
        statusCode: 400,
        body: { error: 'Missing imageId parameter' }
      };
    }
    
    // Your Cloudflare API token (store this in .env variables)
    // DO NOT hardcode this - use environment variables
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    
    // Cloudflare account ID (also store in .env)
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    
    // Make a request to Cloudflare API to get image details if needed
    // This is just an example - you may need to adjust based on your needs
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v1/${imageId}`, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (!data.success) {
      return {
        statusCode: 500,
        body: { error: 'Failed to retrieve image information' }
      };
    }
    
    // Return the public URL that can be used by the client
    return {
      // Use the format that works with your account
      imageUrl: `https://imagedelivery.net/XPp5SsZ1VHMdZq-5zMXYKA/${imageId}/public`,
      variants: data.result.variants
    };
  } catch (error) {
    console.error('Error retrieving image URL:', error);
    return {
      statusCode: 500,
      body: { error: 'Internal server error' }
    };
  }
}); 