import axios from 'axios'
import { Auth } from 'aws-amplify'
import { API_ENDPOINT } from '../config/constants'

const headers = {}

const instance = axios.create({
  baseURL: API_ENDPOINT,
  headers,
})

const axiosRequestInterceptor = async (config) => {
  const session = await Auth.currentSession()

  const token = session.getIdToken().getJwtToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

instance.interceptors.request.use(axiosRequestInterceptor, (e) =>
  Promise.reject(e)
)

export default instance
