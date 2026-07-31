import API from "./api";

export async function loginUser(username, password){
    try {
        const response = await API.post("/login", { username, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "An error occurred during login.";
        throw new Error(message);
    }
}

export async function registerUser(username, password) {
    try {
        const response = await API.post("/register", { username, password });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || "An error occurred during registration.";
        throw new Error(message);
    }
};