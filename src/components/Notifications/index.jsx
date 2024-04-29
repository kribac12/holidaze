import { useEffect } from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, type, onDismiss, duration = 5000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  if (!message) return null

  const backgroundColor = type === 'success' ? 'bg-green-500' : 'bg-red-500'

  return (
    <div
      className={`${backgroundColor} text-white p-4 rounded-md fixed top-5 right-5 z-50`}
    >
      {message}
      <button
        onClick={onDismiss}
        className="absolute top-1 right-3 text-xl leading-none font-semibold"
      >
        ×
      </button>
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onDismiss: PropTypes.func.isRequired,
  duration: PropTypes.number,
}

export default Notification
