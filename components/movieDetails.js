const { getMovieDetails, getWeatherData } = require('../utils');

async function getMovieDetailsComponent(req, res) {
  try {
    const { movieId } = req.params;
    const { locationData, weatherData } = await getWeatherData('Enter the location of the user here'); // Replace 'Enter the location of the user here' with the actual location
    const movieDetails = await getMovieDetails(movieId);

    res.render('movie-details', { movieDetails, locationData, weatherData });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).send('Error fetching movie details');
  }
}

module.exports = { getMovieDetailsComponent };
