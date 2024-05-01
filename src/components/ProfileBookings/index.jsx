import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useApi from '@/services/Api'

const ProfileBookings = ({ profileName }) => {
  const { isLoading, isError, sendRequest } = useApi()
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    if (profileName) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}/bookings`,
        method: 'get',
      })
        .then((data) => {
          setBookings(data.data)
        })
        .catch(console.error)
    }
  }, [profileName, sendRequest])

  if (isLoading) return <div>Loading bookings...</div>
  if (isError) return <div>Error fetching bookings.</div>
  if (bookings.length === 0)
    return (
      <div>
        {' '}
        <h2 className="font-h2 text-h2">Bookings</h2>
        {profileName} has no bookings.
      </div>
    )

  return (
    <div>
      <h2 className="font-h2 text-h2">Bookings</h2>

      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            From: {booking.dateFrom} - To: {booking.dateTo} ({booking.guests}{' '}
            guests)
          </li>
        ))}
      </ul>
    </div>
  )
}

ProfileBookings.propTypes = {
  profileName: PropTypes.string.isRequired,
}

export default ProfileBookings
