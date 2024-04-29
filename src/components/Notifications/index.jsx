import PropTypes from 'prop-types'

const Notification = ({ message, type, className }) => {
  if (!message) return null

  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'
  return (
    <div
      className={`${backgroundColor} ${className} text-white p-4 rounded-md fixed top-5 right-5 z-50`}
    >
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  className: PropTypes.string,
}

Notification.defaultProps = {
  className: '',
}

export default Notification
