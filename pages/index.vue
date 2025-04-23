<template>
    <!-- Bio Section -->
    <div class="bio-section">
        <div class="bio-text">
            <p>alaina hunt is a designer & developer who blends art and code to create immersive experiences across
                physical and digital realms.
            </p>
            <div class="bio-cta">
                <p>sound interesting?</p>
                <a href="/contact" class="cta-link">we should work together.</a>
            </div>
        </div>
    </div>

    <!-- Projects Section -->
    <div class="projects">
        <ContentList path="case-studies" :where="{ order: { $in: [1, 2] } }" :sort="{ order: 1 }" @error="handleError">
            <template #default="{ list }">
                <div class="row-1">
                    <div v-if="pending">Loading...</div>
                    <div v-else-if="!list?.length">No case studies found (orders 1-2). Debug: {{ debugInfo }}</div>
                    <div v-else class="case-study-item" v-for="caseStudy in list" :key="caseStudy._id">
                        <NuxtLink :to="`/case-studies/${caseStudy.slug}`">
                            <div class="case-study-id">
                                <div>0{{ caseStudy.order }}</div>
                                <div class="case-study-title"> {{ caseStudy.title }}</div>
                            </div>
                            <div class="case-study-item-video" :style="{ backgroundColor: caseStudy.color }">
                                <CloudflareStream 
                                    v-if="caseStudy.landing_video"
                                    :videoId="caseStudy.landing_video" 
                                    height="100%"
                                    width="100%"
                                    objectFit="cover"
                                    borderRadius="0.33rem"
                                    :opacity="1"
                                    :autoplay="true"
                                    :muted="true"
                                    :loop="true"
                                    class="item-video" />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <template #not-found>
                <p>No content found. Path: /case-studies</p>
            </template>
            <template #error="{ error }">
                <p>Error: {{ error.message }}</p>
            </template>
        </ContentList>

        <ContentList path="case-studies" :where="{ order: 3 }" @error="handleError">
            <template #default="{ list }">
                <div class="row-2">
                    <div v-if="!list?.length">No case study found (order 3). Debug: {{ debugInfo }}</div>
                    <div v-else class="case-study-item-lg" v-for="caseStudy in list" :key="caseStudy._id">
                        <NuxtLink :to="`/case-studies/${caseStudy.slug}`">
                            <div class="case-study-id">
                                <div>0{{ caseStudy.order }}</div>
                                <div class="case-study-title"> {{ caseStudy.title }}</div>
                            </div>
                            <div class="case-study-item-video" :style="{ backgroundColor: caseStudy.color }">
                                <CloudflareStream 
                                    v-if="caseStudy.landing_video"
                                    :videoId="caseStudy.landing_video" 
                                    height="720px"
                                    width="100%"
                                    objectFit="cover"
                                    borderRadius="0.33rem"
                                    :opacity="1"
                                    :autoplay="true"
                                    :muted="true"
                                    :loop="true"
                                    class="item-video" />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <template #not-found>
                <p>No content found. Path: /case-studies</p>
            </template>
            <template #error="{ error }">
                <p>Error: {{ error.message }}</p>
            </template>
        </ContentList>

        <ContentList path="projects" :where="{ order: { $in: [4, 5] } }" :sort="{ order: 1 }" @error="handleError">
            <template #default="{ list }">
                <div class="row-3">
                    <div v-if="pending">Loading...</div>
                    <div v-else-if="!list?.length">No projects found (orders 4-5). Debug: {{ debugInfo }}</div>
                    <div v-else class="project-item" v-for="project in list" :key="project._id">
                        <NuxtLink :to="`/projects/${project.slug}`">
                            <div class="project-id">
                                <div>0{{ project.order }}</div>
                                <div class="project-title"> {{ project.title }}</div>
                            </div>
                            <div class="project-item-video" :style="{ backgroundColor: project.color }">
                                <CloudflareStream 
                                    v-if="project.landing_video"
                                    :videoId="project.landing_video" 
                                    height="720px"
                                    width="100%"
                                    objectFit="cover"
                                    borderRadius="0.33rem"
                                    :opacity="1"
                                    :autoplay="true"
                                    :muted="true"
                                    :loop="true"
                                    class="item-video" />
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </template>
            <template #not-found>
                <p>No content found. Path: /projects</p>
            </template>
            <template #error="{ error }">
                <p>Error: {{ error.message }}</p>
            </template>
        </ContentList>
        <div class="project-link">
        <NuxtLink to="/projects">view all projects
            <svg width="37" height="8" viewBox="0 0 37 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M36.3536 4.38578C36.5488 4.19052 36.5488 3.87394 36.3536 3.67867L33.1716 0.496693C32.9763 0.30143 32.6597 0.30143 32.4645 0.496693C32.2692 0.691955 32.2692 1.00854 32.4645 1.2038L35.2929 4.03223L32.4645 6.86065C32.2692 7.05592 32.2692 7.3725 32.4645 7.56776C32.6597 7.76302 32.9763 7.76302 33.1716 7.56776L36.3536 4.38578ZM0 4.53223H36V3.53223H0V4.53223Z"
                    fill="black" />
            </svg>
        </NuxtLink>
    </div>
    </div>
    
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'
import CloudflareStream from '~/components/CloudflareStream.vue'

