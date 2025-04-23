<template>
    <div class="case-study">
        <div id="case-study-header" class="case-study-header">
            <div class="case-study-header-left">
                <div class="dot" :style="{ backgroundColor:     caseStudy.color }"></div>
                <h1>{{ caseStudy.title }}</h1>
            </div>
            <div class="case-study-header-right">
                <div class="case-study-header-right-clients">
                    <p v-for="client in caseStudy.clients" :key="client">{{ client }}</p>
                </div>
                <div class="case-study-header-right-roles">
                    <p v-for="role in caseStudy.roles" :key="role">{{ role }}</p>
                </div>
                <p>{{ caseStudy.year }}</p>
            </div>
        </div>
        <div class="case-study-hero">
            <div class="case-study-hero-video">
                <CloudflareStream v-if="caseStudy.featured_video" :debug="false" :videoId="caseStudy.featured_video" videoType="caseStudyHero" borderRadius="0.33rem" :autoplay="true" :muted="true" :loop="true" />
            </div>
        </div>
        <div class="case-study-contributions">
            <div class="case-study-contributions-left">
                <h2>Contributions</h2>
                <div class="case-study-contributions-left-top">
                    <div class="case-study-contributions-left-top-list">
                        <h3>research</h3>
                        <p v-for="research in caseStudy.contributions.research" :key="research">{{ research }}</p>
                    </div>
                    <div class="case-study-contributions-left-top-list">
                        <h3>strategy</h3>
                        <p v-for="strategy in caseStudy.contributions.strategy" :key="strategy">{{ strategy }}</p>
                    </div>
                </div>
                <div class="case-study-contributions-left-bottom">
                    <div class="case-study-contributions-left-bottom-list">
                        <h3>design</h3>
                        <p v-for="design in caseStudy.contributions.design" :key="design">{{ design }}</p>
                    </div>
                    <div class="case-study-contributions-left-bottom-list">
                        <h3>site development</h3>
                        <p v-for="development in caseStudy.contributions.development" :key="development">{{ development
                            }}</p>
                    </div>
                </div>
            </div>
            <div class="case-study-contributions-right">
                <div class="case-study-contributions-right-brief">
                    <h3>project overview</h3>
                    <p v-for="brief in caseStudy.brief" :key="brief">{{ brief }}</p>
                </div>
            </div>
        </div>
        <div class="case-study-content">
            <ContentDoc />
        </div>
        <div class="collaborators">
            <div class="collaborators-left">
                <div class="collaborators-left-top">
                    <h3>collaborators</h3>
                </div>
            </div>
            <div class="collaborators-right">
                <div class="collaborators-right-top">
                    <div class="collaborators-right-top-list">
                        <h3>brand design & development</h3>
                        <p v-for="brand_design in caseStudy.collaborators.brand_design" :key="brand_design">{{
                            brand_design }}</p>
                    </div>
                    <div v-if="caseStudy.collaborators.brand_messaging" class="collaborators-right-top-list">
                        <h3>brand messaging & strategy</h3>
                        <p v-for="brand_messaging in caseStudy.collaborators.brand_messaging" :key="brand_messaging">{{
                            brand_messaging }}</p>
                    </div>
                </div>
                <div class="collaborators-right-bottom">
                    <div class="collaborators-right-bottom-list">
                        <h3>web development</h3>
                        <p v-for="development in caseStudy.collaborators.development" :key="development">{{ development
                            }}</p>
                    </div>
                    <div class="collaborators-right-bottom-list">
                        <a href="https://www.cooper-house.com" target="_blank" rel="noopener noreferrer">
                            <p>via {{ caseStudy.collaborators.agency }}</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="case-study-prev-next">
            <NuxtLink :to="caseStudy.previous">
                <p>view prev</p>
            </NuxtLink>
            <NuxtLink :to="caseStudy.next">
                <p>view next</p>
            </NuxtLink>
        </div>
        <div class="case-study-footer">
            <NuxtLink to="/">
                <p>home</p>
            </NuxtLink>
            <NuxtLink to="#case-study-header">
                <p>back to top</p>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup>
import CloudflareStream from '~/components/CloudflareStream.vue'


const { caseStudy } = defineProps({
    caseStudy: Object
})
</script>

<style scoped>
.case-study {
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: .33rem;
    margin: 0;
}


.case-study-header {
    display: flex;
    justify-content: space-between;
    padding: 6rem 2rem 2rem 2rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.case-study-header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding-bottom: 1rem;
}

.case-study-header-left h1 {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
}

.case-study-header-right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 60%
}

.case-study-header-right p {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: .67rem;
    font-weight: 400;
    text-transform: uppercase;
    max-width: 13rem;
    margin: 0;
}

.case-study-hero {
    width: 100%;
    height: 80vh;
    position: relative;
    overflow: hidden;
}   


