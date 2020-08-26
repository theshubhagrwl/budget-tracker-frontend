import React, { useState, useEffect } from "react";
import { getRoutes } from "./coreapicalls";
import { signout, isAuthenticated } from "../auth";
import { useHistory } from "react-router-dom";
import MainGrid from "./MainGrid";

export default function Home() {
  const [filteredData, setFilteredData] = useState([]);

  const userId = isAuthenticated() && isAuthenticated().user.id;
  console.log("USERID", userId);
  const loadAllRoutes = () => {
    getRoutes()
      .then((data) => {
        //getting and setting the data
        if (data) {
          const fData = data.filter((item) => item.user === userId);
          setFilteredData(fData);
        }
      })
      .catch((err) => console.log("ERR", err));
  };

  useEffect(() => {
    loadAllRoutes();
  }, []);
  let history = useHistory();

  console.log("Filtered Data", filteredData);

  return (
    <div>
      <h1>Budget Tracker Home</h1>
      <div>
        <span
          onClick={() => {
            signout(() => {
              history.push("/signin");
            });
          }}
        >
          Signout
        </span>
      </div>

      <MainGrid />
    </div>
  );
}
