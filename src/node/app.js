var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

const open = require('opn');

var port = 8080;

//déclaration du tableau global des films de base
global.MOVIES = [
    {
        id: 1,
        title: "L'étrange noël de M. Jack",
        year: 1994,
        synopsys: "Jack Skellington, un épouvantail squelettique surnommé « le Roi des citrouilles » (Pumpkin King en version originale), vit dans la ville d'Halloween. En tant que maître de l'épouvante, Jack occupe ses journées à préparer la prochaine fête d'Halloween.",
        language: 'Anglais',
        realisateur: {
            name: "Henry Selick",
            nationality: "Américain",
            birthdate: "1952-11-30"
        },
        genre: 'Film de noël',
        ratings: [1, 4, 2],
        affiche : null
    },
    {
        id: 2,
        title: "Camping 2",
        synopsys : "Une bien belle semaine au camping des flos bleu au pied de la dune du pila qui est une bien belle dune",
        year: 2010,
        language: 'Français',
        realisateur: {
            name: "Fabien Onteniente",
            nationality: "Français",
            birthdate: "1958-04-27"
        },
        genre: 'Comédie',
        ratings: [5, 5, 5, 5],
        affiche : null
    },
    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        language: 'Anglais',
        synopsys: "Alors que la Terre se meurt, une équipe d'astronautes franchit un trou de ver apparu près de Saturne conduisant à une autre galaxie, cela dans le but d'explorer un nouveau système stellaire et l'espoir de trouver une nouvelle planète habitable par l'humanité afin de la sauver.",
        realisateur: {
            name: "Christopher Nolan",
            nationality: "Britannique",
            birthdate: "1970-07-30"
        },
        genre: 'Science-fiction',
        ratings: [5, 3],
        affiche : null
    }
];

var app = express();

app.use(express.static(path.resolve('src/static')));
app.use(express.static(path.resolve('src/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log(`App listening on port ${port}...`);

var apiRoutes = require('./routes.js');
app.use('/api', apiRoutes);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:' + port);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
})

app.get('/', function (req, res, next) {
    res.sendFile(path.resolve('src/dist/index.html'));
});

