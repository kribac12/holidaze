import PropTypes from 'prop-types'

const VenueBookings = ({ bookings }) => {
  if (!bookings.length) {
    return <p>No bookings have been made for this venue yet.</p>
  }

  return (
    <div className="mt-4">
      <h2 className="font-bold text-lg">Current Bookings</h2>
      <ul className="list-disc pl-5">
        {bookings.map((booking, index) => (
          <li key={index}>
            Booking from {booking.dateFrom} to {booking.dateTo} for{' '}
            {booking.guests} guests.
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
