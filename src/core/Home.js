import React, { useState, useEffect } from "react";
import { getRoutes } from "./coreapicalls";
import { signout } from "../auth";
import { useHistory } from "react-router-dom";
export default function Home() {
  const [routes, setRoutes] = useState();
  const [error, setError] = useState(false);

  const loadAllRoutes = () => {
    getRoutes().then((data) => {
      // if (data.error) {
      //   setError(data.error);
      //   console.log(error);
      // } else {
      //   setRoutes(data);
      // }
      // setRoutes(...data);
      console.log(typeof data);
      console.log(data);
    });
  };

  useEffect(() => {
    loadAllRoutes();
  }, []);
  let history = useHistory();
  return (
    <div>
      <h1>Budget Tracker Home</h1>
      {routes}
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
  );
}
