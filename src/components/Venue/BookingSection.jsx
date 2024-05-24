import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api/UseApi'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { formatISO, addDays } from 'date-fns'
import Button from '@/components/Shared/Buttons'
import useStore from '@/store'
import Notification from '@/components/Shared/Notifications'
import { useNavigate } from 'react-router-dom'

const BookingSection = ({ venueId, bookings }) => {
  const { sendRequest, isLoading } = useApi()
  const { auth, openModal, setLoginMessage } = useStore((state) => ({
    auth: state.auth,
    openModal: state.openModal,
    setLoginMessage: state.setLoginMessage,
  }))
  const navigate = useNavigate()
  const [range, setRange] = useState({ from: undefined, to: undefined })
  const [guests, setGuests] = useState(1)
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth.token)
  const [notification, setNotification] = useState({
    title: '',
    message: '',
    type: '',
  })

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
      setLoginMessage('You must be logged in to book a stay.')
      openModal(true)
      setNotification({
        title: 'Login Required',
        message: 'You must be logged in to book a stay.',
        type: 'error',
      })
      return
    }

    if (!venueId || !range.from || !range.to) {
      setNotification({
        title: 'Invalid Date Range',
        message: 'Please select a valid date range.',
        type: 'error',
      })
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
      setNotification({
        title: 'Booking Successful!',
        message: 'Venue was booked successfully. Enjoy your stay!',
        type: 'success',
      })
      navigate(`/profile/${auth.user.name}`, {
        state: {
          title: 'Booking successful!',
          message: 'Venue was booked successfully. Enjoy your stay!',
          type: 'success',
        },
      })
    } catch (error) {
      console.error('Booking failed:', error)
      setNotification({
        title: 'Booking Failed',
        message: 'Booking failed. Please try again.',
        type: 'error',
      })
    }
  }

  const disabledDays = getDisabledDays()

  return (
    <div className="flex flex-col p-2 shadow rounded-lg bg-cardBg max-w-sm mx-auto">
      <h2 className="font-h2 text-h2 mt-2">Book Your Stay</h2>
      <div className="mt-2">
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
      </div>
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
        <Button
          onClick={handleBooking}
          disabled={isLoading}
          type="primary"
          className="mt-4"
        >
          Book Now
        </Button>
      </div>
      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onDismiss={() =>
            setNotification({ title: '', message: '', type: '' })
          }
        />
      )}
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
