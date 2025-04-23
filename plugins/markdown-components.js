// Register components for use in markdown content
import { defineNuxtPlugin } from '#app'
import CloudflareStream from '~/components/CloudflareStream.vue'
import CloudflareImage from '~/components/CloudflareImage.vue'
import { h } from 'vue'

// Create wrapped versions with prop handling
const CloudflareStreamWrapper = {
  name: 'CloudflareStreamWrapper',
  props: {
    // Accept all prop variations that might come from markdown
    videoid: String,
    videoId: String,
    videotype: String,
    videoType: String,
    // ... and any other props
    height: String,
    width: String,
    borderRadius: String,
    borderradius: String,
    controls: [Boolean, String],
    autoplay: [Boolean, String],
    muted: [Boolean, String],
    loop: [Boolean, String],
    debug: [Boolean, String],
  },
  setup(props, { attrs }) {
    // Normalize props for the wrapped component
    const normalizedProps = {
      // Use camelCase version if available, fall back to lowercase
      videoId: props.videoId || props.videoid,
      videoType: props.videoType || props.videotype,
      borderRadius: props.borderRadius || props.borderradius,
      // Convert string boolean values to actual booleans
      autoplay: props.autoplay === true || props.autoplay === 'true' || props.autoplay === '',
      muted: props.muted === true || props.muted === 'true' || props.muted === '',
      loop: props.loop === true || props.loop === 'true' || props.loop === '',
      controls: props.controls === true || props.controls === 'true' || props.controls === '',
      debug: props.debug === true || props.debug === 'true' || props.debug === '',
      // Pass other props
      height: props.height,
      width: props.width,
      // Include any other attrs
      ...attrs
    };
    
    console.log('CloudflareStreamWrapper received props:', props);
    console.log('Normalized props:', normalizedProps);
    
    // Return the wrapped component with normalized props
    return () => h(CloudflareStream, normalizedProps);
  }
};

const CloudflareImageWrapper = {
  name: 'CloudflareImageWrapper',
  props: {
    // Accept all prop variations
    imageid: String,
    imageId: String,
    // ... and any other props
    alt: String,
    height: String,
    width: String,
    borderRadius: String,
    borderradius: String,
    objectFit: String,
    objectfit: String,
  },
  setup(props, { attrs }) {
    // Normalize props for the wrapped component
    const normalizedProps = {
      // Use camelCase version if available, fall back to lowercase
      imageId: props.imageId || props.imageid,
      borderRadius: props.borderRadius || props.borderradius,
      objectFit: props.objectFit || props.objectfit,
      // Pass other props
      alt: props.alt,
      height: props.height,
      width: props.width,
      // Include any other attrs
      ...attrs
    };
    
    console.log('CloudflareImageWrapper received props:', props);
    console.log('Normalized props:', normalizedProps);
    
    // Return the wrapped component with normalized props
    return () => h(CloudflareImage, normalizedProps);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  // Register original components
  nuxtApp.vueApp.component('CloudflareStream', CloudflareStream)
  nuxtApp.vueApp.component('CloudflareImage', CloudflareImage)
  
  // Register wrapped components for markdown with kebab-case
  nuxtApp.vueApp.component('cloudflare-stream', CloudflareStreamWrapper)
  nuxtApp.vueApp.component('cloudflare-image', CloudflareImageWrapper)
  
  // Create aliases with wrappers
  nuxtApp.vueApp.component('cf-video', CloudflareStreamWrapper)
  nuxtApp.vueApp.component('cf-image', CloudflareImageWrapper)
  nuxtApp.vueApp.component('CFVideo', CloudflareStreamWrapper)
  nuxtApp.vueApp.component('CFImage', CloudflareImageWrapper)
}) 