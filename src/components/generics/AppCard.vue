<script>
export default {
    props: {
        title: String,
        originalTitle: String,
        language: String,
        rating: Number,
        overview: String
    }
}
</script>

<template>
    <div class="card text-center">
        <h3>{{ title }}</h3>
        <h5>{{ originalTitle }}</h5>
        <p>{{ language }}</p>
        <p>{{ rating }}</p>
        <p>{{ overview || 'N/A' }}</p>
    </div>
</template>

<style scoped lang="scss">

</style>