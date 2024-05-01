import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'
import { DateRangePicker } from 'react-date-range'

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const BookingSection = ({ venueId, bookings }) => {
  const { sendRequest, isLoading } = useApi()
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
      color: '#f00',
    },
  ])
  const [guests, setGuests] = useState(1)

  const getDatesInRange = (startDate, endDate) => {
    const dates = []
    let currentDate = startDate
    while (currentDate <= endDate) {
      dates.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  useEffect(() => {
    console.log('Current date range:', dateRange)
  }, [dateRange])

  const handleSelect = (ranges) => {
    console.log('Received ranges:', ranges)
    const newRange = {
      ...ranges.selection,
      color: '#f00',
    }
    setDateRange([newRange])
  }

  const handleBooking = async () => {
    console.log('Attempting to book with range:', dateRange)
    if (!venueId || !dateRange[0].startDate || !dateRange[0].endDate) {
      alert('Please select a valid date range.')
      return
    }

    const startDateUTC = new Date(dateRange[0].startDate.setHours(0, 0, 0, 0))
    const endDateUTC = new Date(dateRange[0].endDate.setHours(23, 59, 59, 999))

    const bookingData = {
      dateFrom: startDateUTC.toISOString(),
      dateTo: endDateUTC.toISOString(),
      guests,
      venueId,
    }
    console.log('Booking data:', bookingData)

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
  const disabledDates = bookings.reduce((acc, booking) => {
    const dates = getDatesInRange(
      new Date(booking.dateFrom),
      new Date(booking.dateTo)
    )
    return [...acc, ...dates]
  }, [])

  return (
    <div className="my-4 py-4 border-t">
      <h2 className="text-xl font-semibold">Book Your Stay</h2>
      <DateRangePicker
        ranges={dateRange}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        months={1}
        direction="horizontal"
        disabledDates={disabledDates}
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
