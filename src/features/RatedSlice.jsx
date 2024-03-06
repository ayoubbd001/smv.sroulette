import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAPi } from "../Apis/ApiKey";

export const getRatedMovies = createAsyncThunk(
  "ratedMovies/reated",
  async (page) => {
    const currentPage = page ? page : 1;
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?include_adult=false&include_video=true&language=en-US&page=${currentPage}&sort_by=vote_count.desc&api_key=${myAPi}`,
      {
        headers: {
          "Cache-Control": "max-age=3600",
        },
      }
    );
    return {
      result: res.data.results,
      totalPages: res.data.total_pages,
    };
  }
);

const RatedMoviesSlice = createSlice({
  name: "ratedMovies",
  initialState: {
    loading: false,
    ratedmoviesList: [],
    total_pages: 1,
    error: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatedMovies.fulfilled, (state, action) => {
      state.ratedmoviesList = action.payload.result;
      state.total_pages = action.payload.totalPages;
      state.loading = false;
    });

    builder.addCase(getRatedMovies.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getRatedMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = "failed to fetch movies from apis";
    });
  },
});

export default RatedMoviesSlice.reducer;
