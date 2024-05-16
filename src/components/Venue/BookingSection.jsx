import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { formatISO, addDays } from 'date-fns'
import Button from '@/lib/Buttons'
import useStore from '@/store'
import ModalLogSignin from '@/components/ModalLogSignin'

const BookingSection = ({ venueId, bookings }) => {
  const { sendRequest, isLoading } = useApi()
  const { auth, openModal } = useStore((state) => ({
    auth: state.auth,
    openModal: state.openModal,
  }))
  const [range, setRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState(1)
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.token)

  useEffect(() => {
    setIsAuthenticated(!!auth.token)
  }, [auth.token])

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
    if (!isAuthenticated) {
      openModal(true) // Open login/register modal if the user is not logged in
      return
    }

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
    <div className="flex flex-col w-full p-4 border border-secondary shadow rounded-lg">
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
        <Button onClick={handleBooking} disabled={isLoading} type="primary">
          Book Now
        </Button>
      </div>
      <ModalLogSignin />
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
