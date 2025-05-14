const quoteList = document.getElementById('quoteList');
const filterInput = document.getElementById('filterInput');
const errorMessage = document.getElementById('errorMessage');

let allQuotes = [];


async function fetchQuotes() {
    try {
        const response = await fetch('https://dummyjson.com/quotes');
        if (!response.ok) throw new Error('Failed to fetch quotes');
        const data = await response.json();
        allQuotes = data.quotes;
        displayQuotes(allQuotes);
    } catch (error) {
        errorMessage.textContent = error.message;
    }
}

function displayQuotes(quotes) {
    quoteList.innerHTML = '';
    quotes.forEach(quote => {
        const li = document.createElement('li');
        li.textContent = quote.quote;
        quoteList.appendChild(li);
    });
}

filterInput.addEventListener('input', () => {
    const searchTerm = filterInput.value.toLowerCase();
    const filtered = allQuotes.filter(q =>
        q.quote.toLowerCase().includes(searchTerm)
    );
    displayQuotes(filtered);
});

fetchQuotes()