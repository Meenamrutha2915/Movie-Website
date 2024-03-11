const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=f06eba9f85f8ec39b59e5c3422e18617&query=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMDZlYmE5Zjg1ZjhlYzM5YjU5ZTVjMzQyMmUxODYxNyIsInN1YiI6IjY1ZDQ0YjdjNDE0MjkxMDE3Y2EyNmM0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Z0LoWIoJJLbvgEBH9799_mHbWMsDD2VoVTsageaHU4'
    }
  };

// Event listener for search button click
   
 // Event listener for pressing Enter key in search input
$("#search-input").on('keypress', function(event){
    console.log('This is getting triggered');
    event.preventDefault();
        if (event.key === "Enter") {
            //event.preventDefault()
            searchMovies();
            event.preventDefault();
            return false;
        }
    return false;
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

$("#search").on('click', function(event){
    event.preventDefault();
    console.log("Hello");
   // searchMovies();
    return false;
});

function renderMovies(movies){
    let innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
    let html = "";
    $.each(movies,function(movie){
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
    $("#movieResults").html(innerhtml  + html + outerhtml);
}
  

