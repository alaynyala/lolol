<template>
    <div>
        <CaseStudy :case-study="caseStudy" />
    </div>
</template>

<script setup>
import CaseStudy from '~/components/CaseStudy.vue'
const { slug } = useRoute().params
const caseStudy = await queryContent('case-studies').where({ slug }).findOne()

if (!caseStudy) {
    navigateTo('/case-studies')
}

</script>