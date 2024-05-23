import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useApi from '@/services/Api/UseApi'
import useStore from '@/store'
import EditProfileModal from '@/components/Profile/EditProfileModal'
import ProfileBookings from '@/components/Profile/ProfileBookings'
import ProfileVenues from '@/components/Profile/ProfileVenues'
import Notification from '@/components/Shared/Notifications'
import Loader from '@/components/Shared/Loader'
import Button from '@/components/Shared/Buttons'

const ProfilePage = () => {
  const { name: profileName } = useParams()
  const { data: profileData, isLoading, isError, sendRequest } = useApi()
  const [isEditing, setIsEditing] = useState(false)
  const { auth, setNotification } = useStore((state) => ({
    auth: state.auth,
    setNotification: state.setNotification,
  }))
  const isOwnProfile = auth.user && auth.user.name === profileName
  const location = useLocation()
  const [message, setMessage] = useState(location.state?.message || '')

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`,
      method: 'get',
    })
      .then((data) => {
        if (data && data.data && data.data.venueManager !== undefined) {
          // Update Zustand store with the latest venueManager status
          useStore.getState().setAuth({
            user: {
              ...useStore.getState().auth.user,
              venueManager: data.data.venueManager,
            },
          })
        }
      })
      .catch(console.error)
  }, [sendRequest, profileName, auth.user.username])

  const handleModalClose = (updated) => {
    setIsEditing(false)
    if (updated) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`,
        method: 'get',
      }).catch(console.error)
    }
  }

  useEffect(() => {
    if (location.state && location.state.message) {
      setNotification(location.state)
    }
  }, [location.state, setNotification])
  if (isLoading) return <Loader />
  if (isError || !profileData || !profileData.data)
    return <div>Error fetching profile data.</div>

  return (
    <div className="relative pb-16">
      {message && (
        <Notification
          message={message}
          type="success"
          onDismiss={() => setMessage('')}
        />
      )}
      <EditProfileModal
        isOpen={isEditing}
        onClose={handleModalClose}
        profile={profileData.data}
        setMessage={setMessage}
      />
      {profileData.data.banner && (
        <div className="relative h-40 bg-gray-200">
          <img
            src={profileData.data.banner.url}
            alt={profileData.data.banner.alt || 'Profile Banner'}
            className="w-full h-full object-cover"
          />
          {profileData.data.avatar && (
            <img
              src={profileData.data.avatar.url}
              alt={profileData.data.avatar.alt || 'Profile Avatar'}
              className="absolute w-24 h-24 rounded-full border-4 border-primaryBg bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
            />
          )}
        </div>
      )}
      <div className="pt-16 pb-8 px-4 text-center">
        <h1 className="text-h1 font-h1">{profileData.data.name}</h1>
        <p className="text-secondaryText">Email: {profileData.data.email}</p>
        <p className="text-primaryText mb-6"> {profileData.data.bio}</p>
        <Button type="primary" onClick={() => setIsEditing(true)}>
          Edit Profile
        </Button>
      </div>
      <div className="pb-4">
        <p className="text-secondaryText">
          Venue Manager: {profileData.data.venueManager ? 'Yes' : 'No'}
        </p>
        <p className="text-secondaryText">
          Total Venues: {profileData.data._count.venues}
        </p>
        <p className="text-secondaryText">
          Total Bookings: {profileData.data._count.bookings}
        </p>
      </div>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
        <div className="md:flex-1">
          <ProfileBookings
            profileName={profileData.data.name}
            isOwnProfile={isOwnProfile}
          />
        </div>
        <div className="md:flex-1">
          <ProfileVenues
            profileName={profileData.data.name}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
