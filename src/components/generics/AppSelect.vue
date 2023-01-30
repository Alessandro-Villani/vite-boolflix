<script>
export default {
    data() {
        return {
            optionValue: 0
        }
    },
    props: {
        label: String,
        dafaultOption: String,
        options: Array
    },
    emits: ['option-change']
}
</script>

<template>
    <div class="d-flex align-items-center me-2">
        <label class="text-white me-2" for="floatingSelect">{{ label }}</label>
        <select class="form-select" id="floatingSelect" v-model="optionValue"
            @change="$emit('option-change', optionValue)">
            <option value="0">{{ dafaultOption || '...' }}</option>
            <option v-for="option in options" :key="option.id" :value="option.id">{{ option.name }}</option>
        </select>
    </div>
</template>

<style>

</style>