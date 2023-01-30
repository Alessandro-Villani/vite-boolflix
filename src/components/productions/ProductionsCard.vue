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
            const flag = ['it', 'en', 'es', 'fr', 'pl', 'sv', 'tl', 'hi', 'pt', 'ko', 'nl', 'de', 'ja', 'id', 'ro', 'hu', 'mo', 'ru'];
            return flag.includes(this.language);
        },
        getImageUrl() {
            return new URL(`../../assets/img/flags/${this.language}.png`, import.meta.url).href;
        },
    },
    methods: {
        starClass(i) {
            const starClass = i <= this.rating ? 'fa-solid' : 'fa-regular'
            return 'fa-star ' + starClass;
        }
    }
}
</script>

<template>
    <div class="col mb-3">
        <div class="card text-center" :class="{ 'no-img': !imgUrl }"
            :style="{ 'background-image': 'url(' + imgUrl + ')' }">
            <h3 class="mt-3" v-if="!imgUrl">{{ title }}</h3>
            <div class="overlay px-1 py-3">
                <h3 v-if="imgUrl">{{ title }}</h3>
                <h6>{{ originalTitle }}</h6>
                <figure v-if="hasFlag">
                    <img class="flag" :src="getImageUrl" :alt="language">
                </figure>
                <p v-else>{{ language }}</p>
                <div class="rating d-flex justify-content-center mb-3">
                    <font-awesome-icon v-for="i in 5" :icon="starClass(i)" :key="i" />
                </div>
                <h5>Trama:</h5>
                <p>{{ overview || 'N/A' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    height: 300px;
    overflow-y: hidden;
    border-width: 0;
    color: white;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    cursor: pointer;

    &.no-img {
        background-color: black;
    }

    h3 {
        font-size: 20px;
    }

    .overlay {
        background-color: black;
        position: relative;
        z-index: 1;
        width: 100%;
        min-height: 100%;
        overflow-y: auto;
        opacity: 0;
        transition: all 1s;

        .flag {
            width: 30px;
        }

        h5 {
            font-size: 14px;
        }

        h6,
        p {
            font-size: 12px;
        }
    }

    &:hover .overlay {
        opacity: 1;
    }

}

::-webkit-scrollbar {
    width: 5px;
    background-color: black;
}

::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 2px;
}
</style>