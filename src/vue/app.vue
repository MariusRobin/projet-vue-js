<template>
<v-app>
    <v-card flat>
      <v-toolbar class="toolbar" color="primary" dark extended flat>
      </v-toolbar>
  
      <v-layout row pb-2>
        <v-flex xs8 offset-xs2>
          <v-card class="card--flex-toolbar">
            <v-toolbar card prominent>
                <router-link to="/" class="toolbar-title">{{message}}</router-link>
  
              <v-spacer></v-spacer>
              <v-btn color="success" :to="{ name: 'add'}">Ajouter
                <v-icon right dark>movie_creation</v-icon>
              </v-btn>
          
            </v-toolbar>
  
            <v-divider></v-divider>
  
            <v-content>
                <v-container grid-list-md>
                    <v-layout row wrap>
                        <router-view></router-view>
                    </v-layout>
                </v-container>
            </v-content>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      message: 'Une belle liste de film !',
      search: "",
    }
  },
  computed: {
      //Variable pour le fonctionnement de la fonction recherche
        movies_search: function() {
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        }
    }
}
</script>

<style>
.card--flex-toolbar {
  margin-top: -64px;
}
.toolbar {
  background-image: url(http://51.75.30.141/fond.jpg);
  background-size: cover;
  padding-bottom: 25%;
}
</style>
