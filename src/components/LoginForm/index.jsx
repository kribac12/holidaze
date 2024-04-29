import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PropTypes from 'prop-types'

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
  } = useForm({
    resolver: yupResolver(loginSchema),
  })

  return (
    <form onSubmit={handleSubmit(onLogin)} className="space-y-4">
      <input
        {...register('email')}
        placeholder="Email"
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
      <button type="submit" className="submit-button">
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
