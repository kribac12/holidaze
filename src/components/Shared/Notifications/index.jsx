import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { FaTimes } from 'react-icons/fa'
import { PiHandWavingFill } from 'react-icons/pi'

const Notification = ({
  title,
  message,
  type,
  onDismiss,
  duration = 5000,
  className,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  if (!message) return null

  const textColor = type === 'success' ? 'text-primaryText' : 'text-red-600'

  return (
    <div
      className={`bg-white ${textColor} relative flex items-start space-x-2 rounded-md border border-secondary p-8 shadow-lg ${className}`}
    >
      <PiHandWavingFill className="mr-2 text-2xl text-accent" />
      <div className="flex-1">
        {title && <h3 className="font-semibold">{title}</h3>}
        <p>{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="absolute right-2 top-2 text-xl font-semibold leading-none text-gray-600 hover:text-gray-800"
      >
        <FaTimes />
      </button>
    </div>
  )
}

Notification.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired,
  onDismiss: PropTypes.func.isRequired,
  duration: PropTypes.number,
  className: PropTypes.string,
}

export default Notification
