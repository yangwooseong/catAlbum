const API_ENDPOINT =
  'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

const request = async (url) => {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      return data
    } else {
      throw await response.json()
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    }
  }
}

const fetchRootDirectory = async () => {
  try {
    const result = await request(`${API_ENDPOINT}`)
    return result
  } catch (e) {
    return e
  }
}

const fetchDirectory = async (id) => {
  try {
    const result = await request(`${API_ENDPOINT}/${id}`)
    return result
  } catch (e) {
    return e
  }
}

const api = {
  fetchRootDirectory,
  fetchDirectory,
}

export default api
