import API from "./API";
export const getTicketsByUserId = async (token) => {
  try {
    const response = await API.get("/api/public/ticket", {
      params: {
        token: token,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
