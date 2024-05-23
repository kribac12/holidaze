import PropTypes from 'prop-types'
import clsx from 'clsx'

const Button = ({
  children,
  type = 'primary',
  size,
  onClick,
  disabled = false,
  className,
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
    case 'link-button':
      buttonClass = 'link-button'
      break
    default:
      buttonClass = 'button-primary' // Default to primary if type is unspecified or incorrect
  }

  // Append size-specific styles if size is provided
  const sizeClass = size === 'small' ? 'button-small' : ''

  // Append disabled styles if the button is disabled
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

  // Merge all classes using clsx
  const combinedClass = clsx(buttonClass, sizeClass, disabledClass, className)

  return (
    <button
      className={combinedClass}
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
  type: PropTypes.oneOf([
    'primary',
    'secondary',
    'extra',
    'red',
    'link-button',
  ]),
  size: PropTypes.oneOf(['small']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default Button
