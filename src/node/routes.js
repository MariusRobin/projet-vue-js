var express = require('express');
var apiRoutes = express.Router();
var multer = require('multer');
var path = require('path');
var crypto = require('crypto');

//Retourne tous les films
apiRoutes.route('/movies').get(function (req, res, next) {
    res.json(MOVIES);
});

//Note un film
apiRoutes.route('/movies/:id/rate').post(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Film inexistant' });
    } else {
        if(movie.ratings[0] == -1)
            movie.ratings[0] = req.body.rating;
        else
            movie.ratings.push(req.body.rating);

        res.status(204).send(null);
    }
});

//Supprime un film
apiRoutes.route('/movies/:id/delete').get(function (req, res, next) {
    var movieIndex = MOVIES.findIndex(movie => movie.id == req.params.id)

    if (movieIndex === -1) {
        res.status(404).send({ error: 'Film inexistant' });
    } else {
        MOVIES.splice(movieIndex, 1);

        res.status(204).send(null);
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/static/uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + path.extname(file.originalname));
        });
    }
});

//fonction pour l'upload des images
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb("Erreur: veuillez entrer un fichier de type : " + filetypes);
    }
});

//Ajoute un nouveau film
apiRoutes.route('/movies').post(upload.single('uneAffiche'), function (req, res) {
    var newMovie = JSON.parse(req.body.movie);
    newMovie.id = MOVIES[MOVIES.length - 1].id + 1;
    if (req.file !== undefined) {
        newMovie.affiche = `uploads/${req.file.filename}`;
    }

    MOVIES.push(newMovie);
    res.json(newMovie);
});

//Recupere un film existant
apiRoutes.route('/movies/:id').get(function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        res.json(movie);
    }
});

//Modifie un film existant
apiRoutes.route('/movies/:id').post(upload.single('uneAffiche'),function (req, res, next) {
    var movie = MOVIES.find(movie => movie.id == req.params.id)

    if (movie === null) {
        res.status(404).send({ error: 'Movie not found.' });
    } else {
        var theMovie = JSON.parse(req.body.movie);

        movie.title = `${theMovie.title}`;
        movie.year = parseInt(theMovie.year);
        movie.synopsis = `${theMovie.synopsis}`;
        movie.language = `${theMovie.language}`;
        movie.realisateur.name = `${theMovie.realisateur.name}`;
        movie.realisateur.nationality = `${theMovie.realisateur.nationality}`;
        movie.realisateur.birthdate = `${theMovie.realisateur.birthdate}`;
        movie.genre = `${theMovie.genre}`;
        //movie.poster = theMovie.poster;

        if (req.file !== undefined) {
            movie.affiche = `uploads/${req.file.filename}`;
        }

        res.json(movie);
    }
});

module.exports = apiRoutes;
