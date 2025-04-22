<template>
    <div class="project-page">
        <ContentList path="/case-studies" :where="{ order: { $in: [1, 2, 3] } }" :sort="{ order: 1 }" v-slot="{ list }">
            <div class="case-studies">
                <div v-if="pending">Loading...</div>
                <div v-else-if="!list?.length">No projects found.</div>
                <div v-else class="item" v-for="caseStudy in list" :key="caseStudy._id">
                            <div class="id">
                                <div class="dot-order-wrapper">
                                    <div class="dot" :style="{ backgroundColor: caseStudy.color }"></div>
                                    <div class="order">0{{ caseStudy.order }}</div>
                                </div>
                                <div class="title">{{ caseStudy.title }}</div>
                                <div class="subtitle">{{ caseStudy.subtitle }}</div>
                                <div class="roles">
                    <p v-for="role in caseStudy.roles" :key="role">{{ role }}</p>
                </div>
                            <div class="year">{{ caseStudy.year }}</div>
                            <div class="project-link">
                            <a :href="`/case-studies/${caseStudy.slug}`">view project
                                <svg width="37" height="8" viewBox="0 0 37 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M36.3536 4.38578C36.5488 4.19052 36.5488 3.87394 36.3536 3.67867L33.1716 0.496693C32.9763 0.30143 32.6597 0.30143 32.4645 0.496693C32.2692 0.691955 32.2692 1.00854 32.4645 1.2038L35.2929 4.03223L32.4645 6.86065C32.2692 7.05592 32.2692 7.3725 32.4645 7.56776C32.6597 7.76302 32.9763 7.76302 33.1716 7.56776L36.3536 4.38578ZM0 4.53223H36V3.53223H0V4.53223Z"
                                        fill="black" />
                                </svg>
                            </a>
                            </div>
                        </div>
                </div>
            </div>
        </ContentList>
        <ContentList path="/projects" :where="{ order: { $in: [4, 5] } }" :sort="{ order: 1 }" v-slot="{ list }">
            <div class="archive-projects">
                <div v-if="pending">Loading...</div>
                <div v-else-if="!list?.length">No projects found.</div>
                <div v-else class="item" v-for="project in list" :key="project._id">
                            <div class="id">
                                <div class="dot-order-wrapper">
                                    <div class="dot" :style="{ backgroundColor: project.color }"></div>
                                    <div class="order">0{{ project.order }}</div>
                                </div>
                                <div class="title">{{ project.title }}</div>
                                <div class="subtitle">{{ project.subtitle }}</div>
                                <div class="roles">
                                <p v-for="role in project.roles" :key="role">{{ role }}</p>
                            </div>
                            <div class="year">{{ project.year }}</div>
                            <div class="project-link">
                            <a :href="`/projects/${project.slug}`">view project
                                <svg width="37" height="8" viewBox="0 0 37 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M36.3536 4.38578C36.5488 4.19052 36.5488 3.87394 36.3536 3.67867L33.1716 0.496693C32.9763 0.30143 32.6597 0.30143 32.4645 0.496693C32.2692 0.691955 32.2692 1.00854 32.4645 1.2038L35.2929 4.03223L32.4645 6.86065C32.2692 7.05592 32.2692 7.3725 32.4645 7.56776C32.6597 7.76302 32.9763 7.76302 33.1716 7.56776L36.3536 4.38578ZM0 4.53223H36V3.53223H0V4.53223Z"
                                        fill="black" />
                                </svg>
                            </a>
                            </div>
                        </div>
                </div>
            </div>
        </ContentList>
        <ContentList path="/art" :where="{ order: { $in: [6, 7, 8] } }" :sort="{ order: 1 }" v-slot="{ list }">
            <div class="art">
                <div v-if="pending">Loading...</div>
                <div v-else-if="!list?.length">No projects found.</div>
                <div v-else class="item" v-for="art in list" :key="art._id">
                   
                    <div class="id">
                        <div class="dot-order-wrapper">
                            <div class="dot" :style="{ backgroundColor: art.color }"></div>
                            <div class="order">0{{ art.order }}</div>
                        </div>
                        <div class="title">{{ art.title }}</div>
                        <div class="subtitle">{{ art.subtitle }}</div>
                        <div class="roles">
                            <p v-for="role in art.roles" :key="role">{{ role }}</p>
                        </div>
                        <div class="year">{{ art.year }}</div>
                        <div class="project-link">
                                <a :href="`/art/${art.slug}`">view project
                                <svg width="37" height="8" viewBox="0 0 37 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M36.3536 4.38578C36.5488 4.19052 36.5488 3.87394 36.3536 3.67867L33.1716 0.496693C32.9763 0.30143 32.6597 0.30143 32.4645 0.496693C32.2692 0.691955 32.2692 1.00854 32.4645 1.2038L35.2929 4.03223L32.4645 6.86065C32.2692 7.05592 32.2692 7.3725 32.4645 7.56776C32.6597 7.76302 32.9763 7.76302 33.1716 7.56776L36.3536 4.38578ZM0 4.53223H36V3.53223H0V4.53223Z"
                                        fill="black" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </ContentList>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isCaseStudy = computed(() => route.path.includes('/case-studies'))
