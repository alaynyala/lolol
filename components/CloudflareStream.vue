<template>
  <div class="cloudflare-stream-container" :class="{ 'case-study-hero': videoType === 'caseStudyHero' }" :style="containerStyle" :data-video-id="videoIdValue">
    <!-- For Cloudflare Stream videos - default -->
    <iframe 
      v-if="isCloudflareUrl && videoType === 'default'"
      :src="embedUrl"
      style="height:100%; width:auto; min-width:180%; border:none; object-position:center;"
      class="stream-media"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="Cloudflare Stream Video"
      data-player-type="cloudflare"
      :data-video-id="videoIdValue"
    ></iframe>
    
    <!-- For case study hero videos (using direct embed link) -->
    <div v-else-if="isCloudflareUrl && videoType === 'caseStudyHero'" class="case-study-hero-video">
      <iframe
        :src="embedUrl"
        class="cs-video-direct"
        allowfullscreen
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        data-player-type="cloudflare-hero-direct"
        :data-video-id="videoIdValue"
      ></iframe>
    </div>
    
    <!-- For local video files -->
    <video 
      v-else
      :src="videoId"
      :poster="posterUrl"
      class="stream-media"
      :autoplay="autoplay"
      :muted="muted"
      :loop="loop"
      :controls="controls"
      playsinline
      controlsList="noremoteplayback"
      style="height:100%; width:auto; min-width:130%; object-position:center;"
    ></video>
    
    <!-- Debug panel - only shown when debug prop is true -->
    <div v-if="debug" class="debug-panel">
      <h3>Cloudflare Stream Debug</h3>
      <div class="debug-status">
        <strong>Video ID:</strong> {{ videoIdValue }}<br>
        <strong>URL Type:</strong> {{ isCloudflareUrl ? 'Cloudflare' : 'External' }}<br>
        <strong>Video Type:</strong> {{ videoType }}<br>
        <strong>Embed Status:</strong> {{ iframeStatus }}
      </div>
      
      <div class="debug-notes">
        <p class="debug-note">Note: ERR_BLOCKED_BY_CLIENT errors for Cloudflare beacons are normal and can be ignored. These are analytics requests that may be blocked by ad blockers.</p>
      </div>
      
      <div v-if="headerInfo" class="debug-headers">
        <h4>Header Information</h4>
        <div><strong>Status:</strong> {{ headerInfo.status }} ({{ headerInfo.ok ? 'OK' : 'Error' }})</div>
        
        <div class="header-security">
          <h5>Security Headers</h5>
          <div :class="{'header-warning': headerInfo.embedding.xFrameOptions !== 'Not set'}">
            <strong>X-Frame-Options:</strong> {{ headerInfo.embedding.xFrameOptions }}
          </div>
          <div :class="{'header-warning': headerInfo.embedding.frameAncestorsPolicy !== 'None' && !headerInfo.embedding.frameAncestorsPolicy.includes('*')}">
            <strong>CSP Frame-Ancestors:</strong> {{ headerInfo.embedding.frameAncestorsPolicy }}
          </div>
          <div :class="{'header-success': headerInfo.embedding.canEmbed, 'header-error': !headerInfo.embedding.canEmbed}">
            <strong>Can Embed:</strong> {{ headerInfo.embedding.canEmbed ? 'Yes' : 'No' }}
          </div>
        </div>
        
        <div v-if="headerInfo.recommendations && headerInfo.recommendations.length > 0" class="recommendations">
          <h5>Recommendations</h5>
          <ul>
            <li v-for="(rec, index) in headerInfo.recommendations" :key="index">{{ rec }}</li>
          </ul>
        </div>
      </div>
      
      <button @click="recheckHeaders" class="debug-button">Recheck Headers</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: false,
    default: undefined
  },
  // Add alternative lowercase prop for markdown compatibility
  videoid: {
    type: String,
    default: undefined
  },
  posterUrl: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '110%'
  },
  width: {
    type: String,
    default: '100%'
  },
  objectFit: {
    type: String,
    default: 'cover'
  },
  borderRadius: {
    type: String,
    default: '0.33rem'
  },
  opacity: {
    type: Number,
    default: 1
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  muted: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  controls: {
    type: Boolean,
    default: false
  },
  videoType: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'caseStudyHero'].includes(value)
  },
  useAuthentication: {
    type: Boolean,
    default: false
  },
  debug: {
    type: Boolean,
    default: false
  }
});

