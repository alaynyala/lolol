<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">{{ error.statusCode }}</h1>
      <p class="text-xl mb-4">{{ error.message }}</p>
      <UButton @click="handleError">Return Home</UButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object
})

const handleError = () => {
  clearError()
  navigateTo('/')
}
</script> 