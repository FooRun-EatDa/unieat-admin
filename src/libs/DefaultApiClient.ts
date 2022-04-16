import axios from "axios";

const defaultApiClient = (() => {
  const client = axios.create({
    baseURL: 'http://api.foorun.co.kr/admin',
    // baseURL: 'http://localhost:8088/admin',
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
  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('token')
        window.location.href = "/sign-in"
      }
      return Promise.reject(error)
    }
  )
  return client
})()

export default defaultApiClient
