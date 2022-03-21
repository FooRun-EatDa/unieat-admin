import axios from "axios";

const frontApiClient = (() => {
  const client = axios.create({
    baseURL: 'http://api.foorun.co.kr',
    // baseURL: 'http://localhost:8088',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  client.interceptors.request.use(
    config => {
      config.headers = Object.assign(config.headers, {
        'Authorization': localStorage.getItem('token'),
        'X-Refresh-Token': localStorage.getItem('refreshToken'),
      })
      return config
    },
    error => Promise.reject(error)
  )
  return client
})()

export default frontApiClient
