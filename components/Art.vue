<template>
    <div class="art-piece">
        <div id="art-header" class="art-header">
            <div class="art-header-left">
                <div class="dot" :style="{ backgroundColor: art.color }"></div>
                <h1>{{ art.title }}</h1>
            </div>
            <div class="art-header-right">
                <div class="art-header-right-clients">
                    <p v-for="client in art.clients" :key="client">{{ client }}</p>
                </div>
                <div class="art-header-right-roles">
                    <p v-for="role in art.roles" :key="role">{{ role }}</p>
                </div>
                <p>{{ art.year }}</p>
            </div>
        </div>
        <div class="art-hero">
            <img class="art-hero-image" :src="art.featured_image" alt="Art Hero Image">
        </div>
        <div class="art-images-wrapper">
            <div class="art-images">
                <div class="art-images-container" 
                    ref="container"
                    @touchstart="handleTouchStart"
                    @touchmove="handleTouchMove"
                    @touchend="handleTouchEnd">
                    <div v-for="image in art.images" :key="image" class="art-image-slide">
                        <img :src="image" :alt="art.title + ' Image'" @load="updateLayout">
                    </div>
                </div>
                <div class="art-images-controls">
                    <button class="art-images-controls-button left-button" 
                        v-if="currentIndex > 0"
                        @click="prevImage">←</button>
                    <button class="art-images-controls-button right-button" 
                        v-if="hasMultipleImages && !isLastSlide"
                        @click="nextImage">→</button>
                </div>
            </div>
        </div>
       
        <div class="art-prev-next">
            <NuxtLink :to="art.previous"><p>view prev</p></NuxtLink>
            <NuxtLink :to="art.next"><p>view next</p></NuxtLink>
        </div>
        <div class="art-footer">
            <NuxtLink to="/"><p>home</p></NuxtLink>
            <NuxtLink to="#art-header"><p>back to top</p></NuxtLink>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { gsap } from 'gsap'

const { art } = defineProps({
    art: Object
})      

const currentIndex = ref(0)
const container = ref(null)
const isAnimating = ref(false)
const touchStart = ref(0)
const touchX = ref(0)
const isDragging = ref(false)
const dragDistance = ref(0)

// Add new computed properties for better control visibility logic
const hasMultipleImages = computed(() => art.images && art.images.length > 1)
const isLastSlide = computed(() => currentIndex.value >= (art.images?.length - 1))

const canScrollLeft = computed(() => currentIndex.value > 0)
const canScrollRight = computed(() => {
    if (!container.value || !hasMultipleImages.value) return false
    return !isLastSlide.value
})

const handleTouchStart = (e) => {
    if (isAnimating.value) return
    touchStart.value = e.touches[0].clientX
    touchX.value = e.touches[0].clientX
    isDragging.value = true
    dragDistance.value = 0

    // Kill any existing animations
    gsap.killTweensOf(container.value)
}

const handleTouchMove = (e) => {
    if (!isDragging.value || !container.value) return
    e.preventDefault() // Prevent page scrolling while swiping
    
    const currentX = e.touches[0].clientX
    const diff = currentX - touchX.value
    touchX.value = currentX
    
    // Calculate total drag distance from start
    dragDistance.value += diff

    // Add resistance at the edges
    let moveX = dragDistance.value
    if (currentIndex.value === 0 && moveX > 0) {
        moveX *= 0.3 // Add resistance when pulling right at the start
    } else if (!canScrollRight.value && moveX < 0) {
        moveX *= 0.3 // Add resistance when pulling left at the end
    }

    // Apply the drag movement
    const currentTransform = -currentIndex.value * container.value.offsetWidth
    gsap.set(container.value, {
        x: currentTransform + moveX
    })
}

const handleTouchEnd = () => {
    if (!isDragging.value || !container.value) return
    isDragging.value = false
    
    const threshold = container.value.offsetWidth * 0.15 // Reduce threshold to 15% for easier swiping
    const velocity = Math.abs(dragDistance.value) / 200 // Adjust velocity calculation

    if (Math.abs(dragDistance.value) > threshold || velocity > 0.5) {
        // Determine direction
        if (dragDistance.value > 0 && canScrollLeft.value) {
            prevImage()
        } else if (dragDistance.value < 0 && canScrollRight.value) {
            nextImage()
        } else {
            // Snap back if can't move in that direction
            animateToCurrentSlide()
        }
    } else {
        // Snap back to current slide if movement wasn't enough
        animateToCurrentSlide()
    }
}

const animateToCurrentSlide = () => {
    const targetX = -currentIndex.value * container.value.offsetWidth
    gsap.to(container.value, {
        x: targetX,
        duration: 0.3,
        ease: 'power2.out'
    })
}

