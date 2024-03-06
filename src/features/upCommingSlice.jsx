import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { myAPi } from "../Apis/ApiKey";

export const getUpCommingMovies = createAsyncThunk(
  "upCommingMovies/upComming",
  async (page) => {
    const currentPage = page ? page : 1;
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?include_adult=false&include_video=true&language=en-US&page=${currentPage}&sort_by=vote_count.desc&api_key=${myAPi}`,
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

const UpCommingMoviesSlice = createSlice({
  name: "upCommingMovies",
  initialState: {
    loading: false,
    upCommingmoviesList: [],
    total_pages: 1,
    error: "",
  },

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUpCommingMovies.fulfilled, (state, action) => {
      state.upCommingmoviesList = action.payload.result;
      state.total_pages = action.payload.totalPages;
      state.loading = false;
    });

    builder.addCase(getUpCommingMovies.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(getUpCommingMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = "failed to fetch movies from apis";
    });
  },
});

export default UpCommingMoviesSlice.reducer;
