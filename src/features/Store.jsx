import { combineReducers, configureStore } from "@reduxjs/toolkit";
import RatedSlice from "./RatedSlice";
import WishListSlice from "./WishListSlice";
import AlertsSlice from "./AlertsSlice";
import UpCommingSlice from "./UpCommingSlice";
// import upComming from "./upComming";

const reducer = combineReducers({
  ratedMovies: RatedSlice,
  wishlist: WishListSlice,
  alert: AlertsSlice,
  upCommingMovies: UpCommingSlice,
});

const store = configureStore({ reducer });
export default store;