const isProject = computed(() => route.path.includes('/projects'))
const isArt = computed(() => route.path.includes('/art'))




</script>

<style>
.project-page {
    width: 100vw;
    display: flex;
    flex-direction: column;
    font-size: .75rem;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
}




.case-studies, .art, .archive-projects {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 0 1rem;
   
}


.item {
    width: 98%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #00000072;
    padding-top: 1rem;
    height: 4rem;
}

.case-studies .item:first-child {
    border-top: 1px solid #00000072;
}

.item a {
    color: #000;
    text-decoration: none;
}
.order {
    width: 5%;
    font-size: .75rem;
    font-weight: 400;
}
.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 1rem;
}

.id {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding-bottom: 1rem;
}
.dot-order-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

.roles {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    font-size: .75rem;
    font-weight: 400;
    width: 100%;
    max-width: 13rem;
}

.roles p {
    margin: 0;
    padding: 0;
    gap: 0;
}

.category, .year {
    font-size: .75rem;
    font-weight: 400;
}

.title {
    width: 100%;
    max-width: 13rem;
    align-self: flex-start;
    text-transform: uppercase;
}

.subtitle {
    width: 100%;
    max-width: 8rem;
}

.project-link {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    max-width: 17.5rem;
}
.project-link a {
    font-size: .75rem;
}
.project-link svg {
    width: 2rem;
}

.project-link svg path {
    fill: #000;
}

@media (max-width: 768px) {
    .project-page {
        font-size: .67rem;
        margin: 0;
    }
    .case-studies, .projects, .art {
        width: 90%;
        padding: 0;
        margin: 0 auto;
    }
    .case-studies .item:first-child {
    border-top: none;
}

    .item {
        padding: 1rem 0;
        justify-content: center;
    }
   
    .id {
        width: 95%;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 6px;
        padding: 0;
    }
    .order {
        width: 30%;
        justify-self: flex-end;
        font-size: .67rem;
        font-weight: 500;
    }
    .title {
       width: 65%;
       text-align: right;
       font-size: .67rem;
       align-self: flex-start;
       font-weight: 500;
    }
    .subtitle {
       width: 25%;
       align-self: flex-start;
       text-align: left;
       font-size: .67rem;
       color: #00000064;
    }
    .roles {
        display: none;
    }
    .year {
        display: none;
    }
    .project-link { 
        width: 40%;
        justify-content: flex-end;      
        align-self: flex-end;
    }
    .project-link a {
        align-self: flex-end;
        font-size: .67rem;
    }
    .project-link svg {
        width: 1.5rem;
    }
}

</style>