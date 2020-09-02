import { API } from "../backend";
import Axios from "axios";

var token;
try {
  var { token } = JSON.parse(localStorage.getItem("jwt"));
} catch (error) {
  console.log(error);
}

// console.log("SESSION TOKEN", token);

export const getData = () => {
  return Axios({
    method: "GET",
    url: `${API}items/list/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const deleteItem = (id) => {
  return Axios({
    method: "DELETE",
    url: `${API}items/delete-item/${id}/`,
    headers: {
      Authorization: `Token ${token}`,
    },
  })
    .then((res) => {
      // return res.data
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addItem = (data) => {
  return Axios({
    method: "POST",
    url: `${API}items/add-item/`,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};

export const editItem = (id, data) => {
  return Axios({
    method: "PUT",
    url: `${API}items/items/update-item/${id}/`,
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
};
