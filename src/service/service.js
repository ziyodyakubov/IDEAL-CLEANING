import http from "./config";

const service = {
  get: () => http.get("/service/all", { params: { page: 1, limit: 10 } }),
  add: (data) => http.post("/service", data),
  edit: (data) => http.put("/service", data),
  delete: (id) => http.delete("/service", {params: {id}}),
};

export default service;
