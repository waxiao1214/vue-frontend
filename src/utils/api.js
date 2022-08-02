import axios from 'axios'

export const getApi = async (url, options={}) => {
  const result = await axios.get(url, options) 
  return result.data 
}

export const postApi = async (url, body, options={}) => {
  const result = await axios.post(url, body,options)
  return result.data
}

export const putApi = async (url, body, options={}) => {
  const result = await axios.put(url, body,options)
  return result.data
}

export const deleteApi = async (url, options={}) => {
  const result = await axios.delete(url, options)
  return result.data
}
