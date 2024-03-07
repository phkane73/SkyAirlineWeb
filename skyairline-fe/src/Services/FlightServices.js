import API from "./API";

export const findFlight = async (departure, arrival, date) => {
  try {
    const response = await API.get("/api/public/flightschedule/findflight", {
      params: { departure: departure, arrival: arrival, date: date },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
