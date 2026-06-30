import axios from "./axios";

const dashboardApi = {
  getDashboard: async () => {
    const response = await axios.get("/dashboard");
    return response.data;
  },
};

export default dashboardApi;