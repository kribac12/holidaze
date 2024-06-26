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
    mode: 'onBlur',
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
          autoComplete="email"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>
      <div>
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
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
