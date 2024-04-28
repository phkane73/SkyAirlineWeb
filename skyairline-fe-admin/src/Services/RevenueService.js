import API from "./API";

export const countRevenue = async () => {
  try {
    const response = await API.get("/api/public/revenue");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const revenues = async () => {
  try {
    const response = await API.get("/api/public/revenue/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const revenueMonths = async () => {
  try {
    const response = await API.get("/api/public/revenue/month");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const revenueYears = async () => {
  try {
    const response = await API.get("/api/public/revenue/year");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
