// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies(){
    // the endpoint
    // TO DO
   let url = 'https://api.themoviedb.org/3/movie/popular?api_key=c764e2acc2a49613cd1b4eee4475b897&language=en-US';
    // the place on the page where we'll display the movies
    let popularMovies = document.getElementById("popular");
    let imgUrl = "https://image.tmdb.org/t/p/w400";


    // ajax time!
    // create the object
    // TO DO
    let xhr = new XMLHttpRequest();
    // attach event handlers
    // TO DO
    xhr.addEventListener("readystatechange", function(){
        if(this.readyState === this.DONE){
            console.log(this.response);
            let json = this.response;

        let html="";

    
        // This code can be used for the display of the featured movie
        // (it is a string template)
            html += `<section id="featured">
                <h3>${json.results[0].title}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>"${json.results[0].overview}"</p>
            </section>`


        // This code can be used for the display of the other popular movies (18 of them)
        // (it is a string template)
        for(let i = 1; i < 19; i++){
            html += `<section class="movie">
                <img src="${imgUrl}${json.results[i].poster_path}" alt="">
                <div>
                    <h3>${json.results[i].title}</h3>
                    <p>${json.results[i].overview}
                        <span class="vote">Vote Average: ${json.results[i].vote_average}</span>
                    </p>
                </div>
            </section>`
        }
    popularMovies.innerHTML = html;    
    
    }
});
    
    // set the response type
    // TO DO
    xhr.responseType = "json";
    // open the request
    // TO DO
    xhr.open("Get", url);
    // send the request
    // TO DO
    xhr.send();
}

// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie
function getBirthYearMovies(e){
    e.preventDefault();

    // Get the user's input/year value
    // TO DO
    let year = encodeURI(document.getElementById("userYear").value);
    // the place on the page where we'll add the movies
    let birthYearMovies = document.getElementById("birthYear");

    if(year < 1940 || year > 2026 || year == ""){
        birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2026</p>`;
    }else{
        // TO DO - Build the endpoint we need (this one has additional parameters)
        // TO DO
        let begUrl = "https://api.themoviedb.org/3/discover/movie?api_key=c764e2acc2a49613cd1b4eee4475b897&primary_release_year=";
        let endUrl = "&sort_by=revenue.desc&language=en-US&include_adult=false";
        let imgUrl = "https://image.tmdb.org/t/p/w400";

        // ajax time!
        // create the object
        // TO DO
        let xhr = new XMLHttpRequest();
        // attach event handlers
        // TO DO
        xhr.addEventListener("readystatechange", function(){
        if(this.readyState === this.DONE){
            console.log(this.response);
            let json = this.response;

            let html =""
            for (let i = 0; i < 12; i++){
                if(json.results[i].poster_path == null){
                    continue;
                }else{
                    html += `<section class="yrMovie">
                        <img src="${imgUrl}${json.results[i].poster_path }" alt="">
                        <h3>${json.results[i].title}</h3>
                    </section>`; 
                    }
                }
                birthYearMovies.innerHTML = html;
            }
        });
       
        
        // set the response type
        // TO DO
        xhr.responseType = "json";
        // open the request
        // TO DO
        xhr.open("Get", `${begUrl}${year}${endUrl}`);
        // attach the headers (optional)

        // send the request
        // TO DO
        xhr.send();
    }
}

window.addEventListener("load", function(){
    getPopularMovies();
    document.getElementById("yearBtn").addEventListener("click", getBirthYearMovies);
});
