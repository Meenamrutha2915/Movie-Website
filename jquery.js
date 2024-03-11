//search Movies
const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=f06eba9f85f8ec39b59e5c3422e18617&query=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlYmE5Zjg1ZjhlYzM5YjU5ZTVjMzQyMmUxODYxNyIsInN1YiI6IjY1ZDQ0YjdjNDE0MjkxMDE3Y2EyNmM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z0LoWIoJJLbvgEBH9799_mHbWMsDD2VoVTsageaHU4'
    }
  };

  //display on the web page as soon as loaded
const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular?api_key=f06eba9f85f8ec39b59e5c3422e18617";
$(document).ready(function(){
    console.log('page loaded');
    popularMovies();
});
async function popularMovies(){
    try{
        const response = await fetch(popularMoviesURL);
        const popularMoviesdata = await response.json();
        //console.log(now_playingdata);
        const  popularMoviesPlay = popularMoviesdata.results;

        let innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        let html = "";
        $.each (popularMoviesPlay, function(index,movie){
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
    });
    let outerhtml = `</div>`;
    $("#movie-results").html(innerhtml  + html + outerhtml);
    } catch(error) {
        console.log("error ", error);
    }
}
    //search button
    // Event listener for pressing Enter key in search input
    $("#search-input").on('keypress', function(event){
        console.log('This is getting triggered');
        
            if (event.key === "Enter") {
                //event.preventDefault()
                searchMovies();
                event.preventDefault();
            
            }
    });
   
    // Event listener for search button click
    $("#search-movies").on('click', function(event){
        console.log("Hello");
        searchMovies();
    
    });
    


function searchMovies(){
    const searchInputValue = $("#search-input").val();
    console.log('Search input ', searchInputValue);
    //fetch movies data from the api
    $.ajax({
        url:apiURL +  searchInputValue,
        type :"GET" ,
        headers : options.headers,
        success :function(response){
                        // Call the renderMovies function to render the movies
                    renderMovies(response.results);
                    console.log(response);
            },
            error : function(err){
                console.error(err);
            }
    });
        
}


function renderMovies(movies){
    console.log("rendering movies ");
    let innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
    let html = "";
    $.each(movies,function(index,movie){
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
    });
    let outerhtml = `</div>`;
    $("#movie-results").html(innerhtml  + html + outerhtml);
}
  
//trending movies
const trendingMoviesUrl = "https://api.themoviedb.org/3/trending/movie/day?api_key=f06eba9f85f8ec39b59e5c3422e18617"; 
$(".trending-movies").on('click',function(event){
    console.log("trendingMovies");
    trendingMovies();
});

async function trendingMovies(){
    try{
        const response = await fetch(trendingMoviesUrl);
        const trendingmoviesdata = await response.json();
        console.log('trendingMovies data:', trendingmoviesdata);
        const trendingmovies = trendingmoviesdata.results;
        let innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        let html = "";
        $.each(trendingmovies,function(index,movie){
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
        });
        const outerhtml = `</div>`;
        $("#movie-results").html(innerhtml  + html + outerhtml);
    } catch(error) {
        console.log("error ", error);
       };
}

//TVShows
const TVShowsUrl = "https://api.themoviedb.org/3/tv/popular?api_key=f06eba9f85f8ec39b59e5c3422e18617";
$(".tv-Shows").on('click',function(event){
    popularTVShows();
});
async function popularTVShows(){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlYmE5Zjg1ZjhlYzM5YjU5ZTVjMzQyMmUxODYxNyIsInN1YiI6IjY1ZDQ0YjdjNDE0MjkxMDE3Y2EyNmM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z0LoWIoJJLbvgEBH9799_mHbWMsDD2VoVTsageaHU4'
        }
    };
    try{
        const response = await fetch(TVShowsUrl,options);
        const tvshowsdata = await response.json();
        console.log("tvshowsdata",tvshowsdata);
        const tvShows = tvshowsdata.results;
        let innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        let html = "";
        $.each(tvShows,function(index,show){
            html += 
            `<div class="card" style="width: 18rem;">
               <img src="${IMG_PATH + show.poster_path}" class="card-img-top" alt="...">
               <div class="card-body">
                    <h5 class="card-title">${show.title}</h5>
                    <p class="card-text">${show.overview}</p>
                    <p class="card-text">${show.vote_count}</p>
                    <p class ="card-text">${show.release_date}</p>
              </div>
            </div>`;
        });
        const outerhtml = `</div>`;
        $("#movie-results").html(innerhtml  + html + outerhtml);

    }catch(error) {
        console.log("error ", error);
       };
}


            
          
    