.case-study-hero-video {
    border-radius: .33rem;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
}

.case-study-hero-video .stream-media,
.case-study-hero-video iframe,
.case-study-hero-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: .33rem;
}

/* Force 100% width for videos in content sections */
.case-study-content .video-container {
    width: 100%;
    position: relative;
    aspect-ratio: 16/9;
    margin-bottom: 0.33rem;
}

.case-study-content .video-container video,
.case-study-content .video-container iframe {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .33rem;
}

.case-study-contributions {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 6rem;
    
}

.case-study-contributions-left h2 {
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: lowercase;
    margin: 0;
}
.case-study-contributions-left, .collaborators-left {
    width: 50%;
}

.case-study-contributions-right, .collaborators-right {
    width: 50%;
    padding-left: 4rem;
    padding-top: 2rem;
}

.case-study-contributions-left-top, .case-study-contributions-left-bottom, .collaborators-right-top, .collaborators-right-bottom {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding-bottom: 2rem;
}
.collaborators-left-top {
    padding-top: 2rem;
}

.case-study-contributions-left-top-list, .case-study-contributions-left-bottom-list, .collaborators-right-top-list, .collaborators-right-bottom-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 50%;
}

.case-study-contributions-right-brief {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
   
}

.case-study-contributions-right-brief h3 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: lowercase;
    margin: 0 0 1rem 0;
}

.case-study-contributions-right-brief p {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0;
    font-size: .75rem;
    line-height: 1.5;
    margin: .25rem 0;
}

.case-study-contributions-left-top-list p, .case-study-contributions-left-bottom-list p, .collaborators-right-top-list p, .collaborators-right-bottom-list p {
    margin: 0;
    font-size: .67rem;
    line-height: 1.25;
    width: 100%;
}

.case-study-contributions-left-top-list h3, .case-study-contributions-left-bottom-list h3, .collaborators-left h3, .collaborators-right-top-list h3, .collaborators-right-bottom-list h3 {
    font-size: 1rem;
    font-weight: 500;
    text-transform: lowercase;
    margin: .5rem 0;
}

.collaborators-right-bottom-list a {
    text-decoration: none;
    position: relative;
}

.collaborators-right-bottom-list a p {
    text-decoration: none;
    color: #000;
    font-size: .67rem;
    padding-top: 2.25rem;
    width: 100%;    
    transition: opacity 0.3s ease;
}

.collaborators-right-bottom-list a p::after {
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

.collaborators-right-bottom-list a p:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}



.content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .33rem;
}

.collaborators {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    padding: 6rem;
    margin: 0 2rem;
    height: 60vh;
    border-bottom: 1px solid #ccc;
}

.case-study-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 2rem;
    margin-top: 0;
    border-top: 1px solid #000;
}

.case-study-prev-next {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4rem 2rem 0 2rem;
    
}

.case-study-footer a, .case-study-prev-next a {
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    line-height: 1;
    transition: opacity 0.3s ease;
}

.case-study-footer a:hover, .case-study-prev-next a:hover {
    text-decoration: underline;
    opacity: .5;
}


@media (max-width: 768px) {
    .case-study-header {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 2rem 1rem;
    }
    .case-study-header-left {
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 2rem;
    }
    .case-study-header-left h1 {
        max-width: 94%;
        text-align: right;
        font-size: 1.1rem;
        margin-top: -.25rem;
    }
    .case-study-header-right {
        width: 100%;
    }
    .case-study-header-right-clients, .case-study-header-right-roles {
        display: flex;
        flex-direction: column;
        max-width: 9rem;
        gap: .25rem;
    }
    .case-study-contributions, .collaborators {
        flex-direction: column;
        height: 100%;
        padding: 2rem 1rem;
        gap: 2rem;
    }
    .case-study-contributions-left, .collaborators-left {
        width: 100%;
    }
    .case-study-contributions-right, .collaborators-right {
        width: 100%;
        padding: 0;
    }

    .case-study-contributions-left-top-list h3, .case-study-contributions-left-bottom-list h3, .collaborators-right-top-list h3, .collaborators-right-bottom-list h3 {
        font-size: 1rem;
    }
    .case-study-contributions-left-top-list p, .case-study-contributions-left-bottom-list p, .collaborators-right-top-list p, .collaborators-right-bottom-list p {
        font-size: .75rem;
    }

    .case-study-contributions-right-brief {
        width: 100%;
    }
    .case-study-contributions-right-brief h3 {
        font-size: 1rem;
    }
    .case-study-contributions-right-brief p {
        font-size: .75rem;
    }
    .case-study-prev-next a {
        font-size: .75rem;
    }
    .case-study-footer a {
        font-size: .75rem;
    }
   
}


</style>    