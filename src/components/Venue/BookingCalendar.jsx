import PropTypes from 'prop-types'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const BookingCalendar = ({ bookings }) => {
  const bookedDates = bookings?.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: 'booked',
  }))

  return (
    <Calendar
      date={new Date()}
      minDate={new Date()}
      showDateDisplay={false}
      ranges={bookedDates}
      rangeColors={['#ff0000']}
      showSelectionPreview={true}
      moveRangeOnFirstSelection={false}
      months={2}
      direction="horizontal"
      preventSnapRefocus={true}
      showMonthAndYearPickers={false}
      disabledDates={bookedDates.map((range) => range.startDate)}
    />
  )
}

BookingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default BookingCalendar
