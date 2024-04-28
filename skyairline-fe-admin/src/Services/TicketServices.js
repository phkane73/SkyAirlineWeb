import API from "./API";

export const getTickets = async () => {
  try {
    const response = await API.get("/api/public/ticket/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const ticketCount = async () => {
  try {
    const response = await API.get("/api/public/ticket/count");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
