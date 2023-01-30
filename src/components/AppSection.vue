<script>
import ProductionsCard from './productions/ProductionsCard.vue';

export default {
    props: {
        title: String,
        array: Array
    },
    components: { ProductionsCard },
    methods: {
        scroll(direction) {
            const container = this.$el.querySelector(".row");
            const col = this.$el.querySelector(".col-2");
            const colWidth = col.offsetWidth;
            let currentScroll = container.scrollLeft;

            if (direction === 'right') {
                container.scrollTo({
                    left: currentScroll + colWidth,
                    behavior: "smooth"
                });
            } else {
                container.scrollTo({
                    left: currentScroll - colWidth,
                    behavior: "smooth"
                });
            }
        }
    },
}
</script>

<template>
    <section :id="title">
        <h2 class="py-2 mb-4 mx-1">{{ title }}</h2>
        <font-awesome-icon icon="fa-solid fa-circle-chevron-left" class="fa-4x" @click="scroll('left')" />
        <div class="row flex-nowrap align-items-center py-5 px-0 mx-1">
            <ProductionsCard v-for="item in array" :key="item.id" v-bind="item" />
        </div>
        <font-awesome-icon icon="fa-solid fa-circle-chevron-right" class="fa-4x" @click="scroll('right')" />
    </section>
</template>

<style scoped lang="scss">
section {
    position: relative;

    &:hover svg {
        opacity: 0.8;
        z-index: 2;
        cursor: pointer;
    }
}

h2 {
    color: white;
    border-bottom: 1px solid white;
}

.row {
    overflow-x: hidden;
    position: relative;
}

svg {
    position: absolute;
    top: 50%;
    opacity: 0;
    transition: all 0.5s;
    color: white;

    &.fa-circle-chevron-left {
        left: 10px;
    }

    &.fa-circle-chevron-right {
        right: 10px;
    }

    &:hover {
        scale: 1.2;
    }
}
</style>