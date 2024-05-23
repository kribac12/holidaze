import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'
import ErrorMessage from '@/utils/ErrorMessage'
import Button from '@/components/Shared/Buttons'

const loginSchema = yup
  .object({
    email: yup
      .string()
      .required('Email is required')
      .email('Must be a valid email'),
    password: yup.string().required('Password is required'),
  })
  .required()

function LoginForm({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur', // Validate on blur
  })

  const onSubmit = async (data) => {
    clearErrors() // Clear previous errors on a new submission
    try {
      await onLogin(data)
    } catch (error) {
      console.error('Login failed:', error)
      setError('api', {
        type: 'manual',
        message: 'Login failed: Invalid credentials',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          {...register('email')}
          placeholder="Email"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>
      {errors.api && <ErrorMessage message={errors.api.message} />}
      <Button type="primary">Log in</Button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
