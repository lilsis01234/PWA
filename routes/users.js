const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/movies',(function(req,res,next){
  res.render('movies')
}));

router.get('/movies', function(req, res) {
  const apiKey = "35c2315d9ba90a7ad4f59d92e8aa7ae7";
  const searchTerm = req.query.searchTerm; // Assuming you are getting searchTerm from query params

  axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`)
    .then(response => {
      const moviesData = response.data.results;
      res.render('movies', { movies: moviesData });
    })
    .catch(error => {
      console.error("Erreur lors de la recherche :", error);
      res.render('movies', { movies: [] }); // Render the movies template with an empty array on error
    });
});

module.exports = router;


// router.post('/home', function(req, res, next) {
//   const apiKey = "35c2315d9ba90a7ad4f59d92e8aa7ae7";

//   searchButton.addEventListener("click", function () {
//     const searchTerm = req.body.searchTerm;

//     // Effectuer la recherche à l'API TMDb
//     axios.get(
//       `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         var moviesData = data.results;
//         if (moviesData && moviesData.length > 0) {
//           res.redirect('/movies', { movies: moviesData}); 
//       } else {
//           res.redirect('/movies', { movies: [] }); 
//       }
//       })

//       .catch((error) => console.error("Erreur lors de la recherche :", error));
//   });
// });

