import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './routes.js';

import MovieItemComponent from './components/movieitem.vue'

import Datepicker from 'vuejs-datepicker';


import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

const axios = require('axios');


Vue.use(Vuex);

Vue.use(Vuetify, {
    theme: {
      primary: '#3f51b5',
      secondary: '#b0bec5',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  })

Vue.component('movie-item', MovieItemComponent);
Vue.component('Datepicker', Datepicker);

var store = new Vuex.Store({
    state: {
        movies: []
    },
    mutations: { //Fonction modifiant les données en local.
        addMovie(state, movie) {
            state.movies.push(movie);
        },
        deleteMovie(state, id) {
            var index = state.movies.findIndex(movie => movie.id == id);
            if (index !== -1) {
                state.movies.splice(index, 1);
            }
        },
        updateMovieList(state, movies) {
            state.movies = movies;
        },
        updateOneMovie(state, movie) {
            var index = state.movies.findIndex(storedMovie => storedMovie.id == movie.id);
            if (index !== -1) {
                state.movies[index] = movie;
            }
        },
        rateMovie(state, params) {
            var index = state.movies.findIndex(movie => movie.id == params.id);
            if (index !== -1) {
                if(state.movies[index].ratings[0] == -1)
                {
                    state.movies[index].ratings[0] = params.rating;
                }
                else
                {
                    state.movies[index].ratings.push(params.rating);
                }
            }
        }
    },
    actions: {//appels api grace a axios pour les differentes fonctionnalités présentes
        APIGetMovieList(context) {
            axios.get('/api/movies').then(function (response) {
                context.commit('updateMovieList', response.data);
            })
        },
        APIAddMovie(context, params) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append('movie', JSON.stringify(params.movie));
                formData.append('uneAffiche', params.uneAffiche);
                axios.post('/api/movies', formData)
                    .then(response => {
                        if (response.status === 200) {
                            context.commit('addMovie', response.data);
                            resolve(response.data.id);
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        APIDeleteMovie(context, id) {
            return new Promise((resolve, reject) => {
                axios.get(`/api/movies/${id}/delete`)
                    .then(response => {
                        if (response.status == 204) {
                            context.commit('deleteMovie', id);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        APIUpdateMovie(context, params) {
            return new Promise((resolve, reject) => {
                var formData = new FormData();
                formData.append('movie', JSON.stringify(params.movie));
                formData.append('uneAffiche', params.uneAffiche);

                axios.post(`/api/movies/${params.movie.id}`, formData)
                    .then(response => {
                        if (response.status === 200) {
                            context.commit('updateOneMovie', response.data);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        },
        APIRateMovie(context, params) {
            return new Promise((resolve, reject) => {
                axios.post(`/api/movies/${params.id}/rate`, { rating: params.rating })
                    .then(response => {
                        if (response.status == 204) {
                            context.commit('rateMovie', params);
                            resolve();
                        } else {
                            reject();
                        }
                    })
                    .catch(() => {
                        reject();
                    })
            })
        }
    }
});

const app = new Vue({
    el: '#app',
    router,
    store: store,
    render: h => h(App),
    mounted() {
        this.$store.dispatch('APIGetMovieList')
    }
});
