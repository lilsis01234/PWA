var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
/* GET home page. */
var axios = require('axios')

let mysql = require('mysql'); 
const { title } = require('process');


router.get('/', function(req,res) {               
  res.render('sign');
});

router.get('/login',function(req,res,next){
  res.render('login')
})

router.post('/signup',function(req,res,next){
  var nom = req.body.nom;
  var prenom = req.body.prenom;
  var mdp1 = req.body.mdp1;
  var mdp2 = req.body.mdp2;
  if (mdp1===mdp2){
    var cnx = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database:'express'
    });
    cnx.connect();
    cnx.query(
      `INSERT INTO user (nom , prenom,mdp) VALUES ('${nom}', '${prenom}','${mdp2}')`);
    cnx.commit();
    res.render('movies');
  }
  else{
    res.render('signup')
  }
})

router.get('/home',function(req,res,next){
  res.render('home')
})

router.post('/login',function(req,res,next){
  var nomreq = req.body.nom;
  var mdpreq = req.body.mdp;
  var cnx = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'express'
  });
  cnx.connect();
  var compte = cnx.query(
    `SELECT * FROM user WHERE nom = '${nomreq}' AND mdp = '${mdpreq}'`);
  cnx.commit();
    if(compte){
      res.redirect('/movies');
  }
  else{
    res.render('sign')
  }
})

router.get('/movies',(function(req,res,next){
  res.render('movies')
}));

router.post('/movies', function(req, res) {
  const apiKey = "35c2315d9ba90a7ad4f59d92e8aa7ae7";
  const searchTerm = req.query.searchTerm; // Assuming you are getting searchTerm from query params

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    .then(response => {
      const moviesData = response.data.results;
      res.render('movies',{ movies: moviesData });
    })
    .catch(error => {
      console.error("Erreur lors de la recherche :", error);
      res.render('movies',{ movies: [] }); // Render the movies template with an empty array on error
    });
});
module.exports = router;