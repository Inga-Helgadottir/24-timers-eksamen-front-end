import React from "react";
import "../styles/match.css";

const Match = ({ props }) => {
  return (
    <div className="singleMatch">
      <h2>Type: {props.type}</h2>
      <p>Judge: {props.judge}</p>
      <p>Oponent team: {props.opponentTeam}</p>
      <p>In doors: {props.inDoors ? "yes" : "no"}</p>
      <ul>
        Team members:
        {props.playerDTOS.length > 0 &&
          props.playerDTOS.map((element, index) => {
            return <li key={index}>{element.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Match;
