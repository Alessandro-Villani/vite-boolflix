import { reactive } from 'vue'

export const store = reactive({
    foundMovies: [],
    foundTvSeries: [],
    isLoading: false
})