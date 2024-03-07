import API from "./API";

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

export const veriflyCode = async (email, veriflyCode) => {
  try {
    const response = await API.post("/api/public/user/veriflycode", {
      email: email,
      codeverifly: veriflyCode,
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
