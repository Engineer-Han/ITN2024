// services/auth/MemberService.js
import axios from "axios";

const baseURL = "http://localhost:8000/api"
// const baseURL ="http://192.168.1.82:8000/api"

// 전체조회
const getAll = (searchKeyword, pageIndex, recordCountPerPage) => {
    return axios
        .get(baseURL + `/auth/member?searchKeyword=${searchKeyword}&pageIndex=${pageIndex}&recordCountPerPage=${recordCountPerPage}`);
};
const get = (email) => {
    return axios.get(baseURL + `/auth/member/${email}`);
}
const update = (email, data) => {
    return axios.put(baseURL +`/auth/member/${email}`, data);
}

const MemberService = {
    getAll, get, update
}
export default MemberService;