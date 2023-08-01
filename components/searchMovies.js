const { fetchMoviesBySearch } = require('../utils');

async function getMoviesSearchComponent(req, res) {
  try {
    const { location, movieName } = req.query;
    const movies = await fetchMoviesBySearch(location, movieName);
    res.render('movies-search', { location, movieName, movies });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).send('Error fetching movies');
  }
}

module.exports = { getMoviesSearchComponent };
