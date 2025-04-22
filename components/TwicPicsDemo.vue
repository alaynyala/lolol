<template>
  <div class="twic-demo">
    <h2>TwicPics Demo</h2>
    
    <div class="image-grid">
      <!-- Basic image with TwicPics -->
      <div class="image-item">
        <h3>Basic Image</h3>
        <TwicImg
          src="path/to/your/image.jpg"
          alt="A sample image"
          placeholder="preview"
        />
      </div>
      
      <!-- Ratio demonstration -->
      <div class="image-item">
        <h3>Custom Ratio (16:9)</h3>
        <TwicImg
          src="path/to/your/image.jpg"
          alt="16:9 ratio image"
          ratio="16/9"
          placeholder="preview"
        />
      </div>
      
      <!-- Focus point demonstration -->
      <div class="image-item">
        <h3>Custom Focus Point</h3>
        <TwicImg
          src="path/to/your/image.jpg"
          alt="Image with custom focus"
          focus="auto"
          placeholder="preview"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional script needed as TwicPics components are registered globally
</script>

<style scoped>
.twic-demo {
  padding: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.image-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
  padding: 10px;
  margin: 0;
  background-color: #f5f5f5;
}
</style> 