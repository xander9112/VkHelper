export function authHeader() {
    // return authorization header with jwt token

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user && user.access_token) {
        return {"Authorization": user.access_token};
    } else {
        return [];
    }
}
