import { API } from "../backend";
import Axios from "axios";

export const getRoutes = () => {
  return Axios.get(`${API}`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};