const pending = ref(false)
const error = ref(null)

const debugInfo = computed(() => {
    return {
        error: error.value,
        pending: pending.value,
        timestamp: new Date().toISOString()
    }
})

const handleError = (err) => {
    console.error('Content loading error:', err)
    error.value = err
}

onMounted(() => {
    console.log('Home page mounted')
    
    // Keep track of all controllers so we can clean them up
    const controllers = [];
    
    // Helper function to create Cloudflare Stream controller
    const createCloudflareController = (iframe) => {
        let isReady = false;
        let iframeRef = iframe; // Store reference to iframe
        const callbacks = {};
        const msgId = Math.floor(Math.random() * 10000).toString();
        
        // Function to send messages to the iframe
        const sendMessage = (command, data = {}) => {
            try {
                // Re-get the current iframe reference in case it changed
                if (!iframeRef || !iframeRef.contentWindow) {
                    // Try to find the iframe again by matching src
                    const iframeSrc = iframeRef ? iframeRef.src : '';
                    const videoId = iframeSrc ? iframeSrc.split('/').filter(p => p.length > 10)[0] : '';
                    
                    if (videoId) {
                        iframeRef = document.querySelector(`iframe[src*="${videoId}"]`);
                    }
                    
                    // If we still can't find the iframe, fail gracefully
                    if (!iframeRef || !iframeRef.contentWindow) {
                        console.warn(`Cannot find Cloudflare iframe to send ${command} - it may have been removed`);
                        return;
                    }
                }
                
                const msg = {
                    ...data,
                    event: command
                };
                
                console.log(`Sending ${command} to Cloudflare iframe`, msg);
                iframeRef.contentWindow.postMessage(msg, '*');
            } catch (e) {
                console.error('Error sending message to Cloudflare iframe:', e);
            }
        };
        
        // Listen for responses from the iframe
        const messageHandler = (e) => {
            try {
                // Only handle messages from our iframe
                if (!iframeRef || e.source !== iframeRef.contentWindow) {
                    return;
                }
                
                const data = e.data;
                console.log('Received message from Cloudflare iframe:', data);
                
                // Handle player ready event
                if (data && data.event === 'ready') {
                    isReady = true;
                    console.log('Cloudflare player is ready');
                }
                
                // Handle callbacks
                if (data && data.msgId && callbacks[data.msgId]) {
                    callbacks[data.msgId](data);
                    delete callbacks[data.msgId];
                }
            } catch (err) {
                console.error('Error handling message from Cloudflare iframe:', err);
            }
        };
        
        // Add message listener
        window.addEventListener('message', messageHandler);
        
        return {
            play: () => sendMessage('play'),
            pause: () => sendMessage('pause'),
            seek: (time) => sendMessage('seek', { time }),
            mute: () => sendMessage('muted', { muted: true }),
            unmute: () => sendMessage('muted', { muted: false }),
            destroy: () => {
                window.removeEventListener('message', messageHandler);
                iframeRef = null; // Clear the reference
            }
        };
    };
    
    // Helper function to create Cloudflare Stream controller if needed
    const getControllerForItem = (item) => {
        // Get the CloudflareStream container
        const container = item.querySelector('.cloudflare-stream-container');
        
        if (!container) {
            console.log('No video container found for item:', item);
            return null;
        }
        
        // Check what's inside the container - could be iframe or video
        const video = container.querySelector('video');
        let cfIframe = container.querySelector('iframe');
        
        // If we didn't find an iframe directly, search deeper
        if (!cfIframe) {
            cfIframe = container.querySelector('iframe[src*="cloudflarestream"]');
            if (cfIframe) {
                console.log('Found iframe with cloudflarestream URL');
            }
        }
        
        // If still no iframe, try a broader search
        if (!cfIframe) {
            cfIframe = container.querySelector('iframe');
            if (cfIframe) {
                console.log('Found generic iframe:', cfIframe.src);
            }
        }
        
        if (!video && !cfIframe) {
            console.log('Neither video nor iframe found in container');
            return null;
        }
        
        // For videos, we don't need a controller
        if (video) {
            console.log('Found video element');
            return { type: 'video', element: video };
        }
        
        // For iframes, create a controller if we don't have one already
        if (cfIframe) {
            console.log('Creating controller for iframe:', cfIframe.src);
            // Create controller
            const controller = createCloudflareController(cfIframe);
            controllers.push(controller);
            return { type: 'iframe', element: cfIframe, controller };
        }
        
        return null;
    };
    
    // Only run on desktop
    if (window.innerWidth >= 768) {
        console.log('Setting up desktop animations');
        
        // Query all project items
        document.querySelectorAll('.case-study-item, .case-study-item-lg, .project-item').forEach((item) => {
            // Get the CloudflareStream container
            const container = item.querySelector('.cloudflare-stream-container');
            
            if (!container) {
                console.log('No video container found for item:', item);
                return;
            }
            
            // Create timeline for the animation
            const tl = gsap.timeline({ paused: true });
            
            // Set initial opacity of container - start at 0 to hide initially
            gsap.set(container, { opacity: 0 });
            
            // First ensure any existing iframes are properly set up
            const existingIframe = container.querySelector('iframe');
            if (existingIframe) {
                console.log('Setting up existing iframe:', existingIframe.src);
                // Make sure any iframe has jsapi enabled
                if (existingIframe.src && !existingIframe.src.includes('jsapi=true')) {
                    const newSrc = existingIframe.src + (existingIframe.src.includes('?') ? '&' : '?') + 'jsapi=true&muted=true';
                    console.log('Updating iframe src with jsapi parameter:', newSrc);
                    existingIframe.src = newSrc;
                }
            }
            
            // Create fade-in animation
            tl.to(container, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.inOut"
            }).to(container, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.inOut"
            });
            
            // Add hover event listeners
            item.addEventListener('mouseenter', () => {
                console.log('Mouse enter on item:', item);
                console.log('Video container found:', container);
                
                // Get or create controller on demand
                const media = getControllerForItem(item);
                
                if (!media) {
                    console.log('No media controller created for this item');
                    return;
                }
                
                console.log('Media controller type:', media.type);
                
                // Handle video element
                if (media.type === 'video') {
                    console.log('Playing video on hover');
                    media.element.currentTime = 0; // Reset video to start
                    media.element.play();
                } 
                // Handle iframe (Cloudflare Stream)
                else if (media.type === 'iframe') {
                    console.log('Playing iframe video on hover with controller');
                    
                    // Make visible immediately to avoid flashing
                    gsap.set(container, { opacity: 1 });
                    
                    // Make sure video is muted first (browser requirement for autoplay)
                    media.controller.mute();
                    
                    // First pause any existing playback
                    media.controller.pause();
                    
                    // Then seek to the beginning
                    media.controller.seek(0);
                    
                    // Play after a short delay to ensure seek completes
                    setTimeout(() => {
                        console.log('Playing after delay...');
                        media.controller.play();
                        // Make sure it stays at the beginning if the seek didn't work
                        setTimeout(() => {
                            media.controller.seek(0);
                        }, 50);
                    }, 100);
                }
                
                // Start the animation
                tl.restart();
            });
            
            // Add mouseleave event listener
            item.addEventListener('mouseleave', () => {
                // Get controller on demand
                const media = getControllerForItem(item);
                
                if (!media) {
                    return;
                }
                
                // Handle video element
                if (media.type === 'video') {
                    media.element.pause();
                    media.element.currentTime = 0;
                } 
                // Handle iframe (Cloudflare Stream)
                else if (media.type === 'iframe') {
                    media.controller.pause();
                }
                
                // Fade out immediately
                gsap.to(container, { opacity: 0, duration: 0.2 });
            });
        });
    }
    
    // Cleanup function to remove all controllers when component unmounts
    return () => {
        console.log('Cleaning up video controllers');
        controllers.forEach(controller => controller.destroy && controller.destroy());
    };
})
</script>

