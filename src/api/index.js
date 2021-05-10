import axios from "axios";

const BASE_URL = "http://192.168.100.9:3000/api/";

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    create: (newRecord) => axios.post(url, newRecord),
    fetchById: (id) => axios.get(url + id),
  };
};
