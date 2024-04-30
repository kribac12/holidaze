import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useApi from '@/services/Api'
import EditProfileModal from '@/components/EditProfileModal'

const ProfilePage = () => {
  const { name: profileName } = useParams()
  const { data: profileData, isLoading, isError, sendRequest } = useApi()
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    sendRequest({
      url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`,
      method: 'get',
    })
      .then((data) => console.log('API data received:', data))
      .catch(console.error)
  }, [sendRequest, profileName])

  const handleModalClose = (updated) => {
    setIsEditing(false)
    if (updated) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profileName}`,
        method: 'get',
      }).catch(console.error)
    }
  }

  if (isLoading) return <div>Loading...</div>

  if (isError || !profileData || !profileData.data)
    return <div>Error fetching profile data.</div>
  return (
    <div>
      <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      <EditProfileModal
        isOpen={isEditing}
        onClose={handleModalClose}
        profile={profileData.data}
      />
      <h1>{profileData.data.name}</h1>
      <p>Email: {profileData.data.email}</p>
      <p>Bio: {profileData.data.bio}</p>
      {profileData.data.avatar && (
        <img
          src={profileData.data.avatar.url}
          alt={profileData.data.avatar.alt || 'Profile Avatar'}
        />
      )}
      {profileData.data.banner && (
        <img
          src={profileData.data.banner.url}
          alt={profileData.data.banner.alt || 'Profile Banner'}
        />
      )}
      <p>Venue Manager: {profileData.data.venueManager ? 'Yes' : 'No'}</p>
      <p>Total Venues: {profileData.data._count.venues}</p>
      <p>Total Bookings: {profileData.data._count.bookings}</p>
    </div>
  )
}

export default ProfilePage
