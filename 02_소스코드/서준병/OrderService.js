import axios from "axios";
const baseURL = "http://localhost:8000/api";
// 전체조회
const getAll = (searchKeyword, pageIndex, recordCountPerPage) => {
  return axios.get(
    baseURL +
      `/advanced/order/list?searchKeyword=${searchKeyword}&pageIndex=${pageIndex}&recordCountPerPage=${recordCountPerPage}`
  );
};

// Order insert /api/advanced/order/insert
const insert = (data) => {
  return axios.post(baseURL + `/advanced/order/insert`, data);
};

// Order 상세 조회 /api/advanced/order/select/{orid}
const get = (orid) => {
  return axios.get(baseURL + `/advanced/order/select/${orid}`);
};

// Order update /api/advanced/order/update/{orid}
const update = (orid, data) => {
  return axios.put(baseURL + `/advanced/order/update/${orid}`, data);
};

// Order delete /api/advanced/order/delete/{orid}
const remove = (orid, data) => {
  return axios.delete(baseURL + `/advanced/order/delete/${orid}`, data);
};

//email 기준 상세조회 /api/advanced/order/detail/{email}
const getDetail = (email) => {
  return axios.get(baseURL + `/advanced/order/detail/${email}`);
};

// 객체 : getAll 넣어 export
const OrderService = {
  getAll,
  insert,
  get,
  update,
  remove,
  getDetail,
};
export default OrderService;
