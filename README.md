Movie Recommendation Website
==========================================

The Movie Recommendation Website is a web application that allows users to discover trending movies and receive personalized movie recommendations based on their location. The website integrates two APIs, The Movie Database (TMDB) API and the Geolocation API, to provide a seamless movie browsing experience.

Functionalities
---------------

1.  **Trending Movies**: The website displays a list of currently trending movies, showcasing popular movies among users.

2.  **Personalized Recommendations**: Users can enter their location to receive movie recommendations tailored to their region. The recommendations are based on genre preferences.

3.  **Movie Details**: Each movie displayed on the website includes details such as title, release date, category, and rating.

4.  **Movie Trailer**: If available, a mini player is provided to play the movie trailer for an enhanced browsing experience.

APIs Used
---------

1.  **The Movie Database (TMDB) API**: The TMDB API provides access to a vast collection of movie data, including information about movies, genres, and trailers. The website utilizes the following endpoints:

    -   Trending Movies: <https://api.themoviedb.org/3/trending/movie/week>
    -   Discover Movies: <https://api.themoviedb.org/3/discover/movie>

    To use the TMDB API, you need to sign up for an API key, which should be placed in the API calls for authentication.

2.  **Geolocation API**: The Geolocation API is used to retrieve the user's location information, which is used to provide personalized movie recommendations based on the region.

Technologies Used
-----------------

The Movie Recommendation Website is built using the following technologies:

-   **Node.js**: A JavaScript runtime environment used for server-side development.
-   **Express**: A popular web framework for Node.js used to build the server and handle routing.
-   **Pug**: A template engine for Node.js that provides an elegant syntax for writing HTML templates.
-   **Fetch**: HTTP client used to make API requests from the server.

Usage
-----

To use the Movie Recommendation Website, follow these steps:

1.  Clone the project repository:

    bash

13. `git clone <repository-url>
    cd movie-recommendation-website`

14. Install the project dependencies:

15. `npm install`

16. Obtain an API key from The Movie Database (TMDB) API by signing up on their website <https://www.themoviedb.org>.

17. Update the `index.js` file with your TMDB API key:

    javascript

18. `const TMDB_API_KEY = 'YOUR_TMDB_API_KEY';`

19. Start the server:

    sql

20. `npm start`

21. Access the Movie Recommendation Website in your web browser at <http://localhost:3000>.

22. On the homepage, you can see the list of trending movies. To get personalized recommendations, enter your location in the provided input field and click the "Get Recommendations" button.

23. The website will display recommended movies based on your location, including their details like title, release date, category, and rating. If available, you can also play the movie trailer using the mini player.