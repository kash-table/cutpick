import axios from 'axios';
let token = sessionStorage.getItem("jwt");
export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  headers: {
    'Content-Type' : 'application/json',
    'x-access-token': token
  },
});