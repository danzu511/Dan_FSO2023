import React from 'react'
import PropTypes from 'prop-types'

const LogOut = ({ onLogOut, user }) => {
  const handleLogOut = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedInUser')
      console.log('User removed from local storage')
      onLogOut()
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  return (
    <div>
      <>{user} is logged in </>
      <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

LogOut.propTypes = {
  onLogOut: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
}

export default LogOut