// Use either videoId or videoid (lowercase)
const effectiveVideoId = computed(() => {
  // Add debug logging to see what's happening
  console.log('Props received:', {
    videoId: props.videoId,
    videoid: props.videoid,
    allProps: { ...props }
  });
  
  const id = props.videoId || props.videoid || '';
  
  if (!id) {
    console.warn('No video ID provided (neither videoId nor videoid). This will cause errors.');
  } else {
    console.log('Using effective video ID:', id);
  }
  
  return id;
});

// Authenticated URL data from API (if needed)
const authData = ref(null);
// Debug information
const headerInfo = ref(null);
const iframeStatus = ref('Loading...');

// Combined container style object
const containerStyle = computed(() => {
  return {
    width: props.width,
    height: props.height,
    borderRadius: props.borderRadius,
    opacity: props.opacity,
  };
});

// Check if the URL is a Cloudflare Stream URL or a Cloudflare Stream ID
const isCloudflareUrl = computed(() => {
  if (!effectiveVideoId.value) return false;
  
  // If it contains cloudflarestream.com, it's definitely a CF URL
  if (effectiveVideoId.value.includes('cloudflarestream.com')) return true;
  
  // If it's a 32-character alphanumeric string, it's likely a CF Stream ID
  // Cloudflare Stream IDs are usually 32 chars like: e3fa7f6840ea4c68a24530d34fc79ec1
  const cfIdPattern = /^[a-f0-9]{32}$/i;
  
  // Also match shorter IDs that might be used
  const cfShortIdPattern = /^[a-zA-Z0-9]{6,32}$/;
  
  return cfIdPattern.test(effectiveVideoId.value) || cfShortIdPattern.test(effectiveVideoId.value);
});

// Extract video ID from full URL if provided, or use the ID directly
const videoIdValue = computed(() => {
  if (!isCloudflareUrl.value) return effectiveVideoId.value;
  
  // If it's a full URL, extract the ID
  if (effectiveVideoId.value.includes('cloudflarestream.com')) {
    // Extract the ID from a URL like https://customer-vpj7....cloudflarestream.com/e3fa7f6840ea4c68a24530d34fc79ec1/watch
    const parts = effectiveVideoId.value.split('/');
    return parts[parts.length - 2];
  }
  
  // If we get here, it's already just the ID
  return effectiveVideoId.value;
});

// Construct the embed URL with parameters
const embedUrl = computed(() => {
  // If we're using authentication and have auth data, use that URL
  if (props.useAuthentication && authData.value) {
    return authData.value.embedUrl;
  }
  
  if (!isCloudflareUrl.value) return '';
  
  // For case study hero videos, use a different approach (but still iframe-based)
  if (props.videoType === 'caseStudyHero') {
    let url = `https://iframe.cloudflarestream.com/${videoIdValue.value}`;
    
    // Add essential parameters for case study hero videos
    const params = [
      'autoplay=true',
      'muted=true',
      'loop=true',
      'controls=false',
      'preload=auto',
      'responsive=true',
      'jsapi=true',
      'playsinline=true',
      'primaryColor=transparent',
      'letterboxColor=transparent',
      'fit=cover'
    ];
    
    return `${url}?${params.join('&')}`;
  }
  
  // For default videos, use the standard iframe embed URL
  let url = `https://iframe.cloudflarestream.com/${videoIdValue.value}`;
  
  // Replace watch?v= with v/ if present
  url = url.replace("watch?v=", "v/");
  // Add parameters
  const params = [];
  
  // Always mute videos that autoplay (browser requirement)
  if (props.autoplay) {
    params.push('autoplay=true');
    // Must add muted for autoplay to work
    params.push('muted=true');
  } else if (props.muted) {
    params.push('muted=true');
  }
  
  if (props.loop) params.push('loop=true');
  if (!props.controls) params.push('controls=false');
  
  // Add core parameters
  params.push('preload=auto');
  params.push('responsive=true');
  params.push('jsapi=true');
  params.push('startMuted=true');
  params.push('primaryColor=transparent');
  params.push('letterboxColor=transparent');
  params.push('defaultTextTrack=none');
  
  // Different parameters based on video type
  if (props.videoType === 'caseStudyHero') {
    // Case study hero video needs to fill the container completely
    params.push('fill=cover');
    params.push('maxHeight=100%');
    params.push('maxWidth=100%');
    params.push('posterHeight=100%');
    params.push('posterWidth=100%');
    // Add responsive behavior
    params.push('responsive=true');
  } else {
    // Default video scaling
    params.push('scale=height'); // Scale based on height
  }
  
  // Critical parameters for hover behavior
  params.push('autoplayVisibilityThreshold=0');
  params.push('playsinline=true');
  params.push('controlsVisibleOnLoad=false');
  
  // Add poster if provided
  if (props.posterUrl) {
    params.push(`poster=${encodeURIComponent(props.posterUrl)}`);
  }
  
  if (params.length > 0) {
    url += '?' + params.join('&');
  }
  
  return url;
});

