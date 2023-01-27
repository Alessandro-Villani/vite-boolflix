<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            term: ''
        }
    },
    props: {
        label: [String, Object],
        placeholder: String
    },
    emits: ['search', 'update-term']
}
</script>

<template>
    <form @submit.prevent="$emit('search')">
        <div class="input-group">
            <input type="text" class="form-control" :placeholder="placeholder || 'Cerca...'" v-model="term"
                @keyup="$emit('update-term', term)">
            <button class="btn btn-danger" type="submit">{{ label || 'Cerca' }}</button>
        </div>
    </form>
</template>

<style scoped lang="scss">

</style>