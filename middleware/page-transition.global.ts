import { gsap } from 'gsap'

export default defineNuxtRouteMiddleware((to, from) => {
  // Only run transition if we're in the browser and not on initial load
  if (typeof window !== 'undefined' && from.path !== '/') {
    // Use nextTick to ensure DOM is updated
    nextTick(() => {
      // Get the current .page-container element
      const pageElement = document.querySelector('.page-container')
      
      if (pageElement) {
        // Fade out
        gsap.to(pageElement, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.inOut',
          onComplete: () => {
            // Fade in (using nextTick to ensure the new page is mounted)
            nextTick(() => {
              const newPageElement = document.querySelector('.page-container')
              if (newPageElement) {
                gsap.to(newPageElement, {
                  opacity: 1,
                  duration: 0.3,
                  ease: 'power2.inOut'
                })
              }
            })
          }
        })
      }
    })
  }
}) 