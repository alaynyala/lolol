<template>
    <!-- Bio Section -->
    <div class="bio-section">
        <div class="bio-text">
            <p>alaina hunt is a designer & developer who blends art and code to create immersive experiences across physical and digital realms.
            </p>
            <div class="bio-cta">
                <p>sound interesting?</p>
                <a href="/contact" class="cta-link">we should work together.</a>
            </div>
        </div>
    </div>

    <!-- Projects Section -->
    <div class="projects">
        <ContentList path="/case-studies" :where="{ order: { $in: [1, 2] } }" :sort="{ order: 1 }" @error="handleError">
            <template #default="{ list }">
                <div class="row-1">
                    <div v-if="pending">Loading...</div>
                    <div v-else-if="!list?.length">No case studies found (orders 1-2). Debug: {{ debugInfo }}</div>
                    <div v-else class="case-study-item" v-for="caseStudy in list" :key="caseStudy._id">
                        <NuxtLink :to="`/case-studies/${caseStudy.slug}`">
                            <div class="case-study-id">
                                <div>{{ caseStudy.order }}</div>
                                <div class="case-study-title"> {{ caseStudy.title }}</div>
                            </div>
                            <div class="case-study-item-video" :style="{ backgroundColor: caseStudy.color }">
                                <video v-if="caseStudy.landing_video" :src="caseStudy.landing_video" autoplay muted
                                    loop></video>
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

        <ContentList path="/case-studies" :where="{ order: 3 }" @error="handleError">
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
                                <video v-if="caseStudy.landing_video" :src="caseStudy.landing_video" autoplay muted
                                    loop></video>
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

        <ContentList path="/projects" :where="{ order: { $in: [4, 5] } }" :sort="{ order: 1 }" @error="handleError">
            <template #default="{ list }">
                <div class="row-3">
                    <div v-if="pending">Loading...</div>
                    <div v-else-if="!list?.length">No projects found (orders 4-5). Debug: {{ debugInfo }}</div>
                    <div v-else class="project-item" v-for="project in list" :key="project._id">
                        <NuxtLink :to="`/projects/${project.slug}`">
                            <div class="project-id">
                                <div>{{ project.order }}</div>
                                <div class="project-title"> {{ project.title }}</div>
                            </div>
                            <div class="project-item-video" :style="{ backgroundColor: project.color }">
                                <video v-if="project.landing_video" :src="project.landing_video" autoplay muted
                                    loop></video>
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
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import gsap from 'gsap'

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
    
    // Only run on desktop
    if (window.innerWidth >= 768) {
        console.log('Setting up desktop animations')
        // Query all project items
        document.querySelectorAll('.case-study-item, .case-study-item-lg, .project-item').forEach((item) => {
            const video = item.querySelector('video')
            if (!video) {
                console.log('No video found for item:', item)
                return
            }

            const tl = gsap.timeline({ paused: true })

            // Set initial state
            gsap.set(video, { opacity: 0 })

            // Create timeline animation
            tl.to(video, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.inOut"
            }).to(video, {
                opacity: 1,
                duration: 0.3,
                delay: 0,
                ease: "power2.inOut"
            })

            // Add hover event listeners
            item.addEventListener('mouseenter', () => {
                video.currentTime = 0 // Reset video to start
                video.play()
                tl.restart()
            })

            // Add mouseleave event listener
            item.addEventListener('mouseleave', () => {
                video.pause()
                video.currentTime = 0
                gsap.to(video, { opacity: 0, duration: 0.3 })
            })
        })
    }
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
    padding: 4rem;
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

video {
    width: 100%;
    height: 720px;
    object-fit: cover;
    border-radius: .33rem;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.project-item, .case-study-item,
.case-study-item-lg {
    position: relative;
    border-radius: .33rem;
}

.project-item:hover video, .case-study-item:hover video,
.case-study-item-lg:hover video {
    opacity: 1;
    cursor: pointer;
}

.project-item-video, .case-study-item-video {
    border-radius: .33rem;
    opacity: 1;
    
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
    
}
</style>