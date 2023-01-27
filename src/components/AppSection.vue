<script>
import ProductionsCard from './productions/ProductionsCard.vue';

export default {
    props: {
        title: String,
        array: Array
    },
    components: { ProductionsCard }
}
</script>

<template>
    <section :id="title" class="container">
        <h2 class="py-2 mb-4">{{ title }}</h2>
        <div class="row row-cols-5">
            <ProductionsCard v-for="item in array" :key="item.id" v-bind="item" />
        </div>
    </section>
</template>

<style scoped lang="scss">
h2 {
    color: white;
    border-bottom: 1px solid white;
}
</style>