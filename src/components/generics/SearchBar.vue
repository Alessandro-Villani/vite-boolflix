<script>
export default {
    name: 'SearchBar',
    data() {
        return {
            term: ''
        }
    },
    props: {
        label: String,
        placeholder: String
    },
    emits: ['search', 'update-term'],
    methods: {
        submitForm() {
            this.term = '';
            this.$refs.searchbar.focus();
            this.$emit('search');
        }
    }
}
</script>

<template>
    <form @submit.prevent="submitForm">
        <div class="input-group">
            <input ref="searchbar" type="text" class="form-control" :placeholder="placeholder || 'Cerca...'"
                v-model.trim="term" @keyup="$emit('update-term', term)" @keyup.esc="term = ''">
            <button class="btn btn-danger" type="submit">{{ label || 'Cerca' }}</button>
        </div>
    </form>
</template>

<style scoped lang="scss">

</style>