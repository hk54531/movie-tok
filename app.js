const express = require("express");

const bodyParser = require("body-parser");

const https = require("https");

const app = express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.listen(3000,()=>console.log("server started running on port 3000"));

app.get("/",(req,res)=>{

  res.render("homepage" , {route:'/'})

});

app.post("/",(req,res)=>{

  let movie = req.body.movieName;

  let url = "https://www.omdbapi.com/?t="+movie+"&apikey=298b9440";

  let result = "";

  https.get(url, (response) => {

    response.on("data",(chunk)=>{

            result+=chunk;
});

    response.on("end",(err)=>{
      try {

              let movieData  =  JSON.parse(result);

              let response = movieData.Response;

              let title = movieData.Title;

              let year = movieData.Year;

              let rated = movieData.Rated;

              let released = movieData.Released;

              let runtime = movieData.Runtime;

              let genre = movieData.Genre;

              let director = movieData.Director;

              let writer = movieData.Writer;

              let actors = movieData.Actors;

              let plot = movieData.Plot;

              let language = movieData.Language;

              let country = movieData.Country;

              let awards = movieData.Awards;

              let poster = movieData.Poster;

              let rating = movieData.imdbRating;

              let imdbRating = movieData.imdbID;

              if (response === "False") {
                res.redirect("/error")
              } else {
                res.render("moviesearch", { titlee : title, yearr: year, ratedd: rated, releasedd:released, runtimee:runtime, genree:genre, directorr:director, writerr:writer, actorss:actors, plott:plot, languagee:language, countryy:country, awardss:awards, posterr: poster,  ratingg:rating, ratinggg:imdbRating });
              }



      } catch (e) {
    console.error(e);
      }
    });
});
});


// errorpage
app.get("/error",(req,res)=>{

res.render("error" , {route: "/error"});


})
app.post("/error",(req,res)=>{

  res.redirect("/")

});


//homepage
app.get("/homepage",(req,res)=>{
res.render("homepage" ,{route:"/"});
})
app.post("/homepage",(req,res)=>{
    res.redirect("/");
});
