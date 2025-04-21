<template>
    <div class="project">
        <div id="project-header" class="project-header">
            <div class="project-header-left">
                <div class="dot" :style="{ backgroundColor: project.color || '#000' }"></div>
                <h1>{{ project.title }}</h1>
            </div>
            <div class="project-header-right">
                <div class="project-header-right-clients">
                    <p v-for="client in project.clients" :key="client">{{ client }}</p>
                </div>
                <div class="project-header-right-roles">
                    <p v-for="role in project.roles" :key="role">{{ role }}</p>
                </div>
                <p>{{ project.year }}</p>
            </div>
        </div>
        <div class="project-hero">
            <img class="project-hero-image" :src="project.featured_image" alt="Project Hero Image">
        </div>
        <div class="project-images">
            <Carousel :project="project" />
        </div>
        <div class="project-content">
            <ContentDoc />
        </div>
        <div class="project-prev-next">
            <NuxtLink :to="project.previous"><p>view prev</p></NuxtLink>
            <NuxtLink :to="project.next"><p>view next</p></NuxtLink>
        </div>
        <div class="project-footer">
            <NuxtLink to="/"><p>home</p></NuxtLink>
            <NuxtLink to="#project-header"><p>back to top</p></NuxtLink>
        </div>
    </div>
</template>

<script setup>
const { project } = defineProps({
    project: Object
})
</script>

<style scoped>
.project {
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    padding: .33rem;
    margin: 0;
}


.project-header {
    display: flex;
    justify-content: space-between;
    padding: 6rem 2rem 2rem 2rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.project-header-left {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 16px;
    padding-bottom: 1rem;
}

.project-header-left h1 {
    font-size: 20px;
    font-weight: 600;
    text-transform: uppercase;
    margin: 0;
    line-height: 1;
}

.project-header-right {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    width: 60%
}

.project-header-right p {
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

.project-hero {
    width: 100%;
    height: 80%;
    position: relative;
}   

.project-hero-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: .33rem;
}


.project-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: auto;
}

.project-content h2 {
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: lowercase;
    margin: 0;
}
.project-content-left {
    width: 50%;
}


.content-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: .33rem;
}



.project-footer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 2rem;
    margin-top: 0;
    border-top: 1px solid #000;
}

.project-prev-next {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 4rem 2rem 0 2rem;
    
}

.project-footer a, .project-prev-next a {
    text-decoration: none;
    color: #000;
    font-size: 1rem;
    line-height: 1;
    transition: opacity 0.3s ease;
}

.project-footer a:hover, .project-prev-next a:hover {
    text-decoration: underline;
    opacity: .5;
}


@media (max-width: 768px) {
    .project-header {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 2rem 1rem;
    }
    .project-header-left {
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;
        padding-bottom: 2rem;
    }
    .project-header-left h1 {
        max-width: 94%;
        text-align: right;
        font-size: 1.1rem;
        margin-top: -.25rem;
    }
    .project-header-right {
        width: 100%;
    }
    .project-header-right-clients, .project-header-right-roles {
        display: flex;
        flex-direction: column;
        max-width: 9rem;
        gap: .25rem;
    }
    .project-prev-next a {
        font-size: .75rem;
    }
    .project-footer a {
        font-size: .75rem;
    }
   
}


</style>    