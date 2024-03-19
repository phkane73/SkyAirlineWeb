import API from "./API";
import dayjs from "dayjs";
export const register = async (username, email, password, phone) => {
  try {
    const response = await API.post("/api/public/user/register", {
      username: username,
      email: email,
      password: password,
      phone: phone,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const verifyCode = async (email, verifyCode) => {
  try {
    const response = await API.post("/api/public/user/verifycode", {
      email: email,
      codeverify: verifyCode,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const login = async (email, password) => {
  try {
    const response = await API.post("/api/public/user/login", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getInfo = async (token) => {
  try {
    const response = await API.post("/api/public/user/info", {
      token: token,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const confirmInformation = async (formData, birthday) => {
  try {
    const response = await API.post("/api/public/user/confirm", {
      email: formData.email,
      username: formData.username,
      phone: formData.phoneNumber,
      birthday: dayjs(birthday).format("YYYY-MM-DD"),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
