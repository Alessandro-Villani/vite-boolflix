<script>
import axios from 'axios';
import ProductionsCard from './components/productions/ProductionsCard.vue';
import { apiUri, apiKey, getMovies, getTvSeries, getSingleMovie, getGenres } from './assets/data';
import { store } from './assets/data/store';
import AppHeader from './components/AppHeader.vue';
import AppSection from './components/AppSection.vue';

export default {
  name: "Boolflix",
  data() {
    return {
      store,
      titleToSearch: '',
      appliedFilter: 0,
    }
  },
  computed: {
    filteredMovies() {
      if (this.appliedFilter) {
        const filteredMovies = this.filterProductionsByGenre(store.foundMovies);
        return filteredMovies;
      } else {
        return store.foundMovies
      }
    },
    filteredSeries() {
      if (this.appliedFilter) {
        const filteredSeries = this.filterProductionsByGenre(store.foundTvSeries);
        return filteredSeries;
      } else {
        return store.foundTvSeries
      }
    },
    moviesEndpoint() {
      return apiUri + getMovies
    },
    tvSeriesEndpoint() {
      return apiUri + getTvSeries
    },
    singleMovieEndpoint() {
      return apiUri + getSingleMovie
    },
    genresEndpoint() {
      return apiUri + getGenres
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
  components: { ProductionsCard, AppHeader, AppSection },
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
        let productions = res.data.results;
        console.log('1');
        console.log(productions);
        console.log(this.appliedFilter);
        if (productions) {
          // Operations in case of movies
          if (item === 'movies') {
            //Map for destructuring
            store.foundMovies = productions.map(movie => {
              const { id, title, original_title, original_language, vote_average, poster_path, genre_ids } = movie
              const rating = Math.ceil(vote_average / 2);
              const imgUrl = poster_path ? 'https://image.tmdb.org/t/p/w342' + poster_path : ''
              return { id, title, originalTitle: original_title, language: original_language, rating, imgUrl, genre_ids }

            });
            //Taking overview for each movie from single movie API call
            store.foundMovies.forEach(movie => {
              this.fetchMovieOverview(movie.id);
            });
            this.sortObjectsById(store.foundMovies)
          }
          //Operations in case of tv series
          else {
            //Map for destructuring
            store.foundTvSeries = productions.map(series => {
              const { id, name, original_name, original_language, vote_average, poster_path, genre_ids, overview } = series
              const rating = Math.ceil(vote_average / 2);
              const imgUrl = poster_path ? 'https://image.tmdb.org/t/p/w342' + poster_path : ''
              return { id, title: name, originalTitle: original_name, language: original_language, rating, imgUrl, genre_ids, overview }

            });
            this.sortObjectsById(store.foundTvSeries);
          }
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
    //Function fetching all movie genres
    fetchGenres() {
      axios.get(this.genresEndpoint, { params: { api_key: apiKey } }).then(res => {
        console.log(res.data.genres)
        const genresList = res.data.genres;
        this.sortObjectsById(genresList);
        store.genres = genresList;
      })
    },
    getAppliedFilter(filter) {
      this.appliedFilter = parseInt(filter);
    },
    filterProductionsByGenre(productions) {
      console.log('2');
      console.log(productions);
      return productions.filter(prod => {
        return prod.genre_ids.includes(this.appliedFilter);
      })
    },
    //Function sorting an array by ID
    sortObjectsById(array) {
      array = array.sort((a, b) => { return a.id - b.id })
    }
  },
  mounted() {
    this.fetchGenres();
  }
}
</script>

<template>
  <AppHeader @update-title="getTitleToSearch" @search-title="searchMovieAndSeries" @change-filter="getAppliedFilter" />
  <main>
    <AppSection v-if="filteredMovies.length" title="Movies" :array="filteredMovies" />
    <AppSection v-if="filteredSeries.length" title="TV Series" :array="filteredSeries" />
  </main>
</template>

<style lang="scss">
@use './assets/styles/style.scss';
</style>
