import API from "./API";

export const countRevenue = async () => {
  try {
    const response = await API.get("/api/public/revenue");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
