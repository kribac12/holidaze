import { useState } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { formatISO, addDays } from 'date-fns'

const BookingSection = ({ venueId, bookings }) => {
  const { sendRequest, isLoading } = useApi()
  const [range, setRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState(1)

  // Function to collect all dates within each booking range for disabling
  const getDisabledDays = () => {
    let days = []
    bookings.forEach((booking) => {
      let current = new Date(booking.dateFrom)
      const end = new Date(booking.dateTo)
      while (current <= end) {
        days.push(new Date(current))
        current = addDays(current, 1)
      }
    })
    return days
  }

  const handleBooking = async () => {
    if (!venueId || !range.from || !range.to) {
      alert('Please select a valid date range.')
      return
    }

    const bookingData = {
      dateFrom: formatISO(range.from, { representation: 'date' }),
      dateTo: formatISO(range.to, { representation: 'date' }),
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

  const disabledDays = getDisabledDays()

  return (
    <div className="flex flex-col w-full">
      <h2 className="font-h2 text-h2 mt-2">Book Your Stay</h2>
      <DayPicker
        mode="range"
        selected={range}
        onSelect={setRange}
        disabled={disabledDays}
        modifiersStyles={{
          selected: {
            backgroundColor: '#FFBA08',
            color: '#333333',
          },
          disabled: {
            backgroundColor: '#F1F1F1',
            color: '#626567',
          },
        }}
        className="mx-0"
      />
      <div className="mt-4">
        <div className="flex flex-row gap-3 items-center">
          <p> Number of guests: </p>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            min="1"
            className="block h-10 w-14 p-2 border rounded"
          />
        </div>
        <button
          onClick={handleBooking}
          disabled={isLoading}
          className="bg-primary w-1/2 text-white font-bold my-4 py-2 px-4 rounded hover:bg-red-700"
        >
          Book Now
        </button>
      </div>
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
