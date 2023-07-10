import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  console.log('Notification message: ', message)
  const notificationStyle = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    border: `2em solid ${type === 'error' ? 'red' : 'green'}`,
    borderRadius: '5em',
    padding: '2em',
  }

  if (message === null) {
    return null
  }

  return <div style={notificationStyle}>{message}</div>
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}

export default Notification
