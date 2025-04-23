// Server endpoint to check headers of a URL
// This helps debug X-Frame-Options issues in development

export default defineEventHandler(async (event) => {
  // Get URL from query parameters
  const query = getQuery(event);
  const { url } = query;
  
  if (!url) {
    return {
      statusCode: 400,
      body: { error: 'Missing URL parameter' }
    };
  }
  
  try {
    // Make a HEAD request to check headers
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        // Add headers that might be needed
        'User-Agent': 'Mozilla/5.0 (compatible; HeaderChecker/1.0)'
      }
    });
    
    // Convert headers to a plain object
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key.toLowerCase()] = value;
    });
    
    // Specifically check for X-Frame-Options
    const xFrameOptions = headers['x-frame-options'] || 'Not set';
    const contentSecurityPolicy = headers['content-security-policy'] || 'Not set';
    
    // Check if CSP contains frame-ancestors directive
    let frameAncestorsPolicy = 'None';
    if (contentSecurityPolicy !== 'Not set') {
      const cspParts = contentSecurityPolicy.split(';');
      for (const part of cspParts) {
        if (part.trim().startsWith('frame-ancestors')) {
          frameAncestorsPolicy = part.trim();
          break;
        }
      }
    }
    
    // Return relevant header information
    return {
      url,
      status: response.status,
      ok: response.ok,
      headers,
      embedding: {
        xFrameOptions,
        frameAncestorsPolicy,
        canEmbed: xFrameOptions === 'Not set' || 
                 (xFrameOptions.toLowerCase() !== 'deny' && 
                  xFrameOptions.toLowerCase() !== 'sameorigin')
      },
      recommendations: getRecommendations(xFrameOptions, frameAncestorsPolicy)
    };
  } catch (error) {
    console.error('Error checking headers:', error);
    return {
      statusCode: 500,
      error: 'Error checking headers',
      message: error.message
    };
  }
});

// Helper function to provide recommendations
function getRecommendations(xFrameOptions, frameAncestorsPolicy) {
  const recommendations = [];
  
  if (xFrameOptions !== 'Not set') {
    recommendations.push(
      'Create a Transform Rule in your Cloudflare dashboard to remove X-Frame-Options header: ' +
      '1. Go to Rules > Transform Rules > Create Transform Rule ' +
      '2. Set a filter for "url contains your-domain" ' +
      '3. Add a rewrite rule to "Remove" the "X-Frame-Options" header'
    );
  }
  
  if (frameAncestorsPolicy !== 'None' && !frameAncestorsPolicy.includes('*')) {
    recommendations.push(
      'Create a Transform Rule to modify the Content-Security-Policy header: ' +
      '1. Go to Rules > Transform Rules > Create Transform Rule ' +
      '2. Add a rewrite rule to "Rewrite" the "Content-Security-Policy" header ' +
      '3. Set value that includes "frame-ancestors \'self\' https://your-site.com"'
    );
  }
  
  return recommendations;
} 