import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showAlertAsync } from "./AlertsSlice";
const loadWishlist = () => {
  const wishlistString = localStorage.getItem("wishlist");
  return wishlistString ? JSON.parse(wishlistString) : [];
};

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (params, { dispatch, getState }) => {
    const { movie, mustShowAlert } = params;
    const state = getState();
    const isExist = state.wishlist.myWish.some((item) => item.id === movie.id);

    if (!isExist) {
      if (mustShowAlert) {
        dispatch(
          showAlertAsync({
            message: "Movie added to wishlist",
            type: "success",
          })
        );
      }
      return movie;
    } else {
      dispatch(
        showAlertAsync({
          message: "Movie already exists in wishlist",
          type: "danger",
        })
      );
    }
  }
);

function filterMoviesById(MoviesList, objIdsMovies) {
  return MoviesList.filter((mv) => !objIdsMovies[mv.id]);
}

function updateMovieById(MoviesList, objIdsMovies) {
  return MoviesList.map((mv) =>
    objIdsMovies[mv.id] ? { ...mv, watched: !mv.watched } : mv
  );
}

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (params, { dispatch }) => {
    const { moviesIds, mustShowAlert } = params;
    if (mustShowAlert) {
      dispatch(
        showAlertAsync({
          message: "Movie removed from wishlist",
          type: "danger",
        })
      );
    }
    return moviesIds;
  }
);

export const updateMovie = createAsyncThunk(
  "wishlist/updateMovieProp",
  async (movieIds, { dispatch }) => {
    dispatch(
      showAlertAsync({ message: "movie status was updated", type: "success" })
    );
    return movieIds;
  }
);

function getCurrentDate() {
  const currentDate = new Date();
  return currentDate
    .toLocaleDateString("en-GB")
    .replace(new RegExp("/", "g"), "-");
}

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    myWish: loadWishlist(),
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWishlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.myWish.push({
            ...action.payload,
            watched: false,
            dateAdd: getCurrentDate(),
          });
          localStorage.setItem("wishlist", JSON.stringify(state.myWish));
        }
      })
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.myWish = filterMoviesById(state.myWish, action.payload);
          localStorage.setItem("wishlist", JSON.stringify(state.myWish));
        }
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        if (action.payload !== undefined) {
          state.myWish = updateMovieById(state.myWish, action.payload);
          localStorage.setItem("wishlist", JSON.stringify(state.myWish));
        }
      });
  },
});

export default wishlistSlice.reducer;
