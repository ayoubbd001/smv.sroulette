import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./features/Store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
