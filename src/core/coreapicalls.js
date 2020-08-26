import { API } from "../backend";
import Axios from "axios";

export const getRoutes = () => {
  return Axios({
    method: "GET",
    url: `${API}items/list/`,
    // headers: {
    //   Authorization: `Bearer ${session_token}`,
    // },
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};