// Function to check X-Frame-Options header
async function checkXFrameOptions(url) {
  if (!props.debug) return;
  
  try {
    // We use a proxy or server endpoint to check headers
    // This needs to be set up on your server
    const response = await fetch(`/api/check-headers?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    
    headerInfo.value = data;
    
    if (data.headers && data.headers['x-frame-options']) {
      const xfo = data.headers['x-frame-options'].toLowerCase();
      if (xfo === 'deny' || xfo === 'sameorigin') {
        iframeStatus.value = `X-Frame-Options is set to ${xfo}. This might prevent embedding.`;
      } else {
        iframeStatus.value = 'No blocking X-Frame-Options detected.';
      }
    } else {
      iframeStatus.value = 'No X-Frame-Options header found. Embedding should work.';
    }
  } catch (e) {
    console.error('Error checking headers:', e);
    iframeStatus.value = 'Error checking headers. See console.';
  }
}

// Fetch authenticated URL if needed
async function fetchAuthenticatedUrl() {
  if (!props.useAuthentication || !effectiveVideoId.value) return;
  
  try {
    const response = await fetch(`/api/get-stream-url?videoId=${effectiveVideoId.value}`);
    if (!response.ok) {
      console.error('Failed to fetch authenticated stream URL');
      return;
    }
    
    authData.value = await response.json();
    console.log('Received authenticated stream data', authData.value);
    
    // If in debug mode, check X-Frame-Options
    if (authData.value && authData.value.embedUrl) {
      await checkXFrameOptions(authData.value.embedUrl);
    }
  } catch (error) {
    console.error('Error fetching authenticated stream URL:', error);
  }
}

// Listen for postMessage events from the parent page
onMounted(async () => {
  // If authentication is needed, fetch the URL first
  if (props.useAuthentication) {
    await fetchAuthenticatedUrl();
  } else if (props.debug && embedUrl.value) {
    // If not using authentication but debug is on, check headers
    await checkXFrameOptions(embedUrl.value);
  }
  
  if (isCloudflareUrl.value) {
    // Ensure iframe is ready for postMessage communication
    console.log('CloudflareStream component mounted with Cloudflare Stream URL:', videoIdValue.value);
    
    // Track the iframe reference
    let iframeEl = null;
    
    // Give a small delay for the iframe to load
    setTimeout(() => {
      // Find the iframe for this video
      if (props.videoType === 'caseStudyHero') {
        iframeEl = document.querySelector(`.case-study-hero-video iframe[data-video-id="${videoIdValue.value}"]`);
      } else {
        iframeEl = document.querySelector(`iframe[data-video-id="${videoIdValue.value}"]`);
      }
      
      if (iframeEl && iframeEl.contentWindow) {
        console.log('Found iframe for video:', videoIdValue.value);
        
        // Always ensure it's muted first (required for autoplay)
        iframeEl.contentWindow.postMessage({
          event: 'muted',
          muted: true
        }, '*');
        
        // If autoplay is enabled, try to play it
        if (props.autoplay) {
          setTimeout(() => {
            iframeEl.contentWindow.postMessage({
              event: 'play'
            }, '*');
          }, 500);
        }
      }
    }, 1000);
    
    // Only add hover handlers for regular videos, not case study heroes
    // Case study heroes should autoplay without hover
    if (props.videoType !== 'caseStudyHero') {
      // Add direct hover handlers to the component itself for extra reliability
      const container = document.querySelector(`.cloudflare-stream-container[data-video-id="${videoIdValue.value}"]`);
      if (container) {
        console.log('Adding direct hover handlers to container');
        
        // Track the iframe once it's available
        iframeEl = container.querySelector('iframe');
        
        // Add hover handlers to nearest clickable parent
        const parent = container.closest('.case-study-item') || 
                       container.closest('.case-study-item-lg') || 
                       container.closest('.project-item');
                       
        if (parent) {
          console.log('Found parent item for hover events:', parent);
          
          // On hover, try to play the video directly
          parent.addEventListener('mouseenter', () => {
            console.log('Direct mouseenter handler');
            try {
              // Make sure the container is visible
              container.style.opacity = '1';
              
              // If we have an iframe, try to control it
              if (iframeEl && iframeEl.contentWindow) {
                console.log('Sending direct play command');
                
                // First ensure it's muted (required for autoplay)
                iframeEl.contentWindow.postMessage({
                  event: 'muted',
                  muted: true
                }, '*');
                
                // Reset to beginning
                iframeEl.contentWindow.postMessage({
                  event: 'seek',
                  time: 0
                }, '*');
                
                // Then play
                setTimeout(() => {
                  iframeEl.contentWindow.postMessage({
                    event: 'play'
                  }, '*');
                }, 100);
              }
            } catch (e) {
              console.error('Error in direct hover handler:', e);
            }
          });
          
          // On mouse leave, pause the video
          parent.addEventListener('mouseleave', () => {
            console.log('Direct mouseleave handler');
            try {
              // If we have an iframe, pause it
              if (iframeEl && iframeEl.contentWindow) {
                iframeEl.contentWindow.postMessage({
                  event: 'pause'
                }, '*');
                
                // Hide container
                container.style.opacity = '0';
              }
            } catch (e) {
              console.error('Error in direct leave handler:', e);
            }
          });
        }
      }
    }
    
    // Try to force autoplay when mounted - kept for non-case-study-hero videos
    if (props.autoplay && props.videoType !== 'caseStudyHero') {
      // Check if browser can autoplay
      let autoplayAllowed = false;
      
      // Function to check autoplay capability
      const checkAutoplay = async () => {
        try {
          // Create a test video element
          const video = document.createElement('video');
          video.muted = true;
          video.setAttribute('playsinline', '');
          video.src = 'data:video/mp4;base64,AAAAIGZ0eXBtcDQyAAAAAG1wNDJtcDQxaXNvbWF2YzEAAATKbW9vdgAAAGxtdmhkAAAAANLEP5XSxD+VAAB1MAAAdU4AAQAAAQAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAACFpb2RzAAAAABCAgIAQAE////9//w6AgIAEAAAAAQAABDV0cmFrAAAAXHRraGQAAAAH0sQ/ldLEP5UAAAABAAAAAAAAdU4AAAAAAAAAAAAAAAABAQAAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAJGVkdHMAAAAcZWxzdAAAAAAAAAABAAABdQAAABgAAQAAAAADKW1kaWEAAAAgbWRoZAAAAADSxD+V0sQ/lQAAVGAAAFZgVxIAAAAAADBoZGxyAAAAAAAAAAB2aWRlAAAAAAAAAAAAAAAAc291bgAAAAAAAAAAAAAALAgIAAAAAQAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEQAAABhmb2VhAAAAAAAAAQAAABhhYm9sAAAAAKY+12JHY21kaQAAAAAAAQAAAJZmclZJQ09NAAAcZW52aW4AAAAAGHZpZGUAAAAAAAAAEQAIABoAYQAlADgACgADAHUAfQAQABIA+AABABMAKQBKACoAEwAfAFgAJQAZAA0AEQAiAFAATwAKABYAIgAhAAMAXAAcABkAGAABABMAGQAhAAwAEwAQAE4AGQAWABMAHwAWACoAFgBPACAAFQALAA4AEQAuABEAAAAAABxhdmMxAAAAAAAeY21hdgAAAAAAAAAQAAgABgAP//8AAAAQABAABQAP//8AAAATc291bgAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANZW5jAAAAAAAAABYAAAAgN3E1dQEAAAAAAAAAAAAAAAJ3BDOXAQAAAAAAAAAAAAAAXHElsQEAAAAAAAAAAAAAAG8FIpcBAAAAAAAAAAAAAAJnArMAAQAAAAAAAAAAAHUDtwABAAAAAAAAAAAALgRnlwEAAAAAAAAAAAB1A7cAAQAAAAAAAAAAALMEZ5cBAAAAAAAAAABgAzOAAAEAAAAAAAAAAHUDtwABAAAAAAAAAAAuNzc3AQAAAAAAAAAAACJnArMAAQAAAAAAAAAAQDc3NwEAAAAAAAAAAACzBGeXAQAAAAAAAAAAUTeXlwEAAAAAAAAAACAACABgAA8AAAYQ8AAAAAAUc291bgAAAAAAAQAAABxhdmMxAAAAGHN0dHMAAAAAAAAAAQAAAAIAAAEAAAAAHHN0c2MAAAAAAAAAAQAAAAEAAAACAAAAAQAAAFhzdHN6AAAAAAAAAAAAAAIAAABIAAAAAQAAABRzdHJoAAAAAAAAAAADAAAAAwAAABgAAAQAAAAA';
          
          // Try to play
          const playResult = await video.play();
          
          // If we get here, autoplay is allowed
          autoplayAllowed = true;
          console.log('Autoplay is allowed in this browser');
          
          // Clean up
          video.pause();
          video.remove();
          
        } catch (e) {
          // Autoplay not allowed
          console.log('Autoplay not allowed in this browser:', e);
          autoplayAllowed = false;
        }
        
        // Now that we've checked autoplay capability, send messages to our iframe
        setTimeout(() => {
          try {
            const iframe = document.querySelector(`iframe[src*="${videoIdValue.value}"]`);
            if (iframe && iframe.contentWindow) {
              console.log('Attempting to initialize stream player...');
              
              // Always ensure the video is muted first
              iframe.contentWindow.postMessage({
                event: 'muted',
                muted: true
              }, '*');
              
              // If autoplay is allowed, try to play
              if (autoplayAllowed) {
                iframe.contentWindow.postMessage({
                  event: 'play'
                }, '*');
              }
            }
          } catch (e) {
            console.error('Error initializing stream player:', e);
          }
        }, 1000);
      };
      
      // Run the autoplay check
      checkAutoplay();
    }
  }
});

// Function to recheck headers
function recheckHeaders() {
  if (props.debug) {
    checkXFrameOptions(props.useAuthentication && authData.value ? 
                     authData.value.embedUrl : 
                     embedUrl.value);
  }
}
</script>

<style scoped>
.cloudflare-stream-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

/* Case study hero container specific styles */
.case-study-hero {
  width: 100% !important;
  height: auto !important;
  overflow: hidden;
  position: relative;
}

.stream-media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: v-bind('props.borderRadius');
  min-height: 100%;
}

/* Handle width auto specifically for item-video class */
.item-video {
  width: 100% !important;
  height: 100% !important;
  max-width: none;
  margin: 0 auto;
}

/* This targets the iframe inside the item-video container */
.item-video .stream-media {
  height: 100%;
  width: 100%;
  min-height: 100%;
  min-width: 100%;
  max-width: none;
  object-fit: cover;
  object-position: center;
}

.stream-media > video {
  width: 100%;
  height: 100%;
  max-width: none;
  min-width: 100%;
  overflow: hidden;
  object-fit: cover;
  object-position: center;
}

/* Case study hero video specific styles */
.case-study-hero-video {
  width: 100%;
  height: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  border-radius: .33rem;
  overflow: hidden;
  position: relative;
}

.cs-video-iframe {
  width: 100%;
  height: 100%;
  border: none;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: .33rem;
}

.cs-video-direct {
  width: 100%;
  height: 110%;
  object-fit: cover;
  object-position: center center;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: .33rem;
  border: none;
}

/* Class for the iframe inside cs-item-video */
.cs-item-video {
  width: 100% !important;
  height: 110% !important;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  border-radius: .33rem;
}

/* Debug panel styles */
.debug-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 350px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 10px;
  font-size: 12px;
  z-index: 1000;
  border-radius: 0 0 0 5px;
  overflow: auto;
  max-height: 80vh;
}

.debug-panel h3 {
  margin: 0 0 10px 0;
  font-size: 14px;
  color: #00bcd4;
}

.debug-panel h4, .debug-panel h5 {
  margin: 10px 0 5px 0;
  font-size: 12px;
  color: #00bcd4;
}

.debug-status {
  margin-bottom: 10px;
  line-height: 1.4;
}

.debug-headers {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 10px;
}

.header-warning {
  color: #ffa726;
}

.header-error {
  color: #ef5350;
}

.header-success {
  color: #66bb6a;
}

.recommendations {
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 10px;
}

.recommendations ul {
  margin: 5px 0;
  padding-left: 20px;
}

.recommendations li {
  margin-bottom: 5px;
}

.debug-button {
  background: #00bcd4;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}

.debug-button:hover {
  background: #0097a7;
}

.debug-notes {
  margin: 10px 0;
  padding: 5px;
  background: rgba(255,255,100,0.1);
  border-radius: 3px;
}

.debug-note {
  margin: 0;
  font-size: 11px;
  color: #ffa726;
  line-height: 1.3;
}

/* Add responsive styles to ensure full-width videos */
@media screen and (max-width: 768px) {
  .cloudflare-stream-container {
    height: 100% !important;
  }
  
  .case-study-item-video .cs-video-iframe, 
  .case-study-item-video .cs-video-direct,
  .project-item-video .cs-video-iframe,
  .project-item-video .cs-video-direct {
    width: 100% !important;
    min-width: 200% !important;
   }

   .cs-video-iframe,.cs-video-direct {
    height: 60vh !important;
  }

  }


</style> 
