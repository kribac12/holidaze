import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'

const FormattedDate = ({ date, formatStr = 'PP' }) => {
  try {
    const formattedDate = format(parseISO(date), formatStr)
    return <span>{formattedDate}</span>
  } catch (error) {
    console.error('Invalid date format:', error)
    return <span>Invalid date</span>
  }
}

FormattedDate.propTypes = {
  date: PropTypes.string.isRequired,
  formatStr: PropTypes.string,
}

export default FormattedDate
