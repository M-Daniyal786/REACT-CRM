import axios from "axios";

export const BASE_URL = "http://192.168.0.102:3000/api/";

export const FRONTEND_URL = "http://192.168.0.160:3000/"

export const createAPIEndPoint = (endpoint) => {
  let url = BASE_URL + endpoint + "/";
  return {
    fetchAll: () => axios.get(url),
    create: (newRecord) => axios.post(url, newRecord),
    fetchById: (id) => axios.get(url + id),
    delete: (id)=> axios.delete(url+id),
    fetchFiltered: (params) => axios.get(url, params),
    update: (id, updatedRecord) => axios.patch(url + id, updatedRecord),
  };
};
