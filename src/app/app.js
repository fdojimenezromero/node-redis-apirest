var express = require("express"),
  app = express(),
  http = require("http"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override");
  server = http.createServer(app),
  mongoose = require('mongoose');

//DB CONECTION
mongoose.connect('mongodb://127.0.0.1/tvshows');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//Import controller and model
var models     = require('./models/tvshow.model')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows.controller');

// API routes express
var tvshows = express.Router();

tvshows.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

tvshows.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

app.use('/api', tvshows);

//STAR SERVER
app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});