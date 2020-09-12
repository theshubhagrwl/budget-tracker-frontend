import { API } from "../backend";
import Axios from "axios";

// var temp;
// try {
//   temp = JSON.parse(localStorage.getItem("jwt"));
//   if (temp != null) {
//     var { token } = temp;
//   }
// } catch (error) {
//   console.log(error);
// }

if (localStorage.getItem("jwt")) {
  var { token } = JSON.parse(localStorage.getItem("jwt"));
  //TODO: compare JWT with database json token
}

// console.log("SESSION TOKEN", token);

export const getData = async () => {
  try {
    const response = await Axios({
      method: "GET",
      url: `${API}items/list/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
    // .then((res) => {
    //   return res.data;
    // })
  } catch (error) {
    console.log(error);
  }
  // catch((e) => console.log(e));
};

export const deleteItem = async (id) => {
  try {
    const response = await Axios({
      method: "DELETE",
      url: `${API}items/delete-item/${id}/`,
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
    // .then((res) => {
    //   // return res.data
    //   console.log(res.data);
    // })
  } catch (e) {
    console.log(e);
  }
  // .catch((e) => {
  //   console.log(e);
  // });
};

export const addItem = async (data) => {
  try {
    const response = await Axios({
      method: "POST",
      url: `${API}items/add-item/`,
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    return response.data;
    //  .then((res) => {
    //    console.log(res.data);
    //  })
  } catch (e) {
    console.log(e);
  }
  // .catch((e) => {
  //   console.log(e);
  // });
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
