
// TOGGLE SPINNER 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// FETCH BOOK SEARCH DATA
const searchBooks = async () => {
    const searchInput = document.getElementById('search-input');
    const searchText = searchInput.value;

    // reset search value
    searchInput.value = '';
    if (searchText === '') {
        document.getElementById('error-msg').innerText = 'Please type something to search';
        document.getElementById('book-search-results').textContent = '';
        document.getElementById('results-found').textContent = '';
        return;
    }
    document.getElementById('error-msg').textContent = '';
    document.getElementById('book-search-results').textContent = '';
    document.getElementById('results-found').innerText = '';

    toggleSpinner('block');

    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();

    displaySearchResults(data.docs);
    resultNumber(data.numFound);
}

// DISPLAY SEARCH RESULTS
const displaySearchResults = books => {
    const searchResults = document.getElementById('book-search-results');

    // Error Handling
    if (books.length === 0) {
        document.getElementById('error-msg').innerText = 'No books found by this name. Try searching by different keywords.';
        toggleSpinner('none');
        return;
    }
    searchResults.textContent = '';

    //check undefined(set no value) data
    const filterBooks = books.filter(info => info.cover_i !== undefined && info.author_name !== undefined && info.first_publish_year !== undefined && info.publisher !== undefined);



    // Array Loop & Creating Result Div //
    filterBooks.slice(0,21).forEach(filterbook => {
        console.log(filterbook);
        const bookCoverUrl = `https://covers.openlibrary.org/b/id/${filterbook.cover_i}-M.jpg`
        const div = document.createElement('div');
        div.innerHTML = `
                <div class="bg-gray-100 pt-5 rounded" style="height:500px">
                    <img class="mx-auto mb-5" src="${bookCoverUrl}" alt="Book Image">
                    <h2>Book Title: <span class="font-bold">${filterbook.title}</span></h2>
                    <h3>Author: ${filterbook.author_name[0]? filterbook.author_name[0]: 'Author Not Found'}</h3>
                    <h3>Publisher: ${filterbook.publisher[0]? filterbook.publisher[0]: 'Publisher Not Found'}</h3>
                    <h3>First Published: ${filterbook.first_publish_year? filterbook.first_publish_year: 'Year Not Found'}</h3>
                </div>
        
        `
        searchResults.appendChild(div);
    });
    toggleSpinner('none');

}

// DISPLAY NUMBER OF RESULTS FOUND

const resultNumber = totalFound => {
    const resultsFound = document.getElementById('results-found');
    if (totalFound !== 0) {
        resultsFound.innerHTML = `
        <h2 class="text-xl">Total books found: <span class="font-bold">${totalFound}</span>
        `; 
    }
    
}


