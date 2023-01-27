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
    computed: {
        hasFlag() {
            const flag = ['it', 'en'];
            return flag.includes(this.language);
        },
        getImageUrl() {
            return new URL(`../../assets/img/flags/${this.language}.png`, import.meta.url).href;
        },
    }
}
</script>

<template>
    <div class="col">
        <div class="card text-center">
            <h3>{{ title }}</h3>
            <h5>{{ originalTitle }}</h5>
            <figure v-if="imgUrl" class="w-50 m-auto">
                <img class="img-fluid" :src="imgUrl" :alt="title" @error="(e) => e.target.src = '/no-image.png'">
            </figure>
            <figure v-if="hasFlag" class="w-50 m-auto">
                <img class="img-fluid" :src="getImageUrl" :alt="language">
            </figure>
            <p v-else>{{ language }}</p>
            <div class="rating d-flex justify-content-center">
                <font-awesome-icon icon="fa-solid fa-star" v-for="index in rating" :key="index" />
                <font-awesome-icon icon="fa-regular fa-star" v-for="index in emptyStars" :key="index" />
            </div>
            <p>{{ overview || 'N/A' }}</p>
        </div>
    </div>
</template>

<style scoped lang="scss">

</style>