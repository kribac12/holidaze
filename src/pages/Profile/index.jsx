import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import useApi from '@/services/Api/UseApi'
import useStore from '@/store'
import EditProfileModal from '@/components/Profile/EditProfileModal'
import ProfileBookings from '@/components/Profile/ProfileBookings'
import ProfileVenues from '@/components/Profile/ProfileVenues'
import { Notification, Loader, Button } from '@/components/Shared'
import Head from '@/components/HeadMeta'

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
  const [notification, setNotificationState] = useState({
    title: location.state?.title || '',
    message: location.state?.message || '',
    type: location.state?.type || '',
  })

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`,
      method: 'get',
    })
      .then((data) => {
        if (data && data.data && data.data.venueManager !== undefined) {
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
      <Head title="Holidaze profile" description="Specific user profile" />
      {notification.message && (
        <Notification
          title={notification.title}
          message={notification.message}
          type={notification.type}
          onDismiss={() =>
            setNotificationState({ title: '', message: '', type: '' })
          }
        />
      )}
      <EditProfileModal
        isOpen={isEditing}
        onClose={handleModalClose}
        profile={profileData.data}
        setMessage={(msg) =>
          setNotificationState({
            title: 'Profile Successfully Updated!',
            message: msg,
            type: 'success',
          })
        }
      />
      {profileData.data.banner && (
        <div className="relative h-40 bg-gray-200">
          <img
            src={profileData.data.banner.url}
            alt={profileData.data.banner.alt || 'Profile Banner'}
            className="h-full w-full object-cover"
          />
          {profileData.data.avatar && (
            <img
              src={profileData.data.avatar.url}
              alt={profileData.data.avatar.alt || 'Profile Avatar'}
              className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2 translate-y-1/2 transform rounded-full border-4 border-primaryBg"
            />
          )}
        </div>
      )}
      <div className="space-y-4 px-4 pb-8 pt-16 text-center">
        <h1 className="text-h1 font-h1">{profileData.data.name}</h1>
        <p className="text-primaryText">
          {profileData.data.venueManager ? 'Venue Manager' : ''}
        </p>
        <p className="text-secondaryText">Email: {profileData.data.email}</p>
        <p className="text-primaryText "> {profileData.data.bio}</p>
        {isOwnProfile && (
          <Button type="primary" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProfileBookings
          profileName={profileData.data.name}
          isOwnProfile={isOwnProfile}
        />
        <ProfileVenues
          profileName={profileData.data.name}
          isOwnProfile={isOwnProfile}
        />
      </div>
    </div>
  )
}

export default ProfilePage
