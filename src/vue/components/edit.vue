<template>
    <v-flex xs8 offset-sm2>
        <v-card>
            <v-card-text class="px-10">
                <p v-if="add">
                    Ajouter un film<br /></p>
                    <p v-else>Modifier un film </p>
                    <form enctype="multipart/form-data">
                    <v-text-field color="#5C6BC0" clearable v-model="movie.title" label="Titre" data-vv-name="titre" required></v-text-field>
                        <v-slider
                                v-model="movie.year"
                                color="blue"
                                label="Année"
                                min="1890"
                                max="2100"
                                thumb-label="always"
                        ></v-slider>
                        <label>Affiche du film </label><input type="file" name="affiche" id="affiche" accept=".png, .jpg, .jpeg" v-on:change="uploadTheFile($event)" />
                    <v-textarea color="#5C6BC0" clearable v-model="movie.synopsys" label="Synopsys" data-vv-name="synopsys" required></v-textarea>
                    <v-text-field color="#5C6BC0" clearable v-model="movie.language" label="Langue version originale" data-vv-name="langue" required></v-text-field>
                    <v-text-field color="#5C6BC0" clearable v-model="movie.genre" label="Genre" data-vv-name="genre" required></v-text-field>
                    <v-text-field color="#5C6BC0" clearable v-model="movie.realisateur.name" label="Nom et Prénom du réalisateur" data-vv-name="name" required></v-text-field>
                        <label>Date de naissance du réalisateur</label><datepicker placeholder="Select Date" v-model="movie.realisateur.birthdate"></datepicker>
                    <v-text-field color="#5C6BC0" clearable v-model="movie.realisateur.nationality" label="Nationnalité du réalisateur" data-vv-name="nationality" required></v-text-field>
                    <v-btn type="button" class="danger" v-on:click="$router.push({ name: 'home' })">Retour<v-icon dark right>remove_circle</v-icon></v-btn>
                        <v-btn type="submit" color="success" v-on:click="saveButton()">Sauvegarder<v-icon dark right>check_circle</v-icon></v-btn>
                    </form>
            </v-card-text>
        </v-card>
    </v-flex>
</template>
<script>
export default {
    data() {
        return {
            add: false,
            reader: new FileReader(),
            UneAffiche: {
                file: null
            }
        }
    },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },

    movie() {
        if(this.movies.find(movie => movie.id == this.id))//si c'est un edit
        {
            this.add = false;
            return this.movies.find(movie => movie.id == this.id);
        }
        else // si c'est un ajout
        {
            this.add = true;
            return {
                    id: undefined,
                    title: "",
                    synopsys : "",
                    year: 1890,
                    language: '',
                    realisateur: {
                        name: "",
                        nationality: "",
                        birthdate: ""
                    },
                    genre: '',
                    ratings: [-1],
                    affiche : null
            }
        }  
    }
  },
  methods: {
    saveButton() {
        if(this.add)//On crée le film car c'est un ajout
        {
            this.$store.dispatch('APIAddMovie', {movie : this.movie, uneAffiche : this.UneAffiche.file }).then(id => {
            this.$router.push({ name: 'home'})
        });
        }
        else // On update le film
        {
            this.$store.dispatch('APIUpdateMovie', {movie : this.movie, uneAffiche : this.UneAffiche.file }).then(() => {
                this.$router.push({ name: 'home' })
            });
        }
    },
      uploadTheFile(event) {  //fonction qui gère l'upload de l'image d'un film
          this.movie.affiche = null;

          this.UneAffiche.file = event.target.files[0];
          var self = this;
          /*this.reader.onload = function (e) {
              self.preview = e.target.result;
          };*/

          if (this.UneAffiche.file) {
              this.reader.readAsDataURL(this.UneAffiche.file);
          }
      },
  }
}
</script>

