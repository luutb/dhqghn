export const getToken = () => {
  // Giả sử bạn lưu token trong localStorage
  return localStorage.getItem("token");
};

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const setLocalData = (data) => {
  localStorage.setItem("role", data.role);
  localStorage.setItem("code", data.code);
  localStorage.setItem("name", data.name);
};
