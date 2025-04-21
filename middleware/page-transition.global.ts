import { gsap } from 'gsap'

export default defineNuxtRouteMiddleware((to, from) => {
  if (typeof window !== 'undefined') {
    // Ensure smooth transition when navigating
    gsap.to('.page', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.to('.page', {
          opacity: 1,
          duration: 0.3,
          ease: 'power2.inOut'
        })
      }
    })
  }
}) 