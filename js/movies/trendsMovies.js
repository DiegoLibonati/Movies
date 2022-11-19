import { getResponse } from "../api/getResponse.js";
import { IMG_PATH } from "../api/apiConfig.js";
import { getGenreMovie } from "../api/getGenres.js";

const tendenciasListContainer = document.querySelector(
  ".tendencias_list_container"
);

const fragment = document.createDocumentFragment();

const trendsArray = await getResponse("popular", "1");
const fiveTrendsMovies = trendsArray["results"].slice(0, 5);

const createHtmlTrend = async (
  imageLink,
  title,
  genreId,
  releaseDate,
  index
) => {
  const genre = await getGenreMovie(genreId);
  const releaseYear = releaseDate.split("-")[0];
  return `
    <img
      src="${IMG_PATH + imageLink}"
      alt="${title}"
    />
    <div class="tendencias_list_container_movie_description">
      <h3>${title}</h3>
      <h4>${genre["name"]}</h4>
      <h5>${releaseYear}</h5>
    </div>

    <div class="top_circle">${index + 1}</div>
 `;
};

fiveTrendsMovies.forEach(async (trendMovie, index) => {
  const { poster_path, title, genre_ids, release_date } = trendMovie;
  const genreId = genre_ids[0];
  const div = document.createElement("div");
  div.setAttribute("class", "tendencias_list_container_movie");
  createHtmlTrend(poster_path, title, genreId, release_date, index).then(
    (res) => (div.innerHTML = res)
  );

  fragment.appendChild(div);
});

tendenciasListContainer.appendChild(fragment);
