// import config from 'config';
import {authHeader, fetchApi} from "../_helpers";
import {config} from "../_helpers/config";

export const userService = {
  getAll,
  login,
  logout
};

function login(email, password) {
  // const requestOptions = {
  //     body: JSON.stringify({email, password}),
  //     headers: {"Content-Type": "application/json"},
  //     method: "GET"
  // };
  //
  return fetchApi("vk/authorize", {
    method: "POST",
    body: JSON.stringify({login: email, password})
  })
    .then(handleResponse)
    .then(user => {
      // login successful if there's a jwt token in the response
      if (user.token) {

        console.log(user);
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getAll() {
  const requestOptions = {
    headers: authHeader(),
    method: "GET"
  };

  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
  return response;
  // .then(data => {
  //     if (!response.ok) {
  //         if (response.status === 401) {
  //             // auto logout if 401 response returned from api
  //             logout();
  //             location.reload(true);
  //         }
  //
  //         const error = (data && data.error) || response.statusText;
  //         return Promise.reject(error);
  //     }
  //
  //     return data;
  // });
}
