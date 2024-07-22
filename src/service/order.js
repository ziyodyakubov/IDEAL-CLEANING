import http from "./config";

const order = {
  get: (params) => http.get("/order/all", {params}),
  add: (data) => http.post("/order", data),
  edit: (data) => http.put("/service", data),
  delete: (id) => http.delete("/order", {params: {id}}),
};

export default order;