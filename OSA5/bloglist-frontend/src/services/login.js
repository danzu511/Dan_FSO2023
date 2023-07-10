import axios from 'axios'

const login = async (username, password) => {
  try {
    const response = await axios.post('/api/login', {
      username,
      password,
    })

    if (response.data.token) {
      window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
      return true
    } else {
      return false
    }
  } catch (error) {
    throw new Error('An error occurred during login')
  }
}

export default { login }
