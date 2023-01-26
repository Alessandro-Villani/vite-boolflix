<script>
export default {
    props: {
        title: String,
        originalTitle: String,
        language: String,
        rating: Number,
        emptyStars: Number,
        overview: String,
        imgUrl: String
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
        <figure v-if="imgUrl" class="w-50 m-auto">
            <img class="img-fluid" :src="imgUrl" :alt="title">
        </figure>
        <figure class="w-50 m-auto">
            <img class="img-fluid" :src="getImageUrl(language)" :alt="language">
        </figure>
        <div class="rating d-flex justify-content-center">
            <font-awesome-icon icon="fa-solid fa-star" v-for="index in rating" :key="index" />
            <font-awesome-icon icon="fa-regular fa-star" v-for="index in emptyStars" :key="index" />
        </div>
        <p>{{ overview || 'N/A' }}</p>
    </div>
</template>

<style scoped lang="scss">

</style>