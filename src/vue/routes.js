import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './components/home.vue';
import EditMovie from './components/edit.vue';

Vue.use(VueRouter);

//defini les routes de l'application
const routes = [
    { path: '/', component: Home, name: 'home' },
    { path: '/movie/edit/:id', component: EditMovie, name: 'edit' },
    { path: '/movie/add/', component: EditMovie, name: 'add' }
];

export default new VueRouter({
    routes
});
