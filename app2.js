//trending Movies
const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/day?api_key=f06eba9f85f8ec39b59e5c3422e18617"; 
console.log('trendingmovieresults',movieResults);
trendingMoviesLink.addEventListener('click',() =>{
    trendingMovies();
});

async function trendingMovies(){
    try {
        const response = await fetch(trendingMoviesUrl);
        const trendingmoviesdata = await response.json();
        console.log( 'trendingMovies data :' ,trendingmoviesdata);
        const trendingmovies = trendingmoviesdata.results;

        const filterMovies = trendingmovies.filter(movie =>{
            //filter condition
           return movie.vote_count > 1000;
        });
        const innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        const html = filterMovies.map(movie =>
           `<div class="card" style="width: 18rem;">
                <img src="${IMG_PATH + movie.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">${movie.vote_count}</p>
                    <p class ="card-text">${movie.release_date}</p>
                    <p class ="card-text">${movie.popularity}</p>
               </div>
            </div>`
           ).join();
        const outerhtml = `</div>`;
        console.log(html);
        movieResults.innerHTML = innerhtml + html + outerhtml;
    } catch(error) {
        console.log("error ", error);
    }
  }

//TV Shows
const TVShowsUrl = "https://api.themoviedb.org/3/tv/popular?api_key=f06eba9f85f8ec39b59e5c3422e18617";
//console.log("popularTVShowsResults",popularTVShowsResults);

TVShowsLink.addEventListener('click',() =>{
    popularTVShows();
})

async function popularTVShows() {
    try {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlYmE5Zjg1ZjhlYzM5YjU5ZTVjMzQyMmUxODYxNyIsInN1YiI6IjY1ZDQ0YjdjNDE0MjkxMDE3Y2EyNmM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z0LoWIoJJLbvgEBH9799_mHbWMsDD2VoVTsageaHU4'
            }
        };
    
        const response = await fetch(TVShowsUrl,options);
        const tvshowsdata = await response.json();
        console.log("tvshowsdata",tvshowsdata);
        const tvShows = tvshowsdata.results;
        
        const innerhtml = `<div class="row row-cols-1 row-cols-md-4 g-4">`;
        let  html = tvShows.reduce((accumulator,show) =>{
            const tvShowhtml =  
                            `<div class="col">
                                <div class="card">
                                <img src="${IMG_PATH + show.poster_path}"class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${show.title}</h5>
                                    <p class="card-text">${show.overview}</p>
                                    <p class="card-text">${show.vote_count}</p>
                                    <p class ="card-text">${show.release_date}</p>
                                    <p class ="card-text">${show.popularity}</p>
                                </div>
                                </div>
                            </div>`
                        return accumulator + tvShowhtml;
              }, '');
        const outerhtml = `</div>`
        
                   movieResults.innerHTML = innerhtml + html + outerhtml;
        }
    
    catch (error) {
        console.log("error ", error);
    }
}


//upcoming  movies
const upcomingMoviesUrl = "https://api.themoviedb.org/3/movie/upcoming?api_key=f06eba9f85f8ec39b59e5c3422e18617";
//console.log("upcomingMovies",UpcomingMovieResults)
upcomingMoviesLink.addEventListener('click',() =>{
    upcomingMovies();
});

async function  upcomingMovies() {

    try {

        const options = {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlYmE5Zjg1ZjhlYzM5YjU5ZTVjMzQyMmUxODYxNyIsInN1YiI6IjY1ZDQ0YjdjNDE0MjkxMDE3Y2EyNmM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z0LoWIoJJLbvgEBH9799_mHbWMsDD2VoVTsageaHU4'
            }
        };

        const response = await fetch(upcomingMoviesUrl, options);
        const upcomingMoviesdata = await response.json();
        console.log(upcomingMoviesdata);
        const upcomingMoviesfinal = upcomingMoviesdata.results;

        let html = '';

        html += `<div class="row row-cols-1 row-cols-md-4 g-4">`;

        for(const movie of upcomingMoviesfinal){
            html += 
             `<div class="col">
                <div class="card">
                <img src="${IMG_PATH + movie.poster_path}"class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">${movie.vote_count}</p>
                    <p class ="card-text">${movie.release_date}</p>
                    <p class ="card-text">${movie.popularity}</p>
                </div>
                </div>
            </div>`
    }

    html += `</div>`;

        movieResults.innerHTML = html;

    } catch (error) {
        console.log("error ", error);
    }

}



//Comedy Movies
const comedyMoviesLink = document.querySelector(".comedy-movies");
const comedyUrl = "https://api.themoviedb.org/3/trending/movie/day?api_key=f06eba9f85f8ec39b59e5c3422e18617";

comedyMoviesLink.addEventListener('click',() =>{
    comedyMoviesSearch();
})
async function comedyMoviesSearch(){
    const genreId = 35;
    const response = await fetch(comedyUrl);
    const moviesdata = await response.json();
    console.log( 'Movies data :' ,moviesdata);
    const movies = moviesdata.results;
    console.log("Movies:",movies);

    const comedyMovies = [];
    for(const movie of movies) {
        const genreIds = movie.genre_ids;

        if (genreIds.includes(genreId)) {
            comedyMovies.push(movie);
        }
    }

    let html = '';
    html +=  `<div class="row row-cols-1 row-cols-md-3 g-4">`;

    for (const movie of comedyMovies) {
        html += 
        `<div class="card" style="width: 18rem;">
            <img src="${IMG_PATH + movie.poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.overview}</p>
                <p class="card-text">${movie.vote_count}</p>
                <p class ="card-text">${movie.release_date}</p>
            </div>
        </div>`;
    }
    
    html += `</div>`;
    movieResults.innerHTML = html;

}
