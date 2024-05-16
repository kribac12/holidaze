import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useStore from '@/store'
import Modal from 'react-modal'
import useApi from '@/services/Api'
import PropTypes from 'prop-types'
import ErrorMessage from '@/lib/ErrorMessage'
import Notification from '../Notifications'

Modal.setAppElement('#root') // Prevents screen readers from reading background content

const schema = yup
  .object({
    bio: yup
      .string()
      .max(160, 'Bio must be less than 160 characters')
      .nullable(true),
    avatar: yup
      .object({
        url: yup.string().url('Must be a valid URL').nullable(true),
        alt: yup
          .string()
          .max(120, 'Alt text must be less than 120 characters')
          .nullable(true),
      })
      .nullable(true),
    banner: yup
      .object({
        url: yup.string().url('Must be a valid URL').nullable(true),
        alt: yup
          .string()
          .max(120, 'Alt text must be less than 120 characters')
          .nullable(true),
      })
      .nullable(true),
    venueManager: yup.boolean().nullable(true),
  })
  .required()

function EditProfileModal({ isOpen, onClose, profile, setMessage }) {
  const { sendRequest } = useApi()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      bio: profile.bio || '',
      avatar: profile.avatar || { url: '', alt: '' },
      banner: profile.banner || { url: '', alt: '' },
      venueManager: profile.venueManager || false,
    },
  })

  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    reset({
      bio: profile.bio || '',
      avatar: profile.avatar || { url: '', alt: '' },
      banner: profile.banner || { url: '', alt: '' },
      venueManager: profile.venueManager || false,
    })
  }, [profile, reset])

  const onSubmit = async (data) => {
    const updateData = {}
    if (data.bio) updateData.bio = data.bio
    if (data.avatar?.url && data.avatar?.alt)
      updateData.avatar = { url: data.avatar.url, alt: data.avatar.alt }
    if (data.banner?.url && data.banner?.alt)
      updateData.banner = { url: data.banner.url, alt: data.banner.alt }
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
            venueManager: data.venueManager,
          },
        })
        setMessage('Profile updated successfully.')
        onClose(true) // Close the modal with a state that updates can reflect immediately
      }
    } catch (error) {
      console.error('Failed to update profile:', error)
      setMessage('Failed to update profile. Please try again.')
      setNotification({
        message: 'Failed to update profile. Please try again.',
        type: 'error',
      })
      onClose(false) // Signal an error
    }
  }

  const clearNotification = useCallback(() => {
    setNotification({ message: '', type: '' })
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => onClose(false)}
      contentLabel="Edit Profile"
      className="m-auto bg-white rounded-lg p-6 outline-none"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50 z-50"
    >
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={clearNotification}
        />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="font-h2 text-h2">Edit your profile</h2>
        <label className="block text-sm font-medium text-gray-700">
          Bio:
          <input
            {...register('bio')}
            className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        </label>
        {errors.bio && <ErrorMessage message={errors.bio.message} />}
        <label className="block text-sm font-medium text-gray-700">
          Avatar URL:
          <input
            {...register('avatar.url')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.avatar?.url && (
            <ErrorMessage message={errors.avatar.url.message} />
          )}
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Avatar Alt Text:
          <input
            {...register('avatar.alt')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.avatar?.alt && (
            <ErrorMessage message={errors.avatar.alt.message} />
          )}
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Banner URL:
          <input
            {...register('banner.url')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.banner?.url && (
            <ErrorMessage message={errors.banner.url.message} />
          )}
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Banner Alt Text:
          <input
            {...register('banner.alt')}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
          {errors.banner?.alt && (
            <ErrorMessage message={errors.banner.alt.message} />
          )}
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
  setMessage: PropTypes.func.isRequired,
}

export default EditProfileModal
