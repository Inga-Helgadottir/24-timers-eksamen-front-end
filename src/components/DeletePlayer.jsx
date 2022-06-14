import React from "react";
import { useState } from "react";
import LoadingIcons from "react-loading-icons";
import { deletePlayerUrl } from "../settings";

const DeletePlayer = () => {
  const [id, setId] = useState("");

  const deleteUserfunc = async (id) => {
    document.querySelector(".loading").style.display = "block";
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
    if (data.code === 500) {
      alert("there was an error");
    } else {
      alert("You have changed this users role");
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
    alert("you have deleted the user with the id" + id);
  };
  return (
    <form onSubmit={onSubmit}>
      <LoadingIcons.ThreeDots className="loading" />
      <h2>Delete a user by id</h2>
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
