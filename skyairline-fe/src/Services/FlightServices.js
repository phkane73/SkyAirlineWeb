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

export const getFlight = async (id) => {
  try {
    const response = await API.get("/api/public/flightschedule/flight", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getClass = async (id) => {
  try {
    const response = await API.get("/api/public/class/getclass", {
      params: { id: id },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
