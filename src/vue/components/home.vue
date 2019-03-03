<template>
    <v-flex xs8 offset-sm2>
        <v-flex xs12>
          <v-select
            v-model="Titre"
            :items="types"
            menu-props="auto"
            label="Select"
            hide-details
            prepend-icon="list"
            single-line
          ></v-select>
        </v-flex>
        <v-flex xs12>
          <v-text-field color="#5C6BC0" outline append-icon="search" v-model="search" label="Rechercher" data-vv-name="recherche"></v-text-field>
        </v-flex>
               <p>Nombre de film : {{movies.length}}</p>  
        <v-card>
          <v-layout column justify-center>  
            <v-expansion-panel popout>
              <movie-item v-for="(movie) in movies_search" hide-actions v-bind:key="movie.title" v-bind:movie="movie" v-on:remove="remove(movie.id)"></movie-item>
            </v-expansion-panel>
          </v-layout>
        </v-card>
    </v-flex>
</template>
<script>
export default {
  data() {
    return {
        search: "",
        types: [
        'Titre', 'Nom du réalisateur', 'Année de sortie', 'mot clé du synopsys',
        'Langue originale'
      ],
      Titre : "Titre",
      newMovie: {
        title: '',
        year: null,
        language: '',
        realisateur: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: [],
      }
    }
  },
  methods: {
    resetNewMovie() {
      this.newMovie = {
        id: undefined,
        title: '',
        year: null,
        language: '',
        realisateur: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: []
      };
    },

    createMovie() {
      this.$store.dispatch('APIAddMovie', this.newMovie).then(id => {
        this.resetNewMovie();
        this.$router.push({ name: 'movie', params: { id: id } })
      });
    },
    remove(id){
        if (confirm("Etes- vous sur de vouloir supprimer ce film ?")) {
          this.$store.dispatch('APIDeleteMovie', id).then(() => {
          this.$router.push({ name: 'home' })
        });
      }
    }
  },
  computed: {
        movies_search: function() {
          if(this.Titre == "Titre")
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          else if(this.Titre == "Nom du réalisateur")
            return this.movies.filter(m => m.realisateur.name.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          else if(this.Titre == "Année de sortie")
            return this.movies.filter(m => m.year.toString().indexOf(this.search.toLowerCase())!=-1);
          else if(this.Titre == "mot clé du synopsys")
            return this.movies.filter(m => m.synopsys.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
          else if(this.Titre == "Langue originale")
            return this.movies.filter(m => m.language.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        },
    movies() {
      return this.$store.state.movies;
    }
  }
}
</script>
