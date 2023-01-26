<script>
export default {
    props: {
        title: String,
        originalTitle: String,
        language: String,
        rating: Number,
        overview: String
    },
    methods: {
        getImageUrl(image) {
            return new URL(`../../assets/img/flags/${image}.png`, import.meta.url).href;
        },
    }
}
</script>

<template>
    <div class="card text-center">
        <h3>{{ title }}</h3>
        <h5>{{ originalTitle }}</h5>
        <figure class="w-50 m-auto">
            <img class="img-fluid" :src="getImageUrl(language)" :alt="language">
        </figure>
        <p>{{ rating }}</p>
        <p>{{ overview || 'N/A' }}</p>
    </div>
</template>

<style scoped lang="scss">

</style>