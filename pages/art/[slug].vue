<template>
    <div>
        <Art :art="art" />
    </div>
</template>

<script setup>
import Art from '~/components/Art.vue'
const { slug } = useRoute().params
const art = await queryContent('art').where({ slug }).findOne()

if (!art) {
    navigateTo('/art')
}

</script>