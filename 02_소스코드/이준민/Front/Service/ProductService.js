// services - DeptService.js
import axios from "axios";
// 벡엔드 주소 : springboot 주소(컨트롤러주소)
const baseURL = "http://localhost:8000/api"

const getAll = (searchKeyword, pageIndex, recordCountPerPage) => {
    return axios.get(baseURL+`/basic/product?searchKeyword=${searchKeyword}&pageIndex=${pageIndex}&recordCountPerPage=${recordCountPerPage}`);
}
const get = (prid) => {
    return axios.get(baseURL+`/basic/product/${prid}`);
}
const insert = (data) => {
    return axios.post(baseURL+"/basic/product", data);
}
const update = (prid, data) => {
    return axios.put(baseURL+`/basic/product/${prid}`, data);
}
const remove = (prid) => {
    return axios.delete(baseURL+`/basic/product/${prid}`);
}
const ExampleService = {
    getAll,
    get,
    insert,
    update,
    remove 
}

export default ExampleService;