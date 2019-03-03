<template>
  <v-expansion-panel-content hide-actions>
    <v-layout slot="header" align-center row spacer>
      <v-flex xs4 sm2 md1>
        <v-avatar slot="activator" size="36px">
          <img :src="image" alt="Image film" class="img-fluid">
        </v-avatar>
      </v-flex>

      <v-flex sm5 md3 hidden-xs-only>
        <strong v-html="movie.title"></strong>
      </v-flex>

      <v-flex no-wrap xs5 sm3>
        <strong v-html="movie.year"></strong>
      </v-flex>

      <v-flex class="grey--text" ellipsis hidden-sm-and-down>
        &mdash;
        {{ miniresum }}
      </v-flex>
    </v-layout>

    <v-card>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout row wrap>
        <v-flex xs6>
          <v-img :src="image" alt="Image film"></v-img>
        </v-flex>
        <v-flex xs6>
          <p>Langue originale : {{movie.language}}</p>
          <p>Genre : {{movie.genre}}</p>

        <p>Synopsys : {{ movie.synopsys }}</p>
        </v-flex>
        </v-layout>
        
        <v-layout row wrap>
        <v-flex xs6>
          <ul>
          <v-icon left light>person</v-icon>Réalisé par :
          <li>Nom : {{ movie.realisateur.name }}</li>
          <li>Nationnalité : {{ movie.realisateur.nationality }}</li>
          <li>Naissance : {{ birthdate }}</li>
        </ul>
        </v-flex>
        <v-flex xs6>
          <p>Note du film : <span v-if="movie.ratings[0] != -1">{{ratingOfMovie}}</span><span v-else>Ce film n'a pas encore de note</span></p>

        <image-rating
          src="https://image.flaticon.com/icons/png/512/129/129393.png"
          v-model="rating"
        ></image-rating>
        <v-btn color="success" v-on:click="PopCornRate(movie.id)">Noter</v-btn>
        </v-flex>
        </v-layout>
        <p>
          <v-btn color="info" :to="{ name: 'edit', params: { id: movie.id } }">Modifier</v-btn>
          <v-btn color="error" v-on:click="$emit('remove')">Supprimer</v-btn>
        </p>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>

<script>
import { ImageRating } from "vue-rate-it";
export default {
  props: ["movie"],
  components: {
    ImageRating
  },
  data: function() {
    return {
      afficheDetail: false,
      rating: 3
    };
  },
  computed: {
    ratingOfMovie() { //Calcul la moyenne des notes d'un film'
      var cpt = 0;
      var total = 0;
      if (this.movie.ratings) {
        for (var i = 0; i < this.movie.ratings.length; i++) {
          total += this.movie.ratings[i];
          cpt++;
        }
      }
      return Math.round(total / cpt, 2);
    },
    miniresum() { // Coupe le résumé pour en afficher que le début dans la liste des films
      return this.movie.synopsys.slice(0, 31) + "...";
    },
    birthdate(){ //Formatte la date comme souhaité
      var dateFormat = require('dateformat');

      return dateFormat(this.movie.realisateur.birthdate, 'dd-mm-yyyy');
    },
    image(){ //Poiur afficher l'image d'un film ou l'image de base
      if(this.movie.affiche != null){
        return this.movie.affiche;
      }
      else {
        return "NO_IMG_600x600.png";
      }
    }
  },
  methods: {
    PopCornRate(id) { // gere le fait de noter les films
      this.$store
        .dispatch("APIRateMovie", { id: id, rating: this.rating })
        .then(() => {
          alert("Votre note à été ajoutée");
        });
    }
  }
};
</script>
