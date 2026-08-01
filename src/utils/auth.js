export function isAuthenticated() {
  return !!sessionStorage.getItem("token");
}

export function logout() {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("username");
}