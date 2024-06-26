import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import useStore from '@/store'
import ErrorMessage from '@/utils/ErrorMessage'
import Button from '@/components/Shared/Buttons'

const schema = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(
        /^\w+$/,
        'Name must not contain special characters apart from underscores'
      ),
    email: yup
      .string()
      .required('Email is required')
      .email('Email must be a valid email address')
      .matches(/@stud.noroff.no$/, "Email must be from 'stud.noroff.no'"),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters long'),
    bio: yup.string().max(160, 'Bio must be less than 160 characters'),
    avatar: yup
      .object()
      .shape({
        url: yup.string().url('Must be a valid URL').nullable(true),
        alt: yup
          .string()
          .max(120, 'Alt text must be less than 120 characters')
          .nullable(true),
      })
      .nullable(true),
    banner: yup
      .object()
      .shape({
        url: yup.string().url('Must be a valid URL').nullable(true),
        alt: yup
          .string()
          .max(120, 'Alt text must be less than 120 characters')
          .nullable(true),
      })
      .nullable(true),
    venueManager: yup.boolean(),
  })
  .required()

function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

  const {
    setError: setStoreError,
    clearError: clearStoreError,
    errors: storeErrors,
  } = useStore()

  const [showOptionalFields, setShowOptionalFields] = useState(false)

  const onSubmitWrapper = async (data) => {
    try {
      await onSubmit(data)
      clearStoreError()
      clearErrors()
    } catch (error) {
      console.error('Submission error:', error)
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          setStoreError(err.path, err.message)
          setError(err.path, { type: 'server', message: err.message })
        })
      } else {
        setStoreError('apiError', 'Failed to submit form')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      {storeErrors.apiError && (
        <ErrorMessage
          message={storeErrors.apiError}
          onClose={() => clearStoreError('apiError')}
        />
      )}

      <input
        {...register('name', {
          onChange: () => {
            clearErrors('name')
            clearStoreError('name')
          },
        })}
        placeholder="Username"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
      />
      {errors.name && <ErrorMessage message={errors.name.message} />}

      <input
        {...register('email', {
          onChange: () => {
            clearErrors('email')
            clearStoreError('email')
          },
        })}
        placeholder="Email (stud.noroff.no)"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
      />
      {errors.email && <ErrorMessage message={errors.email.message} />}

      <input
        {...register('password', {
          onChange: () => {
            clearErrors('password')
            clearStoreError('password')
          },
        })}
        type="password"
        placeholder="Password"
        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
      />
      {errors.password && <ErrorMessage message={errors.password.message} />}

      {/* Toggle for showing optional fields */}
      <div>
        <button
          type="button"
          onClick={() => setShowOptionalFields(!showOptionalFields)}
          className="rounded bg-secondary px-4 py-2 text-black underline focus:outline-none"
        >
          {showOptionalFields ? 'Hide Optional Fields' : 'Show Optional Fields'}
        </button>
      </div>
      {showOptionalFields && (
        <div className="space-y-4">
          {/* Optional fields */}
          <p>You may add these on your profile page later</p>
          <textarea
            {...register('bio', {
              onChange: () => {
                clearErrors('bio')
                clearStoreError('bio')
              },
            })}
            placeholder="Bio(optional)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.bio && <ErrorMessage message={errors.bio.message} />}

          <input
            {...register('avatar.url', {
              onChange: () => {
                clearErrors('avatar.url')
                clearStoreError('avatar.url')
              },
            })}
            placeholder="Avatar URL (optional)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.avatar?.url && (
            <ErrorMessage message={errors.avatar.url.message} />
          )}

          <input
            {...register('avatar.alt', {
              onChange: () => {
                clearErrors('avatar.alt')
                clearStoreError('avatar.alt')
              },
            })}
            placeholder="Avatar Alt Text (optional)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.avatar?.alt && (
            <ErrorMessage message={errors.avatar.alt.message} />
          )}

          <input
            {...register('banner.url', {
              onChange: () => {
                clearErrors('banner.url')
                clearStoreError('banner.url')
              },
            })}
            placeholder="Banner URL (optional)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.banner?.url && (
            <ErrorMessage message={errors.banner.url.message} />
          )}

          <input
            {...register('banner.alt', {
              onChange: () => {
                clearErrors('banner.alt')
                clearStoreError('banner.alt')
              },
            })}
            placeholder="Banner Alt Text (optional)"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
          {errors.banner?.alt && (
            <ErrorMessage message={errors.banner.alt.message} />
          )}
          <label>
            <input
              {...register('venueManager')}
              type="checkbox"
              className="me-2 mt-4"
            />
            Become Venue Manager
          </label>
        </div>
      )}

      <Button type="primary">Register</Button>
    </form>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default RegisterForm
