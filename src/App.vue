<script>
import axios from 'axios';
import SearchBar from './components/generics/SearchBar.vue';
import AppCard from './components/generics/AppCard.vue'
import { apiUri, apiKey, getMovies, getTvSeries, getSingleMovie } from './assets/data'

export default {
  name: "Boolflix",
  data() {
    return {
      titleToSearch: '',
      apiUri,
      apiKey,
      getMovies,
      getTvSeries,
      getSingleMovie,
      foundMovies: []
    }
  },
  computed: {
    moviesEndpoint() {
      return this.apiUri + this.getMovies
    },
    singleMovieEndpoint() {
      return this.apiUri + this.getSingleMovie
    }
  },
  components: { SearchBar, AppCard },
  methods: {
    getTitleToSearch(title) {
      this.titleToSearch = title;
    },
    fetchSearchedMovies() {
      const config = {
        params: {
          api_key: this.apiKey,
          query: this.titleToSearch,
          language: 'IT-it'
        }
      }
      axios.get(this.moviesEndpoint, config).then(res => {
        const movies = res.data.results;
        this.foundMovies = movies.map(movie => {
          const { id, title, original_title, original_language, vote_average } = movie
          return { id, title, originalTitle: original_title, language: original_language, rating: vote_average }
        });
        this.foundMovies.forEach(movie => {
          console.log(movie.id);
          this.fetchMovieOverview(movie.id);
        })
        console.log(this.foundMovies);
      }).catch(err => { console.error(err) })
    },
    fetchMovieOverview(id) {
      const endpoint = this.singleMovieEndpoint + id + '?api_key=' + this.apiKey + '&language=IT-it';
      console.log(endpoint);
      axios.get(endpoint).then(res => {
        console.log(res.data.overview);
        this.foundMovies.map(movie => {
          if (movie.id === id) {
            movie.overview = res.data.overview;
          }
        })
      })
    }
  }
}
</script>

<template>
  <main class="container py-5">
    <SearchBar @update-term="getTitleToSearch" @search="fetchSearchedMovies" />
    <AppCard v-for="movie in foundMovies" :key="movie.id" v-bind="movie" />
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss';
</style>
