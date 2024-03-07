const aboutUsLink = document.getElementById("aboutUsLink");
const contactUsLink = document.getElementById("contactUsLink");
const nowPlayingButton = document.getElementById("nowPlayingButton");
const topRatedButton = document.getElementById("topRatedButton");
const popularVideoButton = document.getElementById("videoButton");

//About Us
aboutUsLink.addEventListener('click',() =>{
    const aboutUsURL = "index2.html";
     //console.log(aboutUsURL);
    window.location.href = aboutUsURL;
});


//Contact Us
contactUsLink.addEventListener('click',() =>{
    const contactUsURL = "index3.html";
    window.location.href =  contactUsURL ;
});

//Now Playing
const nowPlayingURL = "https://api.themoviedb.org/3/movie/now_playing?api_key=f06eba9f85f8ec39b59e5c3422e18617&language=en-US&page=1";
nowPlayingButton.addEventListener('click',() =>{
       now_Playing();

});

async function now_Playing(){
    try{
        const response = await fetch(nowPlayingURL);
        const now_playingdata = await response.json();
        //console.log(now_playingdata);
        const  now_playingdataMovies = now_playingdata.results;

        const innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">` ;
        const html =  now_playingdataMovies.map (movie =>
            `<div class="card" style="width: 18rem;">
                <img src="${IMG_PATH + movie.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">${movie.vote_count}</p>
                    <p class ="card-text">${movie.release_date}</p>
                </div>
            </div>`).join();
        const outerhtml = `</div>`;
        movieResults.innerHTML = innerhtml + html + outerhtml;
    } catch(error) {
        console.log("error ", error);
    }
}

//top-Rated
const topRatedURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=f06eba9f85f8ec39b59e5c3422e18617&language=en-US&page=1";
topRatedButton.addEventListener('click',() =>{
    topRatedMovies();
});
async function topRatedMovies(){
    try{
    const response = await fetch(topRatedURL);
    const topRatedData = await response.json();
    //console.log(topRatedData);
    const topRatedMovies = topRatedData.results;

    let html = '';

        html += `<div class="row row-cols-1 row-cols-md-4 g-4">`;

        for(const movie of topRatedMovies){
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


    } catch(error) {
        console.log("error",error);
     }

}

//Popular videos
const videoURL = "https://api.themoviedb.org/3/movie/297762?api_key=f06eba9f85f8ec39b59e5c3422e18617&language=en-US";

popularVideoButton.addEventListener('click',() =>{
    popularVideos();
});
async function popularVideos(){
    try{
    const response = await fetch(videoURL);
    const popularVideoData = await response.json();
    console.log(popularVideoData);
    const movie = popularVideoData;
    //console.log(typeof popularVideoMovies);

    let html = '';

        html += `<div class="row row-cols-1 row-cols-md-4 g-4">`;

        //for(const movie of popularVideoMovies){
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
    //}

    html += `</div>`;

    movieResults.innerHTML = html;


    } catch(error) {
        console.log("error",error);
     }

}


