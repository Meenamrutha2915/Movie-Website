const signinForm  = document.querySelector(".signin-form");
const signinButton = document.getElementById("loginBtn");
const signUpFormDiv = document.querySelector(".signup-form");
const signupForm = document.getElementById("signupForm");
const signupLink = document.getElementById("registerBtn");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search");
const loginButton = document.getElementById("login");
const signUpFormButton = document.getElementById("signup-form-button");
const trendingMoviesLink = document.querySelector(".trending-movies");
const TVShowsLink = document.querySelector(".tv-Shows");
const upcomingMoviesLink = document.querySelector(".upcoming-movies");
const movieResults = document.getElementById("movie-results");

const popularMoviesURL = "https://api.themoviedb.org/3/movie/popular?api_key=f06eba9f85f8ec39b59e5c3422e18617";
document.addEventListener('DOMContentLoaded' ,() =>{
    popularMovies();
});

async function popularMovies(){
    try{
        const response = await fetch(popularMoviesURL);
        const popularMoviesdata = await response.json();
        //console.log(now_playingdata);
        const  popularMoviesPlay = popularMoviesdata.results;

        const innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">` ;
        const html =  popularMoviesPlay.map (movie =>
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

//sign-in button
signinButton.addEventListener('click',() =>{
    //const signinURL = "index1.html";
    //window.location.href = signinURL;
    signinForm.classList.remove('hide');
});

signupLink.addEventListener('click',() =>{
    signUpFormDiv.classList.remove('hide');
    signinForm.classList.add('hide');
  
});

loginButton.addEventListener('click',() =>{
    signinForm.classList.remove('hide');
    signupForm.classList.add('hide');
});


//signin form
signinForm.addEventListener('submit', async(event)=>{
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;

    if (!isValidEmail(email)) {
        return;
    }

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email,password);
        const user = userCredential.user;
        localStorage.setItem('userDetails', JSON.stringify(userCredential));       
    } catch (error){
        alert("Invalid email or password");
        console.error(error);
    }

});

//function to validate email format
function isValidEmail(email){
    // Regular expression for email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//signUp form
signUpFormButton.addEventListener('click', async(event)=>{
    
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("regemail").value;
    const password = document.getElementById("regpassword").value;
    const confirmPassword = document.getElementById("confirmpsw").value;

    if(!username||!email||!password||!confirmPassword){
        return;
    }

    if (password !== confirmPassword){
        alert("wrong password");
    }

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email,password);
        const user = userCredential.user;
        alert('Registration Sucessful');
        document.getElementById('signupForm').reset();

    } catch (error) {
        console.error(error);
        alert('Registration Failed');
    }
});

const key = "f06eba9f85f8ec39b59e5c3422e18617";
const apiURL = "https://api.themoviedb.org/3/search/movie?api_key=f06eba9f85f8ec39b59e5c3422e18617&query=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

searchButton.addEventListener('click',() =>{
     searchMovies()
});

searchInput.addEventListener("keypress", async function(event){
    if (event.key === "Enter") {
        event.preventDefault()
        searchMovies();
    }
});
    
async function searchMovies() {
    try {
        const response = await fetch(apiURL + searchInput.value);
        const moviesdata = await response.json();
       
        const movies = moviesdata.results;
        
        const innerhtml = `<div class="row row-cols-1 row-cols-md-3 g-4">`;
        const html = movies.map(movie =>
            `<div class="card" style="width: 18rem;">
                <img src="${IMG_PATH + movie.poster_path}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${movie.title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <p class="card-text">${movie.vote_count}</p>
                    <p class ="card-text">${movie.release_date}</p>
                </div>
            </div>`).join();
            
            console.log( 'Movies data :' , html);    
        const outerhtml = `</div>`;
        movieResults.innerHTML = innerhtml + html + outerhtml;

    } catch(error) {
        console.log("error ", error);
    }
}
