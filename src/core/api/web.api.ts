import axios, { AxiosRequestConfig } from 'axios'
import { base } from '../setting';


export const useApiAxPost = async <T>(url: string, data?: any, config?: AxiosRequestConfig | undefined) => {
  if (config === undefined) {
    config = { baseURL: base.http, headers: { 'Content-type': 'application/json' } }
  }
  const ax = await axios.post<T>(url, data, config)
  return ax.data
}
