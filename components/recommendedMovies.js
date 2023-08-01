const { fetchRecommendedMovies, fetchWeatherData } = require('../utils');

async function getRecommendedMoviesComponent(req, res) {
  try {
    const { location, genre } = req.query;
    const movies = await fetchRecommendedMovies(location);
    const weatherData = await fetchWeatherData(location);
    res.render('recommended-movies', { location, genre, movies, weatherData });
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    res.status(500).send('Error fetching recommended movies');
  }
}

module.exports = { getRecommendedMoviesComponent };
