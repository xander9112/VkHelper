import {authHeader} from "./auth-header";
import {config} from "./config";

const requestOptions = {
    headers: {
        "Content-Type": "application/json",
        ...authHeader()
    },
    method: "GET"
};

/**
 *
 * @type {(url, options?: {headers: {Authorization: string} | any[]; method: string}) => Promise<Response>}
 */
export const fetchApi = (url, options = {}) =>
    fetch(`${config.apiUrl}/${url}`, {...requestOptions, ...options})
        .then(handleResponse);


function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("user");
}

function handleResponse(response) {
    return response.json()
        .then(data => {
            if (!response.ok) {
                if (response.status === 401) {
                    // auto logout if 401 response returned from api
                    logout();
                    location.reload(true);
                }

                const error = (data && data.error) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        });
}
