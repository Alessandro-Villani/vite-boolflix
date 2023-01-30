import { reactive } from 'vue'

export const store = reactive({
    foundMovies: [],
    foundTvSeries: [],
    genres: [],
    isLoading: false
})