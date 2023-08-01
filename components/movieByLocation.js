
// const { API_KEY,OPENWEATHERMAP_API_KEY } = process.env;

// async function getMoviesByLocation(location) {
//   try {
//     const movieByLocationEndpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${OPENWEATHERMAP_API_KEY}`;
//     const response = await fetch(movieByLocationEndpoint);
//     const data = await response.json();
//     if (data.length === 0) {
//       throw new Error('Location not found');
//     }
//     const countryCode = data[0].country;
//     const moviesEndpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&region=${countryCode}`;
//     const moviesResponse = await fetch(moviesEndpoint);
//     const moviesData = await moviesResponse.json();
//     return moviesData.results;
//   } catch (error) {
//     console.error('Error fetching movies by location:', error);
//     throw error;
//   }
// }

// module.exports = { getMoviesByLocation };
