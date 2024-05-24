import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useStore from '@/store'
import Modal from 'react-modal'
import useApi from '@/services/Api/UseApi'
import PropTypes from 'prop-types'
import ErrorMessage from '@/utils/ErrorMessage'
import Notification from '../../Shared/Notifications'
import Button from '@/components/Shared/Buttons'

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
        setMessage('You may view the changes.')
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
      className="m-auto max-h-screen overflow-y-auto rounded-lg bg-white p-6 outline-none"
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
        <h2 className="text-h2 font-h2">Edit your profile</h2>
        <div>
          <label htmlFor="bio" className="label-base">
            Bio:
          </label>
          <textarea
            {...register('bio')}
            id="bio"
            placeholder="Bio"
            className="input-base mt-1"
            rows="4"
          />
          {errors.bio && <ErrorMessage message={errors.bio.message} />}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="avatar.url" className="label-base">
              Avatar URL:
            </label>
            <input
              {...register('avatar.url')}
              id="avatar.url"
              placeholder="Avatar URL"
              className="input-base mt-1"
            />
            {errors.avatar?.url && (
              <ErrorMessage message={errors.avatar.url.message} />
            )}
          </div>
          <div>
            <label htmlFor="avatar.alt" className="label-base">
              Avatar Alt Text:
            </label>
            <input
              {...register('avatar.alt')}
              id="avatar.alt"
              placeholder="Avatar Alt Text"
              className="input-base mt-1"
            />
            {errors.avatar?.alt && (
              <ErrorMessage message={errors.avatar.alt.message} />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="banner.url" className="label-base">
              Banner URL:
            </label>
            <input
              {...register('banner.url')}
              id="banner.url"
              placeholder="Banner URL"
              className="input-base mt-1"
            />
            {errors.banner?.url && (
              <ErrorMessage message={errors.banner.url.message} />
            )}
          </div>
          <div>
            <label htmlFor="banner.alt" className="label-base">
              Banner Alt Text:
            </label>
            <input
              {...register('banner.alt')}
              id="banner.alt"
              placeholder="Banner Alt Text"
              className="input-base mt-1"
            />
            {errors.banner?.alt && (
              <ErrorMessage message={errors.banner.alt.message} />
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <label htmlFor="venueManager" className="label-base">
            Venue Manager:
          </label>
          <input
            type="checkbox"
            {...register('venueManager')}
            id="venueManager"
            className="checkbox mt-1"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <Button type="primary" onClick={() => {}}>
            Update Profile
          </Button>
          <Button type="red" onClick={() => onClose(false)}>
            Cancel
          </Button>
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
