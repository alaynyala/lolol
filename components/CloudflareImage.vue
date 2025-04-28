<template>
  <div class="cloudflare-image-container" :style="containerStyle">
    <img
      v-if="isCloudflareUrl"
      :src="imageUrl"
      :alt="alt"
      class="cloudflare-image"
      :style="imageStyle"
      :data-image-id="imageIdValue"
    />
    <img
      v-else
      :src="imageUrl"
      :alt="alt"
      class="cf-image"
      :data-image-id="imageIdValue"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';

const props = defineProps({
  imageId: {
    type: String,
    required: false,
    default: undefined
  },
  imageid: {
    type: String,
    default: undefined
  },
  alt: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: 'auto'
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
  isCloudflareUrl: {
    type: Boolean,
    default: true
  },
  useAuthentication: {
    type: Boolean,
    default: false
  }
});

// Use either imageId or imageid (lowercase)
const effectiveImageId = computed(() => {
  console.log('Image props received:', {
    imageId: props.imageId,
    imageid: props.imageid,
    allProps: { ...props }
  });
  
  const id = props.imageId || props.imageid || '';
  
  if (!id) {
    console.warn('No image ID provided (neither imageId nor imageid). This will cause errors.');
  } else {
    console.log('Using effective image ID:', id);
  }
  
  return id;
});

// Authenticated URL data from API (if needed)
const authData = ref(null);

// Check if the URL is a Cloudflare Image URL or a Cloudflare Image ID
const isCloudflareUrl = computed(() => {
  if (!effectiveImageId.value) return false;
  
  // If it contains imagedelivery.net, it's definitely a CF URL
  if (effectiveImageId.value.includes('imagedelivery.net')) return true;
  
  // If isCloudflareUrl prop is explicitly set, use that value
  if (props.isCloudflareUrl !== undefined) {
    return props.isCloudflareUrl;
  }
  
  // Default case - assume it's a Cloudflare image ID
  return true;
});

// Extract image ID from full URL if provided, or use the ID directly
const imageIdValue = computed(() => {
  if (!effectiveImageId.value) return '';
  
  // If it's a full URL, extract the ID
  if (effectiveImageId.value.includes('imagedelivery.net')) {
    // Extract the ID from a URL like https://imagedelivery.net/XPp5SsZ1VHMdZq-5zMXYKA/9c542ea5-264f-45ff-082d-6a6964c50000/public
    const parts = effectiveImageId.value.split('/');
    return parts[parts.length - 2];
  }
  
  // If it's a 32-character alphanumeric string, it's likely a CF Image ID
  // Cloudflare Image IDs are usually 32 chars like: 9c542ea5-264f-45ff-082d-6a6964c50000
  const cfIdPattern = /^[a-f0-9]{32}$/i;
  
  return cfIdPattern.test(effectiveImageId.value) ? effectiveImageId.value : effectiveImageId.value;
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

// Image-specific styles
const imageStyle = computed(() => {
  return {
    objectFit: props.objectFit,
    borderRadius: props.borderRadius
  };
});

// Fetch authenticated URL if needed
async function fetchAuthenticatedUrl() {
  if (!props.useAuthentication || !effectiveImageId.value) return;
  
  try {
    const response = await fetch(`/api/get-image-url?imageId=${imageIdValue.value}`);
    if (!response.ok) {
      console.error('Failed to fetch authenticated image URL');
      return;
    }
    
    authData.value = await response.json();
    console.log('Received authenticated image data', authData.value);
  } catch (error) {
    console.error('Error fetching authenticated image URL:', error);
  }
}

// Construct the Cloudflare image URL
const imageUrl = computed(() => {
  // If we're using authentication and have auth data, use that URL
  if (props.useAuthentication && authData.value) {
    return authData.value.imageUrl;
  }
  
  // Base Cloudflare Images URL
  const baseUrl = 'https://imagedelivery.net/XPp5SsZ1VHMdZq-5zMXYKA/';
  
  // If imageId is undefined or null, return an empty string or placeholder
  if (!effectiveImageId.value) {
    return '';
  }
  
  // If imageId is already a full URL, return it as-is
  if (effectiveImageId.value.startsWith('http')) {
    return effectiveImageId.value;
  }
  
  // Otherwise construct the full URL
  // Format: baseUrl/[imageId]/public
  return `${baseUrl}${effectiveImageId.value}/public`;
});

// Initialize component
onMounted(async () => {
  if (props.useAuthentication) {
    await fetchAuthenticatedUrl();
  }
});
</script>

<style scoped>
.cloudflare-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cloudflare-image {
  width: 100%;
  height: 100%;
}
</style>