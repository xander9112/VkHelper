import {fetchApi, history} from "../_helpers";

const handleResponse = (response) => {
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
};

const login = (email, password) => {
  const options = {
    method: "POST",
    body: JSON.stringify({login: email, password})
  };

  return fetchApi("vk/authorize", options)
    .then(handleResponse)
    .then(user => {
      if (user.token) {

        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    });
};

const logout = () => {
  localStorage.removeItem("user");

  history.push("/");
};

export const authService = {
  login,
  logout
};
