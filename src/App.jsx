import Header from "./components/Header";
import LogIn from "./components/LogIn";
import "./styles/App.css";
import "./styles/nav.css";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { loginUrl } from "./settings";

function App() {
  const [dropDown, setDropDown] = useState(false);
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");
  const [loggedIn, setLoggedIn] = useState("");

  useEffect(() => {
    if (loggedIn === "") {
      let userNameLS = localStorage.getItem("userName");
      let loggedInLS = localStorage.getItem("loggedIn");
      let userRoleLS = JSON.parse(localStorage.getItem("userRole"));

      setUserName(userNameLS);
      setLoggedIn(loggedInLS);
      setUserRole(userRoleLS);
    }
  });

  const logInFunc = async (user) => {
    const res = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (data.code !== null && data.code !== "" && data.code !== undefined) {
      alert(data.message);
      setLoggedIn(false);
    }
    console.log(data);

    if (
      data.username !== null &&
      data.username !== "" &&
      data.username !== undefined
    ) {
      setUserName(data.username);
      setUserRole(data.role0);
      let roleArray = [data.role0, data.role1];
      setUserRole(data.role0, data.role1);
      localStorage.setItem("userRole", JSON.stringify(roleArray));

      setLoggedIn(true);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("token", data.token);
      window.location.reload();
    }
  };
  const logOutFunc = async () => {
    setLoggedIn(false);
    setUserName("");
    setUserRole("");
    setCallLinkCheck(false);
    localStorage.clear();
    window.location.href = "/";
  };

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
          <Link className="links" to="/seeAllMatches">
            See all matches
          </Link>
          {userRole !== null &&
            userRole !== undefined &&
            userRole.includes("admin") && (
              <Link className="links" to="/deleteUser">
                delete a user
              </Link>
            )}
        </nav>
      )}
      <Outlet />
      {!loggedIn && <LogIn onAdd={logInFunc} />}
      {loggedIn && (
        <div>
          <hr id="logOutScroll" />
          <LogOut onClick={logOutFunc} />
        </div>
      )}
    </div>
  );
}

export default App;
