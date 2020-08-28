import { API } from "../backend";
// import Axios from "axios";

export const signup = (user) => {
  return fetch(`${API}users/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  // return Axios({
  //   method: "POST",
  //   url: `${API}users/`,
  //   headers: {
  //     // Accept: "application/json",
  //     "Content-Type": "application/json",
  //   },
  //   data: JSON.stringify(user),
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((e) => console.log(e));
};

export const signin = (user) => {
  const formData = new FormData();

  for (const name in user) {
    formData.append(name, user[name]);
  }

  // const{email, password} = user
  // formData.append('email',email)
  // formData.append('password',password)

  for (var key of formData.keys()) {
    console.log("MYKEY", key);
  }

  return fetch(`${API}users/login/`, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      console.log("SUCCESS", response);
      return response.json();
    })
    .catch((err) => console.log(err));
  // return Axios({
  //   method: "POST",
  //   url: `${API}users/login/`,
  //   data: formData,
  // })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
    //Compare JWT with database token
  } else {
    return false;
  }
};

export const signout = (next) => {
  const userId = isAuthenticated() && isAuthenticated().user.id;
  console.log("USERID: ", userId);
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    // next();

    return fetch(`${API}users/logout/${userId}/`, {
      method: "GET",
    })
      .then((response) => {
        console.log("Signout Success");
        next();
      })
      .catch((err) => console.log(err));
    // return Axios({
    //   method: "GET",
    //   url: `${API}users/logout/${userId}/`,
    // })
    //   .then((res) => {
    //     console.log("Logout Success");
    //     next();
    //   })
    //   .catch((err) => console.log(err));
  }
};
