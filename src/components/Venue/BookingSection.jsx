import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'
import { Calendar } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const BookingSection = ({ venueId, bookings }) => {
  const { sendRequest, isLoading } = useApi()
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: 'f00',
    },
  ])
  const [guests, setGuests] = useState(1)

  useEffect(() => {
    console.log('Current date range:', dateRange)
  }, [dateRange])
  const handleSelect = (date) => {
    console.log('Received date:', date)

    if (!(date instanceof Date)) {
      console.error('Invalid date received:', date)
      return
    }

    const newRange = {
      startDate: date,
      endDate: date,
      key: 'selection',
      color: '#f00',
    }

    setDateRange([newRange])
  }

  const handleBooking = async () => {
    console.log('Attempting to book with range:', dateRange)

    if (!venueId || !dateRange[0].startDate || !dateRange[0].endDate) {
      alert('Please select valid date range.')
      return
    }

    const bookingData = {
      dateFrom: dateRange[0].startDate.toISOString(),
      dateTo: dateRange[0].endDate.toISOString(),
      guests,
      venueId,
    }

    try {
      await sendRequest({
        url: 'https://v2.api.noroff.dev/holidaze/bookings',
        method: 'post',
        data: bookingData,
      })
      alert('Booking successful!')
    } catch (error) {
      console.error('Booking failed:', error)
      alert('Booking failed.')
    }
  }

  // Prepare booked dates for display
  const disabledDates = bookings.map((booking) => ({
    startDate: new Date(booking.dateFrom),
    endDate: new Date(booking.dateTo),
    key: 'booked',
  }))

  return (
    <div className="my-4 py-4 border-t">
      <h2 className="text-xl font-semibold">Book Your Stay</h2>
      <Calendar
        ranges={dateRange}
        onChange={handleSelect}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
        disabledDates={disabledDates.map((date) => new Date(date.startDate))}
      />
      <input
        type="number"
        value={guests}
        onChange={(e) => setGuests(parseInt(e.target.value, 10))}
        min="1"
        className="mt-2"
      />
      <button onClick={handleBooking} disabled={isLoading} className="mt-2">
        Book Now
      </button>
    </div>
  )
}

BookingSection.propTypes = {
  venueId: PropTypes.string.isRequired,
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default BookingSection
