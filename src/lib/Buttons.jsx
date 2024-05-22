import PropTypes from 'prop-types'

const Button = ({
  children,
  type = 'primary',
  onClick,
  disabled = false,
  ...props
}) => {
  let buttonClass

  // Assign class based on type
  switch (type) {
    case 'primary':
      buttonClass = 'button-primary'
      break
    case 'secondary':
      buttonClass = 'button-secondary'
      break
    case 'extra':
      buttonClass = 'button-extra'
      break
    case 'red':
      buttonClass = 'button-red'
      break
    default:
      buttonClass = 'button-primary' // Default to primary if type is unspecified or incorrect
  }

  // Append disabled styles if the button is disabled
  if (disabled) {
    buttonClass += ' opacity-50 cursor-not-allowed'
  }

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'extra', 'red']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
}

export default Button
