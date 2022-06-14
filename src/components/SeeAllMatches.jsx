import React from "react";
import LoadingIcons from "react-loading-icons";
import { seeAllMatches } from "../settings";
import { useState, useEffect } from "react";
import Match from "./Match";

const SeeAllMatches = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getMatches = async () => {
      const fromDB = await getMatchesList();
      setMatches(fromDB);
    };
    getMatches();
  }, []);

  const getMatchesList = async () => {
    document.querySelector(".loading").style.display = "block";
    const res = await fetch(seeAllMatches);
    const data = await res.json();
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  return (
    <div className="allMatches">
      <LoadingIcons.ThreeDots className="loading" />
      <div>
        <div className="Cocktails">
          <h2>Matches</h2>
          {matches.length > 0 ? (
            matches.map((element, index) => {
              return <Match key={index} props={element} />;
            })
          ) : (
            <h2>There are currently no matches</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeeAllMatches;
