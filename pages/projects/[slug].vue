<template>
    <div>
        <Project :project="project" />
    </div>
</template>

<script setup>
import Project from '~/components/Project.vue'
const { slug } = useRoute().params
const project = await queryContent('projects').where({ slug }).findOne()

if (!project) {
    navigateTo('/projects')
}

</script>