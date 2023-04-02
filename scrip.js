const getStreamavaildata = async (movieTitle) => {
  try {
    const response = await fetch(`https://streaming-availability.p.rapidapi.com/v2/search/title?title=${movieTitle}&country=us&show_type=movie&output_language=en`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
        "x-rapidapi-key": "37f3b9d804msh67df7d4a481ee16p18b4efjsne775178b3a36",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

//display movie title and ratting
const displayMovie = async (movieData) => {
  const displays = document.getElementById("overview");
  let movies = ``;

  for (let i = 0; i < movieData.result.length; i++) {
    const movTitle = movieData.result[i].title;
    const movRating = movieData.result[i].imdbRating;
    const overiew = movieData.result[i].overview;
    const streaming = movieData.result[i].streamingInfo.us;

    const img = movieData.result[i].backdropURLs.original;
    const years = movieData.result[i].year;
    let movie = `<div class="movie">
    <h2>${movTitle}</h2>
    <div class="card">
    <div class="image"><img src="${img}"></div>
    <div class="center">
    
    <p>Rating imdb : ${movRating}</p>
    <p>year        : ${years}</p>
    <p>overview     : ${overiew}</p>`;
    let providers = "";
    for (provider in streaming) {
      providers += `<li>${provider}</li>`;
    }
    movie += ` stream info : <ul>${providers} </ul>
    </div>
    </div>
    </div>`;
    movies += movie;
  }
  displays.innerHTML = movies;
};

//inisailisasi input
const searchMovie = async () => {
  const input = document.getElementById("movie-title").value;
  console.log(input);

  const movieData = await getStreamavaildata(input);
  displayMovie(movieData);
};
