<template>
  <div class="twic-demo-page">
    <h1>TwicPics Integration Demo</h1>
    <p>This page demonstrates the integration of TwicPics for optimized image delivery.</p>
    
    <TwicPicsDemo />
    
    <div class="documentation">
      <h2>How to Use TwicPics</h2>
      <p>TwicPics provides responsive, lazy-loaded images with automatic optimization. Here are some examples:</p>
      
      <div class="code-example">
        <h3>Basic Usage</h3>
        <pre><code>&lt;TwicImg
  src="path/to/your/image.jpg"
  alt="Your image description"
/&gt;</code></pre>
      </div>
      
      <div class="code-example">
        <h3>With Custom Ratio</h3>
        <pre><code>&lt;TwicImg
  src="path/to/your/image.jpg"
  alt="Your image description"
  ratio="16/9"
/&gt;</code></pre>
      </div>
      
      <div class="code-example">
        <h3>With Custom Focus</h3>
        <pre><code>&lt;TwicImg
  src="path/to/your/image.jpg"
  alt="Your image description"
  focus="auto"
/&gt;</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  title: 'TwicPics Demo',
  description: 'A demonstration of TwicPics image optimization integration',
});
</script>

<style scoped>
.twic-demo-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 30px;
}

.documentation {
  margin-top: 50px;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.code-example {
  margin: 20px 0;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

pre {
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: monospace;
}
</style> 