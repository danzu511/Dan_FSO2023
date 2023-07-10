import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', {
        username,
        password,
      })

      // Assuming the response contains a token or authentication status
      if (response.data.token) {
        window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
        console.log('response.data stored into local Storage: ', response.data)
        onLogin(username) // Notify the parent component (App) about the successful login
      } else {
        // Handle login failure
        const errorMessage = 'Login Failed'
        onLogin(null, errorMessage)
      }
    } catch (error) {
      // Handle error
      const errorMessage = error.response.data.error
      onLogin(null, errorMessage)

    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button
        id="login-button"
        type="submit"
      >Login</button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
