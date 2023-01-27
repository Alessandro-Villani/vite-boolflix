<script>
import axios from 'axios';
import ProductionsCard from './components/productions/ProductionsCard.vue';
import { apiUri, apiKey, getMovies, getTvSeries, getSingleMovie } from './assets/data';
import { store } from './assets/data/store';
import AppHeader from './components/AppHeader.vue';

export default {
  name: "Boolflix",
  data() {
    return {
      store,
      titleToSearch: '',
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
    },
    axiosConfig() {
      return {
        params: {
          api_key: apiKey,
          query: this.titleToSearch,
          language: 'IT-it'
        }
      }
    }
  },
  components: { ProductionsCard, AppHeader },
  methods: {
    // Get title to search from event emit
    getTitleToSearch(title) {
      this.titleToSearch = title;
    },

    // Search movie and series and put it in dedicated array
    searchMovieAndSeries() {
      if (!this.titleToSearch) {
        store.foundMovies = [];
        store.foundTvSeries = [];
        return
      }
      this.fetchSearched('movies');
      this.fetchSearched('series');
    },

    // Search movies or series based on parameter
    fetchSearched(item) {
      const endpoint = item === 'movies' ? this.moviesEndpoint : this.tvSeriesEndpoint
      axios.get(endpoint, this.axiosConfig).then(res => {
        const productions = res.data.results;
        // Operations in case of movies
        if (item === 'movies') {
          //Map for destructuring
          store.foundMovies = productions.map(movie => {
            const { id, title, original_title, original_language, vote_average, poster_path } = movie
            const rating = Math.ceil(vote_average / 2);
            const emptyStars = 5 - rating
            return { id, title, originalTitle: original_title, language: original_language, rating, emptyStars, imgUrl: 'https://image.tmdb.org/t/p/w342' + poster_path }

          });
          //Taking overview for each movie from single movie API call
          store.foundMovies.forEach(movie => {
            this.fetchMovieOverview(movie.id);
          })
        }
        //Operations in case of tv series
        else {
          //Map for destructuring
          store.foundTvSeries = productions.map(series => {
            const { id, name, original_name, original_language, vote_average, poster_path, overview } = series
            const rating = Math.ceil(vote_average / 2);
            const emptyStars = 5 - rating;
            return { id, title: name, originalTitle: original_name, language: original_language, rating, emptyStars, imgUrl: 'https://image.tmdb.org/t/p/w342' + poster_path, overview }

          });
        }
      }).catch(err => { console.error(err) })
    },
    //Function taking overview of single movie
    fetchMovieOverview(id) {
      const endpoint = this.singleMovieEndpoint + id + '?api_key=' + apiKey + '&language=IT-it';
      axios.get(endpoint).then(res => {
        store.foundMovies.map(movie => {
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
  <main>
    <AppHeader @update-title="getTitleToSearch" @search-title="searchMovieAndSeries" />
    <h2>MOVIES</h2>
    <ProductionsCard v-for="movie in store.foundMovies" :key="movie.id" v-bind="movie" />
    <h2>TV SERIES</h2>
    <ProductionsCard v-for="series in store.foundTvSeries" :key="series.id" v-bind="series" />
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss';
</style>
