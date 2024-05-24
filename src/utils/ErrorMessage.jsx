import PropTypes from 'prop-types'

function ErrorMessage({ message, onClose }) {
  return (
    <div
      className="relative rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
      role="alert"
    >
      <strong className="font-bold">Error:</strong>
      <span className="block sm:inline">{message}</span>
      {onClose && (
        <span
          className="absolute bottom-0 right-0 top-0 cursor-pointer px-3 py-2"
          onClick={onClose}
          title="Close"
        >
          <svg
            className="h-6 w-6 fill-current text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 001.697 0l2.651-3.029a1.2 1.2 0 10-1.697-1.697l-2.758 3.15 2.759 3.152a1.2 1.2 0 01-1.697 1.697L10 13.183l-2.651 3.031a1.2 1.2 0 01-1.697-1.697l2.758-3.152-2.758-3.15a1.2 1.2 0 111.697-1.697L10 10.817l2.651-3.031a1.2 1.2 0 011.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 010 1.698z" />
          </svg>
        </span>
      )}
    </div>
  )
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func,
}

export default ErrorMessage
