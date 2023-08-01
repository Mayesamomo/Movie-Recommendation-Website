const dotenv = require('dotenv');
dotenv.config();

const TMDB_API_URL = "https://api.themoviedb.org/3";
const OPENWEATHERMAP_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const TMDB_API_KEY = process.env.THE_MOVIE_DB;
const OPENWEATHERMAP_API_KEY = process.env.OPENWEATHERMAP_API_KEY;

async function fetchData(url) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error fetching data");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function getNowPlayingMovies() {
  try {
    const reqUrl = `${TMDB_API_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`;
    const nowPlayingMovies = await fetchMovies(reqUrl);

    if (!nowPlayingMovies || !Array.isArray(nowPlayingMovies)) {
      throw new Error('Invalid movie data format for now playing movies');
    }

    return nowPlayingMovies;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
}

async function getMovieDetails(movieId) {
  try {
    const response = await fetch(`${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error('Failed to fetch movie details.');
    }
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
}

async function getRecommendedMovies() {
  try {
    const reqUrl = `${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
    const response = await fetch(reqUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch recommended movies.');
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid movie data format for recommended movies');
    }

    return data.results;
  } catch (error) {
    console.error('Error fetching recommended movies:', error);
    throw error;
  }
}

async function searchMovies(query) {
  try {
    const encodedQuery = encodeURIComponent(query);
    const reqUrl = `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}`;

    const response = await fetch(reqUrl);

    if (!response.ok) {
      throw new Error('Error fetching movie data');
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid movie data format');
    }

    return data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}


async function getLocationByIP() {
  try {
    const response = await fetch('https://ipinfo.io/json');

    if (!response.ok) {
      throw new Error('Error fetching location data');
    }

    const data = await response.json();

    const location = {
      city: data.city || 'Unknown City',
      country: data.country || 'Unknown Country',
      latitude: data.loc ? parseFloat(data.loc.split(',')[0]) : null,
      longitude: data.loc ? parseFloat(data.loc.split(',')[1]) : null,
    };

    return location;
  } catch (error) {
    console.error('Error fetching location data:', error);
    throw error;
  }
}

async function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

async function getWeatherInfo(city, country) {
  try {
    // Make an API call to OpenWeatherMap to get weather information
    const encodedCity = encodeURIComponent(city);
    const encodedCountry = encodeURIComponent(country);
    const reqUrl = `${OPENWEATHERMAP_API_URL}?q=${encodedCity},${encodedCountry}&appid=${OPENWEATHERMAP_API_KEY}&units=metric`;
    const response = await fetch(reqUrl);

    if (!response.ok) {
      throw new Error('Error fetching weather data');
    }

    const data = await response.json();
    const weatherInfo = {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    };

    return weatherInfo;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

async function fetchMovies(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Error fetching movie data');
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      throw new Error('Invalid movie data format');
    }

    return data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}

async function getPopularMovies() {
  const reqUrl = `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
  return await fetchMovies(reqUrl);
}

async function getMoviesByLocation(location) {
  const reqUrl = `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&with_original_language=${location}`;
  return await fetchMovies(reqUrl);
}

module.exports = {
  getNowPlayingMovies,
  getMovieDetails,
  getRecommendedMovies,
  searchMovies,
  getLocationByIP,
  getWeatherInfo,
  getCurrentPosition,
  getPopularMovies,
  getMoviesByLocation,
};
