import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Modal from 'react-modal'
import useApi from '@/services/Api'
import PropTypes from 'prop-types'

Modal.setAppElement('#root') // Prevents screen readers from reading background content

function EditProfileModal({ isOpen, onClose, profile }) {
  const { sendRequest } = useApi()
  const urlPattern =
    /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: profile.bio,
      avatar: profile.avatar.url,
      avatarAlt: profile.avatar.alt,
      banner: profile.banner.url,
      bannerAlt: profile.banner.alt,
      venueManager: profile.venueManager,
    },
  })

  useEffect(() => {
    reset(profile)
  }, [profile, reset])

  const onSubmit = async (data) => {
    const updateData = {}

    if (data.bio) updateData.bio = data.bio
    if (data.avatar && data.avatarAlt) {
      // Ensure both URL and Alt text are provided for avatar
      updateData.avatar = { url: data.avatar, alt: data.avatarAlt }
    }
    if (data.banner && data.bannerAlt) {
      // Ensure both URL and Alt text are provided for banner
      updateData.banner = { url: data.banner, alt: data.bannerAlt }
    }
    if (data.venueManager !== undefined)
      updateData.venueManager = data.venueManager

    try {
      await sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profile.name}`,
        method: 'put',
        data: updateData,
      })
      onClose(true) // Signal a successful update
    } catch (error) {
      console.error('Failed to update profile:', error)
      onClose(false) // Signal an error
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      contentLabel="Edit Profile"
      className="m-auto bg-white rounded-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block">
          Bio:
          <input {...register('bio')} className="input-field" />
        </label>
        <label className="block">
          Avatar URL:
          <input
            {...register('avatar', { pattern: urlPattern })}
            className="input-field"
          />
          {errors.avatar && <p>Invalid URL</p>}
        </label>
        <label className="block">
          Avatar Alt Text:
          <input {...register('avatarAlt')} className="input-field" />
        </label>
        <label className="block">
          Banner URL:
          <input
            {...register('banner', { pattern: urlPattern })}
            className="input-field"
          />
          {errors.banner && <p>Invalid URL</p>}
        </label>
        <label className="block">
          Banner Alt Text:
          <input {...register('bannerAlt')} className="input-field" />
        </label>
        <label className="block">
          Venue Manager:
          <input type="checkbox" {...register('venueManager')} />
        </label>
        <button type="submit" className="submit-button">
          Update Profile
        </button>
        <button
          type="button"
          onClick={() => onClose(false)}
          className="cancel-button"
        >
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