<style scoped>
a {
    text-decoration: none;
    color: #000;
}


.bio-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 80vh;
}

.bio-text {
    font-size: .67rem;
    text-transform: uppercase;
    max-width: 28vw;
}

.bio-cta {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: .67rem;
    text-transform: uppercase;
    max-width: 30vw;
}

.cta-link {
    color: blue;
    text-decoration: none;
    position: relative;
}

.cta-link::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
    
}

.cta-link:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

.project-title, .case-study-title {
    text-decoration: none;
    position: relative;
}

.project-title::after, .case-study-title::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: currentColor;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
}

.project-title:hover::after, .case-study-title:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

.projects {
    margin: 0 auto;
    max-width: calc(100vw - 2vw);
    overflow-x: hidden;
    scrollbar-width: thin;
    scrollbar-color: #0000002a #fff;
}


.row-1,
.row-3 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    gap: .33rem;    
}

.row-2 {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 4rem 12rem;
}

.row-1 .case-study-item,
.row-3 .project-item {
    flex: 1;
    width: 50%;
    height: 100%;
    border-radius: .33rem;
}

.row-2 .case-study-item-lg {
    flex: 1;
    width: 100%;
    border-radius: .33rem;

}

.project-id, .case-study-id {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: .75rem;
    text-transform: uppercase;
    padding-bottom: .33rem;
}

