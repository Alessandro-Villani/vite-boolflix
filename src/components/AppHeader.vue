<script>
import SearchBar from './generics/SearchBar.vue';

export default {
    components: { SearchBar },
    emits: ['update-title', 'search-title']
}
</script>

<template>
    <header class="d-flex align-items-center">
        <nav class="container d-flex justify-content-between align-items-center">
            <div class="nav-left">
                <h1 class="mb-0"><a href="#">BOOLFLIX</a></h1>
            </div>
            <div class="nav-right">
                <SearchBar placeholder="Cerca Film e Serie TV" @update-term="$emit('update-title', $event)"
                    @search="$emit('search-title', $event)" />

            </div>
        </nav>
    </header>
</template>

<style scoped lang="scss">
header {
    font-family: "Bebas Neue", cursive;
    height: 100px;
    background-color: black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2;

    a {
        text-decoration: none;
        color: rgb(229, 9, 20);
    }
}
</style>