import React from "react";
import { API } from "../backend";
import Axios from "axios";

const Items = () => {
  Axios.get(`${API}`)
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));
  return <div>API results</div>;
};

export default Items;
