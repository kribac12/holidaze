import PropTypes from 'prop-types'
import FormattedDate from '@/lib/FormattedDate'

const VenueBookings = ({ bookings }) => {
  if (!bookings.length) {
    return (
      <div>
        <h2 className="text-h2 font-h2">Bookings</h2>
        <p>No bookings have been made for this venue yet.</p>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <h2 className="text-h2 font-h2 ">Current Bookings</h2>
      <ul className="list-disc pl-5">
        {bookings.map((booking, index) => (
          <li key={index}>
            Booking from <FormattedDate date={booking.dateFrom} /> to{' '}
            <FormattedDate date={booking.dateTo} /> for {booking.guests}{' '}
            guest(s).
          </li>
        ))}
      </ul>
    </div>
  )
}

VenueBookings.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
      guests: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default VenueBookings