const animateSlide = (direction) => {
    if (isAnimating.value || !container.value) return

    isAnimating.value = true
    const containerWidth = container.value.offsetWidth
    const newIndex = direction === 'next' ? currentIndex.value + 1 : currentIndex.value - 1
    const maxScroll = container.value.scrollWidth - containerWidth

    // Calculate the target position
    let targetX = -newIndex * containerWidth
    
    // Ensure we don't scroll past the end
    if (-targetX > maxScroll) {
        targetX = -maxScroll
    }

    gsap.to(container.value, {
        x: targetX,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
            currentIndex.value = newIndex
            isAnimating.value = false
        }
    })
}

const prevImage = () => {
    if (canScrollLeft.value && !isAnimating.value) {
        animateSlide('prev')
    }
}

const nextImage = () => {
    if (canScrollRight.value && !isAnimating.value) {
        animateSlide('next')
    }
}

onMounted(() => {
    updateLayout()
    window.addEventListener('resize', updateLayout)
})

const updateLayout = () => {
    if (!container.value) return
    container.value.offsetHeight // Force reflow
    animateToCurrentSlide() // Ensure proper position after layout changes
}
</script>

<style scoped>
.art-piece {
    width: calc(100% - .66rem);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    margin: 0 auto;
    gap: 0;
    overflow: hidden;
}

.art-header {
    display: flex;
    justify-content: space-between;
    padding: 6rem 2rem 2rem 2rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.art-header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding-bottom: 1rem;
}

.art-header-left h1 {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
}

.art-header-right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 60%
}

.art-header-right p {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: .75rem;
    font-weight: 400;
    text-transform: uppercase;
    max-width: 13rem;
    margin: 0;  
}

.art-hero {
    width: 100%;
    height: 80%;
    position: relative;
}   

.art-hero-image {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    border-radius: .33rem;
    position: relative;
    margin: auto;
}

.art-images-wrapper {
    width: 100%;
    height: 80%;
    position: relative;
    border-radius: .33rem;
    overflow: hidden;
}

.art-images {
    width: 100%;
    margin: 0;
    position: relative;
    overflow: hidden;
    padding: 0;
    border-radius: .33rem;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
}

.art-images-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 0.33rem;
    will-change: transform;
    touch-action: pan-y pinch-zoom;
    border-radius: .33rem;
}

.art-image-slide {
    width: 100%;
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: .33rem;
    background-color: #fff;
}

.art-images img {
    width: 100%;
    height: 60vh;
    object-fit: cover;
    border-radius: .33rem;
}

.art-images-controls {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    z-index: 10;
}

.art-images-controls-button {
    background-color: rgba(0, 0, 0, 0.8);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    opacity: 0.7;
    transition: opacity 0.3s ease;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.art-images-controls-button.left-button {
    margin-left: 1rem;
}

.art-images-controls-button.right-button {
    margin-right: 1rem;
}

.art-images-controls-button:hover {
    opacity: 1;
}

.art-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 2rem;
    margin-top: 0;
    border-top: 1px solid #000;
}

.art-prev-next {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4rem 2rem 0 2rem;
    
}

.art-footer a, .art-prev-next a {
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    line-height: 1;
    transition: opacity 0.3s ease;
}

.art-footer a:hover, .art-prev-next a:hover {
    text-decoration: underline;
    opacity: .5;
}

@media (max-width: 1200px) {
    .art-image-slide {
        width: calc(50% - 1rem); /* Show 2 images on medium screens */
    }
}

@media (max-width: 768px) {
    .art-header {
        padding: 2rem 1rem;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .art-header-left {
        width: 100%;
        gap: 0;
        
    }
    .art-header-left h1 {
        font-size: 1rem;
    }
    .art-header-right {
        padding-bottom: 0;
        width: 100%;
    }
    .art-images-wrapper {
        margin: 0;
        height: auto;
    }

    .art-images {
        width: 100%;
    }

    .art-images-container {
        gap: 0;
        touch-action: pan-x;
    }

    .art-image-slide {
        width: 100%;
        flex: 0 0 100%;
    }
    
    .art-images img {
        height: 60vh;
        object-fit: cover;
        border-radius: 0.33rem;
        width: 100%;
    }
    
    .art-images-controls {
        padding: 0 0.5rem;
    }

    .art-images-controls-button {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
    }

    .art-images-controls-button.left-button {
        margin-left: 0.5rem;
    }

    .art-images-controls-button.right-button {
        margin-right: 0.5rem;
    }

    .art-hero-image {
        height: 60vh;
    }
}
</style>    