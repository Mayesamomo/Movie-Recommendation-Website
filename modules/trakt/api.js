
const TMDB_API_URL = "https://api.themoviedb.org/3";
const OPENWEATHERMAP_API_URL = "https://api.openweathermap.org/data/2.5/weather";
const TMDB_API_KEY = "YOUR_TMDB_API_KEY"; // Replace with your TMDb API key
const OPENWEATHERMAP_API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key

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

async function getTrendingMovies() {
  const reqUrl = `${TMDB_API_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`;
  return await fetchData(reqUrl);
}

async function getMovieDetails(movieId) {
  const reqUrl = `${TMDB_API_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`;
  return await fetchData(reqUrl);
}

async function getRecommendedMovies() {
  const reqUrl = `${TMDB_API_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`;
  return await fetchData(reqUrl);
}

async function searchMovies(query) {
  const encodedQuery = encodeURIComponent(query);
  const reqUrl = `${TMDB_API_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}`;
  return await fetchData(reqUrl);
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
    return data.results;
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}

// Function to fetch popular movies
async function getPopularMovies() {
  const reqUrl = `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}`;
  return await fetchMovies(reqUrl);
}

// Function to get movies by location
async function getMoviesByLocation(location) {
  const reqUrl = `${TMDB_API_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&with_original_language=${location}`;
  return await fetchMovies(reqUrl);
}

module.exports = {
  getTrendingMovies,
  getMovieDetails,
  getRecommendedMovies,
  searchMovies,
  getLocationByIP,
  getWeatherInfo,
  getCurrentPosition,
  getPopularMovies,
  getMoviesByLocation,
};
