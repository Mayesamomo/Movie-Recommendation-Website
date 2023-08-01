const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const tmdb = require("./modules/tmdb/api");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// Error handling middleware
app.use((error, request, response, next) => {
  console.error(error);
  response.status(500).render("error", { errorMessage: "An error occurred" });
});

// Page Routes

app.get('/', async (request, response) => {
  try {
    const nowPlayingMovies = await tmdb.getNowPlayingMovies();
// console.log(nowPlayingMovies)
    const itemsPerPage = 6;
    const page = parseInt(request.query.page) || 1;
    const startIdx = (page - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const totalItems = nowPlayingMovies.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const currentPage = page > totalPages ? totalPages : page;

    const moviesToDisplay = nowPlayingMovies.slice(startIdx, endIdx);

    response.render('index', {
      title: 'Movies',
      movieList: moviesToDisplay,
      totalPages: totalPages,
      currentPage: currentPage,
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    response.render('error', { errorMessage: 'An error occurred' });
  }
});

app.get('/movie/:id', async (request, response) => {
  try {
    const movieId = request.params.id;
    const movieDetails = await tmdb.getMovieDetails(movieId);

    // Get user's location
    const userLocation = await tmdb.getLocationByIP();

    // Get weather information for user's location
    const weatherInfo = await tmdb.getWeatherInfo(userLocation.city, userLocation.country);

    let weatherAdvice = '';
    if (weatherInfo.description.includes('rain')) {
      weatherAdvice = 'Bring an umbrella or wear a raincoat.';
    } else if (weatherInfo.description.includes('snow')) {
      weatherAdvice = 'Wear a heavy snow jacket.';
    } else if (weatherInfo.description.includes('thunderstorm') || weatherInfo.description.includes('hurricane')) {
      weatherAdvice = 'The weather is too dangerous, stay indoors.';
    } else {
      weatherAdvice = 'Enjoy the movie!';
    }

    response.render('movieDetails', {
      title: 'Movie Details',
      movieDetails: movieDetails,
      weatherInfo: weatherInfo,
      weatherAdvice: weatherAdvice,
    });
  } catch (error) {
    console.error('Error fetching movie details:', error);
    response.status(500).render('error', { errorMessage: 'Error fetching movie details' });
  }
});

app.get('/recommended', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 6; // Number of movies to display per page

    // Fetch recommended movies
    const recommendedMovies = await tmdb.getRecommendedMovies();
    console.log(recommendedMovies)
    const totalMovies = recommendedMovies.length;
    const totalPages = Math.ceil(totalMovies / pageSize);
    const currentPage = Math.min(Math.max(1, page), totalPages); 

    // Calculate start and end index for the current page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalMovies);

    // Get movies for the current page
    const moviesForCurrentPage = recommendedMovies.slice(startIndex, endIndex);
console.log(moviesForCurrentPage)
    res.render('recommended', {
      title: 'Recommended Movies',
      movieList: moviesForCurrentPage,
      totalPages,
      currentPage,
    });
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    res.status(500).render('error', { errorMessage: 'Error fetching recommended movies' });
  }
});

app.get('/search', async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const searchResults = await tmdb.searchMovies(searchTerm);
    res.json({ results: searchResults });
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Error fetching search results' });
  }
});

// Set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