video, .cloudflare-stream-container {
    height: 100%;
    object-fit: cover;
    border-radius: .33rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.item-video .stream-media {
    width: auto;
    height: 100%;
    object-fit: cover;
    border-radius: .33rem;
    opacity: 0;
}

.project-item, .case-study-item,
.case-study-item-lg {
    position: relative;
    border-radius: .33rem;
}

.project-item:hover .cloudflare-stream-container, 
.case-study-item:hover .cloudflare-stream-container,
.case-study-item-lg:hover .cloudflare-stream-container {
    opacity: 1 !important;
    cursor: pointer;
}

.item-video {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: auto;
    height: 100%;
}

/* Additional CSS to ensure the video containers maintain proper aspect ratio */
.project-item-video, .case-study-item-video {
    border-radius: .33rem;
    opacity: 1;
    height: 80vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

.case-study-item:hover .stream-media,
.case-study-item-lg:hover .stream-media,
.project-item:hover .stream-media {
    opacity: 1 !important;
}

.project-link {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 2rem 0;
    
}

.project-link:hover svg{
    width: 3rem;
}

.project-link a {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    gap: 1rem;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.project-link a:hover {
    opacity: 0.5;
}

.project-link svg {
    width: 2rem;
    transition: width 0.3s ease;
}

@media (max-width: 768px) {
    .bio-section {
        height: 50vh;
    }
    .bio-text {
        max-width: 80vw;
        text-align: center;
    }
    .bio-cta {
        max-width: 80vw;
        flex-direction: column;
    }
    .projects {
        padding: 0 .66rem;
        display: flex;
        flex-direction: column;
    }
    .row-1, .row-3 {
        gap: .33rem;
        flex-direction: column;
    }

    .row-2 {
        padding: 0;
    }

    .row-1 .case-study-item, .row-3 .project-item {
        width: 100%;
        opacity: 1;
    }
    .row-2 .case-study-item-lg {
        width: 100%;
        opacity: 1;
        padding: 0;
    }

    .case-study-id, .project-id {
        padding: .25rem;
    }

    .case-study-item-video, .project-item-video {
        background-color: #fff;
        opacity: 1;
    }

    video {
        opacity: 1;
        height: 60vh;
    }
    .project-link {
        padding: 2rem 0;
        justify-content: center;
    }
    .project-link a {
        font-size: .67rem;
        justify-content: center;
        gap: 1rem;
    }
    
}
</style>