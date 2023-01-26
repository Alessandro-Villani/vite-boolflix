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
      foundMovies: [],
      foundTvSeries: []
    }
  },
  computed: {
    moviesEndpoint() {
      return apiUri + getMovies
    },
    tvSeriesEndpoint() {
      return apiUri + getTvSeries
    },
    singleMovieEndpoint() {
      return apiUri + getSingleMovie
    }
  },
  components: { SearchBar, AppCard },
  methods: {
    getTitleToSearch(title) {
      this.titleToSearch = title;
    },
    searchMovieAndSeries() {
      this.fetchSearched('movies');
      this.fetchSearched('series');
    },
    fetchSearched(item) {
      const config = {
        params: {
          api_key: apiKey,
          query: this.titleToSearch,
          language: 'IT-it'
        }
      }
      const endpoint = item === 'movies' ? this.moviesEndpoint : this.tvSeriesEndpoint
      axios.get(endpoint, config).then(res => {
        if (item === 'movies') {
          const movies = res.data.results;
          this.foundMovies = movies.map(movie => {
            const { id, title, original_title, original_language, vote_average, poster_path } = movie
            const rating = Math.ceil(vote_average / 2);
            const emptyStars = 5 - rating
            return { id, title, originalTitle: original_title, language: original_language, rating, emptyStars, imgUrl: 'https://image.tmdb.org/t/p/w342' + poster_path }

          });
          this.foundMovies.forEach(movie => {
            console.log(movie.id);
            this.fetchMovieOverview(movie.id);
          })
          console.log(this.foundMovies);
        }
        else {
          const tvSeries = res.data.results;
          console.log(tvSeries);
          this.foundTvSeries = tvSeries.map(series => {
            console.log(series);
            console.log('overview' + series.overview)
            const { id, name, original_name, original_language, vote_average, poster_path, overview } = series
            const rating = Math.ceil(vote_average / 2);
            return { id, title: name, originalTitle: original_name, language: original_language, rating, emptyStars, imgUrl: 'https://image.tmdb.org/t/p/w342' + poster_path, overview }

          });
          console.log(this.foundTvSeries);
        }
      }).catch(err => { console.error(err) })
    },
    fetchMovieOverview(id) {
      const endpoint = this.singleMovieEndpoint + id + '?api_key=' + apiKey + '&language=IT-it';
      console.log(endpoint);
      axios.get(endpoint).then(res => {
        console.log(res.data.overview);
        this.foundMovies.map(movie => {
          if (movie.id === id) {
            movie.overview = res.data.overview;
          }
        })
      })
    },
  }
}
</script>

<template>
  <main class="container py-5">
    <SearchBar @update-term="getTitleToSearch" @search="searchMovieAndSeries" />
    <AppCard v-for="movie in foundMovies" :key="movie.id" v-bind="movie" />
    <AppCard v-for="series in foundTvSeries" :key="series.id" v-bind="series" />
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss';
</style>
