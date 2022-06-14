import Header from "./components/Header";
import "./styles/App.css";
import "./styles/nav.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";

function App() {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="App">
      <Header />
      {!dropDown && (
        <FaAngleDown
          className="dropDownIcon"
          onClick={(e) => {
            setDropDown(!dropDown);
          }}
        />
      )}

      {dropDown && (
        <nav>
          <FaAngleUp
            className="dropDownIcon"
            onClick={(e) => {
              setDropDown(!dropDown);
            }}
          />
          <Link
            className="active links"
            onClick={(e) => {
              removeActive();
              addActive(e.target);
            }}
            to="/"
          >
            Home
          </Link>
          <Link className="links" to="/seeAllMatches" onClick={(e) => {}}>
            See all matches
          </Link>
        </nav>
      )}
      <Outlet />
    </div>
  );
}

export default App;
