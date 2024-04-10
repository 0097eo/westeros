document.addEventListener('DOMContentLoaded', function() {
    let characters = []; // Store fetched characters globally

    async function fetchCharacters() {
        try {
            const response = await fetch("https://anapioficeandfire.com/api/characters");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            characters = await response.json(); // Store fetched characters
            displayCharacters(characters);
        } catch (error) {
            console.error("Failed to fetch characters:", error);
        }
    }

    function searchCharacter(name) {
        const filteredCharacters = characters.filter(character => {
            // Check if the character's name includes the search input
            const nameMatch = character.name.toLowerCase().includes(name.toLowerCase());
            
            // Check if any of the character's aliases include the search input
            const aliasesMatch = character.aliases && character.aliases.some(alias => alias.toLowerCase().includes(name.toLowerCase()));
            
            // Return true if either the name or any alias matches the search input
            return nameMatch || aliasesMatch;
        });
        displayCharacters(filteredCharacters);
        console.log(filteredCharacters);
    }
    
    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        const searchInput = document.getElementById('search-input').value;
        if (!isNaN(searchInput)) { // Check if input is a number (ID)
            fetchCharacterById(searchInput);
        } else { // Otherwise, treat it as a name
            searchCharacter(searchInput);
        }
    });
   
    document.getElementById('header-h1').addEventListener('click', function(){
        window.location.reload()
    })

    function displayCharacters(characters) {
        const characterList = document.getElementById('characters-list');
        characterList.innerHTML = ''; // Clear previous list items
        characters.forEach(character => {
            const listItem = document.createElement('li');
            listItem.textContent = `${character.aliases} (${character.gender})`;
            listItem.addEventListener('mouseover', function(){
                this.style.backgroundColor = 'red';
            });
            listItem.addEventListener('mouseout', function(){
                this.style.backgroundColor = '';
            });
            listItem.addEventListener('click', function(){
                fetchCharacterDetails(character.url)
            })
            characterList.appendChild(listItem);
        });
    }

    async function fetchBooks() {
        try {
            const response = await fetch("https://anapioficeandfire.com/api/books");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const books = await response.json();
            displayBooks(books);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    }

    function displayBooks(books) {
        const bookList = document.getElementById('books-list');
        bookList.innerHTML = ''; // Clear previous list items
        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.name} (${book.authors}) ${book.numberOfPages} pages`;
            listItem.addEventListener('mouseover', function(){
                this.style.backgroundColor = 'red';
            });
            listItem.addEventListener('mouseout', function(){
                this.style.backgroundColor = '';
            });
            listItem.addEventListener('click', function() {
                fetchBookDetails(book.url);
            });
            bookList.appendChild(listItem);
        });
    }

    async function fetchBookDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const bookDetails = await response.json();
            displayBookDetails(bookDetails);
        } catch (error) {
            console.error("Failed to fetch book details:", error);
        }
    }

    function displayBookDetails(bookDetails) {
        const detailsDiv = document.getElementById('books-section');
        if (detailsDiv) { // Check if the element exists
            detailsDiv.innerHTML = ''; // Clear previous book details
            detailsDiv.innerHTML = `
                <h2>${bookDetails.name}</h2>
                <p>Released: ${bookDetails.released}</p>
                <p>Authors: ${bookDetails.authors.join(', ')}</p>
                <p>Number of Pages: ${bookDetails.numberOfPages}</p>
                <p>Publisher: ${bookDetails.publisher}</p>
                <p>Country: ${bookDetails.country}</p>
                <p>Media Type: ${bookDetails.mediaType}</p>
                <p>ISBN: ${bookDetails.isbn}</p>
            `;
        } else {
            console.error('Element with ID "book-details" does not exist.');
        }
    }
    async function fetchCharacterDetails(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const characterDetails = await response.json();
            displayCharacterDetails(characterDetails);
        } catch (error) {
            console.error("Failed to fetch character details:", error);
        }
    }

    function displayCharacterDetails(characterDetails) {
        const detailsDiv = document.getElementById('books-section');
        if (detailsDiv) { // Check if the element exists
            detailsDiv.innerHTML = ''; // Clear previous character details
            detailsDiv.innerHTML = `
                <h2>${characterDetails.name}</h2>
                <p>Gender: ${characterDetails.gender}</p>
                <p>Culture: ${characterDetails.culture}</p>
                <p>Born: ${characterDetails.born}</p>
                <p>Died: ${characterDetails.died}</p>
                <p>Titles: ${characterDetails.titles.join(', ')}</p>
                <p>Aliases: ${characterDetails.aliases.join(', ')}</p>
            `;
        } else {
            console.error('Element with ID "character-details" does not exist.');
        }
    }
    async function fetchCharacterById(id) {
        try {
            const response = await fetch(`https://anapioficeandfire.com/api/characters/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const characterDetails = await response.json();
            displayCharacterDetails(characterDetails);
        } catch (error) {
            console.error("Failed to fetch character details:", error);
        }
    }
    
    fetchCharacters(); // Fetch characters on page load
    fetchBooks(); // Fetch books on page load
});
