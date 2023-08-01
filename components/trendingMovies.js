const { fetchTrendingMovies, fetchWeatherData } = require('../utils');

async function getTrendingMoviesComponent(req, res) {
  try {
    const { location } = req.query;
    const movies = await fetchTrendingMovies(location);
    const weatherData = await fetchWeatherData(location);
    res.render('trending-movies', { location, movies, weatherData });
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    res.status(500).send('Error fetching trending movies');
  }
}

module.exports = { getTrendingMoviesComponent };
