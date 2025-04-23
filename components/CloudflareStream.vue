<template>
  <div class="cloudflare-stream-container" :style="containerStyle" :data-video-id="videoIdValue">
    <!-- For Cloudflare Stream videos -->
    <iframe 
      v-if="isCloudflareUrl"
      :src="embedUrl"
      style="height:100%; width:auto; min-width:180%; border:none; object-position:center;"
      class="stream-media"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      title="Cloudflare Stream Video"
      data-player-type="cloudflare"
      :data-video-id="videoIdValue"
    ></iframe>
    
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
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';

const props = defineProps({
  videoId: {
    type: String,
    required: true
  },
  posterUrl: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '500px'
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
  }
});

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
  if (!props.videoId) return false;
  
  // If it contains cloudflarestream.com, it's definitely a CF URL
  if (props.videoId.includes('cloudflarestream.com')) return true;
  
  // If it's a 32-character alphanumeric string, it's likely a CF Stream ID
  // Cloudflare Stream IDs are usually 32 chars like: e3fa7f6840ea4c68a24530d34fc79ec1
  const cfIdPattern = /^[a-f0-9]{32}$/i;
  
  // Also match shorter IDs that might be used
  const cfShortIdPattern = /^[a-zA-Z0-9]{6,32}$/;
  
  return cfIdPattern.test(props.videoId) || cfShortIdPattern.test(props.videoId);
});

// Extract video ID from full URL if provided, or use the ID directly
const videoIdValue = computed(() => {
  if (!isCloudflareUrl.value) return props.videoId;
  
  // If it's a full URL, extract the ID
  if (props.videoId.includes('cloudflarestream.com')) {
    // Extract the ID from a URL like https://customer-vpj7....cloudflarestream.com/e3fa7f6840ea4c68a24530d34fc79ec1/watch
    const parts = props.videoId.split('/');
    return parts[parts.length - 2];
  }
  
  // If we get here, it's already just the ID
  return props.videoId;
});

// Construct the embed URL with parameters
const embedUrl = computed(() => {
  if (!isCloudflareUrl.value) return '';
  
  let url = `https://customer-vpj7vtuxn5lcy2o3.cloudflarestream.com/${videoIdValue.value}/iframe`;
  
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
  
  // Video scaling - set to cover for height priority
  params.push('fill=none'); // Don't let Cloudflare handle the fill
  
  // Critical parameters for hover behavior
  params.push('autoplayVisibilityThreshold=0');
  params.push('playsinline=true');
  params.push('controlsVisibleOnLoad=false');
  
  // Add poster if provided
  if (props.posterUrl) {
    params.push(`poster=${encodeURIComponent(props.posterUrl)}`);
  }
  
  // Height-first scaling parameters
  params.push('fit=none'); // Don't apply automatic fitting
  params.push('scale=height'); // Scale based on height  
  
  if (params.length > 0) {
    url += '?' + params.join('&');
  }
  
  return url;
});

// Listen for postMessage events from the parent page
onMounted(() => {
  if (isCloudflareUrl.value) {
    // Ensure iframe is ready for postMessage communication
    console.log('CloudflareStream component mounted with Cloudflare Stream URL:', videoIdValue.value);
    
    // Track the iframe reference
    let iframeEl = null;
    
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
    
    // Try to force autoplay when mounted
    if (props.autoplay) {
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

.stream-media {
  width: auto;
  height: 100%;
  object-fit: cover;
  border-radius: v-bind('props.borderRadius');
  min-height: 100%;
}

/* Handle width auto specifically for item-video class */
.item-video {
  width: auto !important;
  height: 100% !important;
  max-width: none;
  margin: 0 auto;
}

/* This targets the iframe inside the item-video container */
.item-video .stream-media {
  height: 100%;
  width: auto;
  min-height: 100%;
  min-width: 150%; /* Make it wider than container to ensure clipping */
  max-width: none;
  object-fit: cover;
  object-position: center;
}

.stream-media > video {
  width: auto;
  height: 100%;
  max-width: none;
  min-width: 150%; /* Make it wider than container to ensure clipping */
  overflow: hidden;
  object-fit: cover;
  object-position: center;
}
</style> 
