import axios from "axios";

const frontApiClient = (() => {
  return axios.create({
    // baseURL: 'http://api.foorun.co.kr',
    baseURL: 'http://localhost:8088',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
})()

export default frontApiClient
