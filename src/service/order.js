import http from "./config";

const order = {
  get: () => http.get("/order/all", {params: {page: 1,limit: 10}}),
  add: (data) => http.post("/order", data),
  edit: (data) => http.put("/service", data),
  delete: (id) => http.delete("/order", {params: {id}}),
};

export default order;
