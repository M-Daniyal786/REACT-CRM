import axios from "axios";

// export const BASE_URL = "http://192.168.0.102:3005/api/";
// export const FRONTEND_URL = "http://192.168.0.160:3000/"

export const BASE_URL = "https://crm-dipixels.herokuapp.com/api/";
export const FRONTEND_URL =
  "http://https://61791f5189bb6fc0e26e6ddc--pedantic-khorana-36432e.netlify.app/";

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    create: (newRecord) => axios.post(url, newRecord),
    fetchById: (id) => axios.get(url + id),
    delete: (id) => axios.delete(url + id),
    fetchFiltered: (params) => axios.get(url, params),
    update: (id, updatedRecord) => axios.patch(url + id, updatedRecord),
  };
};
