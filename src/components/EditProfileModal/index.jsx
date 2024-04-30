import { useState } from 'react'
import useApi from '@/services/Api'
import Modal from 'react-modal'
import PropTypes from 'prop-types'

Modal.setAppElement('#root') // Prevents screen readers from reading background content

function EditProfileModal({ isOpen, onClose, profile }) {
  const { sendRequest } = useApi()
  const [formData, setFormData] = useState({
    bio: profile.bio,
    avatar: profile.avatar.url,
    avatarAlt: profile.avatar.alt,
    banner: profile.banner.url,
    bannerAlt: profile.banner.alt,
    venueManager: profile.venueManager,
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const updateData = {
      bio: formData.bio,
      avatar: { url: formData.avatar, alt: formData.avatarAlt },
      banner: { url: formData.banner, alt: formData.bannerAlt },
      venueManager: formData.venueManager,
    }

    try {
      await sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profile.name}`,
        method: 'put',
        data: updateData,
      })
      onClose(true) // Pass true to indicate successful update
    } catch (error) {
      console.error('Failed to update profile:', error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      contentLabel="Edit Profile"
    >
      <form onSubmit={handleSubmit}>
        <label>
          Bio:
          <input
            type="text"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Avatar Alt Text:
          <input
            type="text"
            name="avatarAlt"
            value={formData.avatarAlt}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Banner URL:
          <input
            type="text"
            name="banner"
            value={formData.banner}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Banner Alt Text:
          <input
            type="text"
            name="bannerAlt"
            value={formData.bannerAlt}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Venue Manager:
          <input
            type="checkbox"
            name="venueManager"
            checked={formData.venueManager}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                venueManager: e.target.checked,
              }))
            }
          />
        </label>
        <button type="submit">Update Profile</button>
        <button type="button" onClick={() => onClose(false)}>
          Cancel
        </button>
      </form>
    </Modal>
  )
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    bio: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    banner: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    venueManager: PropTypes.bool,
  }).isRequired,
}

export default EditProfileModal
