import { NavLink } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { PiHeartHalfFill } from "react-icons/pi";
import { GoStarFill } from "react-icons/go";
import { IoHomeSharp } from "react-icons/io5";
import { FaArrowUpRightDots } from "react-icons/fa6";

export default function NavBar() {
  return (
    <aside
      id="nav-bar"
      className="d-flex justify-content-center align-items-center"
    >
      <div className="nav p-2" style={{ position: "fixed" }}>
        <div className="nav-bar">
          <ul
            className="nav-iv d-flex flex-column gap-3 p-0"
            style={{ listStyle: "none", width: "100% !important" }}
          >
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                <span>
                  <IoHomeSharp />
                </span>
                <span>Home</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/rated" className="nav-link">
                <span>
                  <GoStarFill />
                </span>
                <span>Rated</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/upcomming" className="nav-link">
                <span>
                  <FaArrowUpRightDots />
                </span>
                <span>UpComming</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/wishList">
                <span>
                  <PiHeartHalfFill />
                </span>
                <span>Wish List</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/search" className="nav-link">
                <span>
                  <IoSearch />
                </span>
                <span> Search</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
