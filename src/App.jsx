import Alert from "./components/Alert";
import Header from "./components/Header";
import Intro from "./components/Intro";
import NavBar from "./components/NavBar";
import NotFoundPg from "./components/NotFoundPg";
import Search from "./components/SerachSection/Search";
import Wishmovies from "./components/WishSection/Wishmovies";
import Home from "./components/homePage/Home";
import MovieDetails from "./components/movieDetails/MovieDetails";
import Ratedmovies from "./components/ratedSection/Ratedmovies";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpCmMvs from "./components/upComming/UpCmMvs";

function App() {
  return (
    <>
      {/* <Intro /> */}
      <Router>
        <Header />
        <div id="main">
          <NavBar />
          <div className="pages-container">
            <div id="moviesApp">
              <Alert />
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/rated" element={<Ratedmovies />} />
                <Route path="/upcomming" element={<UpCmMvs />}></Route>
                <Route path="/wishList" element={<Wishmovies />} />
                <Route path="/search" element={<Search />} />
                <Route path="/movie/:id" element={<MovieDetails />} />
                <Route path="/e-404" element={<NotFoundPg />} />
                <Route path="*" element={<NotFoundPg />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
