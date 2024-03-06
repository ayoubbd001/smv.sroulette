import { myAPi } from "./ApiKey";

const reviewMvAPi = `https://api.themoviedb.org/3/movie/{movie_id}/reviews?page=1&api_key=${myAPi}`;

export default reviewMvAPi;
