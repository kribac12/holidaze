import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import useStore from '@/store'
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
      const response = await sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/profiles/${profile.name}`,
        method: 'put',
        data: updateData,
      })
      if (response.data) {
        useStore.getState().setAuth({
          user: {
            ...useStore.getState().auth.user,
            venueManager: data.venueManager, // Make sure this is updated based on form data
          },
        })
        onClose(true) // Close the modal with a state that updates can reflect immediately
      }
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
        <h2 className="font-h2 text-h2">Edit your profile</h2>
        <label className="block text-sm font-medium text-gray-700">
          Bio:
          <input
            {...register('bio')}
            className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Avatar URL:
          <input
            {...register('avatar', { pattern: urlPattern })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.avatar && <p>Invalid URL</p>}
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Avatar Alt Text:
          <input
            {...register('avatarAlt')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Banner URL:
          <input
            {...register('banner', { pattern: urlPattern })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.banner && <p>Invalid URL</p>}
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Banner Alt Text:
          <input
            {...register('bannerAlt')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Venue Manager:
          <input
            type="checkbox"
            {...register('venueManager')}
            className="ml-2 align-middle"
          />
        </label>
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="py-2 px-4 bg-primary text-white rounded hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
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
