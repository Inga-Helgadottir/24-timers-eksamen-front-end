import React from "react";
import { useState } from "react";
import { deletePlayerUrl } from "../settings";

const DeletePlayer = () => {
  const [id, setId] = useState("");

  const deleteUserfunc = async (id) => {
    let token = localStorage.getItem("token");
    const res = await fetch(deletePlayerUrl + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "x-access-token": token,
        "Access-Control-Allow-Origin": "*",
      },
    });

    const data = await res.json();
    if (data.code !== 200 || data.code !== 204) {
      alert("there was an error");
    } else {
      alert("you have deleted the user with the id" + id);
    }
    document.querySelector(".loading").style.display = "none";
    return data;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (id === "") {
      alert("Please choose an id");
      return;
    }

    deleteUserfunc({ id });

    setId("");
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Delete a player by id</h2>
      <p>The endpoint for this function does not work</p>
      <div className="form-control">
        <label>id</label>

        <input
          type="number"
          placeholder="Name"
          value={id}
          onChange={(e) => setId(e.target.value)}
        ></input>
      </div>
      <input type="submit" value="delete the user" className="btn" />
    </form>
  );
};

export default DeletePlayer;
