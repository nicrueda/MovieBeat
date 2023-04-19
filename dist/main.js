// ALL THE ELEMENTS FOR THE DOM
const movieGrid = document.querySelector("#movieGrid");
// console.dir(movieGrid)
// CREAR NUEVA CARD
function createNewCard(imgURL, name, date, rating, genres) {
    // CREAR ELEMENTOS
    let mainCardDiv = document.createElement('div')
    let mainImgDiv = document.createElement('div')
    let movieImage = document.createElement('img')
    let ratingDiv = document.createElement('div')
    let ratingSpan = document.createElement('span')
    let ratingSpanDiv = document.createElement('div')
    let contentDiv = document.createElement('div')
    let movieTitle = document.createElement('h2')
    let infoMovie = document.createElement('ul')
    let movieDate = document.createElement('li')
    let movieGenres = document.createElement('li')
    // CREATE THE MARKUP
    movieGrid.append(mainCardDiv)
    mainCardDiv.append(mainImgDiv)
    mainImgDiv.append(ratingDiv)
    mainImgDiv.append(movieImage)
    ratingDiv.append(ratingSpan)
    ratingSpan.append(ratingSpanDiv)
    mainCardDiv.append(contentDiv)
    contentDiv.append(movieTitle)
    contentDiv.append(infoMovie)
    infoMovie.append(movieDate)
    infoMovie.append(movieGenres)
    // ADD TEXTS
    movieImage.src = imgURL;
    if (rating === null) {
         ratingSpanDiv.innerText = `Rating: No disponible`
    } else {
         ratingSpanDiv.innerText = `Rating: ${rating}`
    }
    movieTitle.innerText = name.toUpperCase();
    movieDate.innerText = `Fecha de estreno: ${date}`;
    movieGenres.innerText = `Género: ${genres[0]}`
    // ADD DESIGN
    mainCardDiv.classList.add("w-80", "h-auto", "rounded-lg")
    movieImage.classList.add("rounded-t-lg", "object-cover", "h-96", "w-full")
    ratingDiv.classList.add("w-full")
    ratingSpan.classList.add("flex", "relative", "top-12", "justify-end", "mr-2")
    contentDiv.classList.add("text-center", "bg-indigo-100", "rounded-b-lg", "pt-4", "pb-4")
    movieTitle.classList.add("text-lg", "font-bold")
    ratingSpanDiv.classList.add("bg-indigo-600", "px-6", "py-2", "text-indigo-100", "rounded-full")
}

function removeCurrentCards() {
    while (movieGrid.firstChild) {
    movieGrid.removeChild(movieGrid.lastChild);
  }
}

// FUNCIONALIDAD INPUT
const searchForm = document.querySelector('#searchForm');
searchForm.addEventListener('submit', async function searchMovie(e) {
    e.preventDefault();
    removeCurrentCards()
    // console.dir(searchForm)
    const searchTerm = searchForm.elements.query.value;
    // console.log(searchTerm)
    const movies = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const moviesArray = movies.data
    // console.log(moviesArray)
    for (let movie of moviesArray) {
        const movieTitle = movie.show.name;
        const movieImageURL = movie.show.image.original;
        const movieRating = movie.show.rating.average;
        const movieDate = movie.show.premiered
        const movieGenres = movie.show.genres
        createNewCard(movieImageURL, movieTitle, movieDate, movieRating, movieGenres)
        // console.log(movie.show)
    }
    searchForm.elements.query.value = "";
    
})

