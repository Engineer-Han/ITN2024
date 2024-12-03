import axios from "axios";
const baseURL = "http://localhost:8000/api";
// 전체조회
const getAll = (searchKeyword, pageIndex, recordCountPerPage) => {
  return axios.get(
    baseURL +
      `/advanced/inventory/list?searchKeyword=${searchKeyword}&pageIndex=${pageIndex}&recordCountPerPage=${recordCountPerPage}`
  );
};

// inventory 생성 /api/advanced/inventory/insert
const insert = (data) => {
  return axios.post(baseURL + `/advanced/inventory/insert`, data);
};

// inventory 상세조회 /api/advanced/inventory/select/{inid}
const get = (inid) => {
  return axios.get(baseURL + `/basic/faq/${inid}`);
};

// inventory 수정 /api/advanced/inventory/update/{inid}
const update = (inid, data) => {
  return axios.put(baseURL + `/advanced/inventory/update/${inid}`, data);
};

// inventory 삭제 /api/advanced/inventory/delete/{inid}
const remove = (inid, data) => {
  return axios.delete(baseURL + `/advanced/inventory/delete/${inid}`, data);
};

//prid 이용 상세조회 /api/advanced/inventory/detail/{prid}
const getDetail = (prid) => {
  return axios.get(baseURL + `/advanced/inventory/detail/${prid}`);
};

// 객체 : getAll 넣어 export
const InventoryService = {
  getAll,
  insert,
  get,
  update,
  remove,
  getDetail,
};
export default InventoryService;
