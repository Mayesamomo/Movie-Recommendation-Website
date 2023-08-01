document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResultsContainer');
  
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.trim();
  
      if (searchTerm === '') {
        searchResultsContainer.innerHTML = ''; 
        return;
      }
  
      fetch(`/search?searchTerm=${encodeURIComponent(searchTerm)}`)
        .then(response => response.json())
        .then(data => {
          const searchResults = data.results;
          let resultHtml = '';
  
          if (searchResults && searchResults.length > 0) {
            searchResults.forEach(movie => {
              resultHtml += `
                <div class="search-result">
                  <a href="/movie/${movie.id}">
                    <span class="search-result-title">${movie.title}</span>
                  </a>
                </div>
              `;
            });
          } else {
            resultHtml = '<p>No results found.</p>';
          }
  
          searchResultsContainer.innerHTML = resultHtml;
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
          searchResultsContainer.innerHTML = '<p>Error fetching search results.</p>';
        });
    });
  });
  