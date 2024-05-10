import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'

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
      .email('Email must be a valid email')
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
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmitWrapper = async (data) => {
    try {
      await onSubmit(data)
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          setError(err.path[0], { type: 'server', message: err.message })
        })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper)} className="space-y-4">
      <input
        {...register('name')}
        placeholder="Username"
        className="input-field"
      />
      <p>{errors.name?.message}</p>
      <input
        {...register('email')}
        placeholder="Email (stud.noroff.no)"
        className="input-field"
      />
      <p>{errors.email?.message}</p>
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="input-field"
      />
      <p>{errors.password?.message}</p>
      <textarea
        {...register('bio')}
        placeholder="Bio"
        className="input-field"
      />
      <p>{errors.bio?.message}</p>
      <input
        {...register('avatar.url')}
        placeholder="Avatar URL"
        className="input-field"
      />
      <input
        {...register('avatar.alt')}
        placeholder="Avatar Alt Text"
        className="input-field"
      />
      <input
        {...register('banner.url')}
        placeholder="Banner URL"
        className="input-field"
      />
      <input
        {...register('banner.alt')}
        placeholder="Banner Alt Text"
        className="input-field"
      />
      <div className="flex flex-row gap-4 items-center">
        <label>
          <input
            {...register('venueManager')}
            type="checkbox"
            className="me-2"
          />
          Register as a Venue Manager
        </label>
        <button
          type="submit"
          className="bg-primary text-white font-bold py-2 px-8  rounded hover:bg-red-700"
        >
          Register
        </button>
      </div>
    </form>
  )
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default RegisterForm
