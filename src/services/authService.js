import API from "./api";

export async function loginUser(username, password) {
  try {
    const res = await API.post("/login", { username, password });
    return res.data; 
  } catch (err) {
    const message =
      err.response?.data?.error || err.response?.data?.message || "Login failed";
    throw new Error(message);
  }
}

export async function registerUser(username, password) {
  try {
    const res = await API.post("/register", { username, password });
    return res.data;
  } catch (err) {
    const message =
      err.response?.data?.error || err.response?.data?.message || "Registration failed";
    throw new Error(message);
  }
}