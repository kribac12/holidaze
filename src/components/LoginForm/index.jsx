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
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p>{errors.email?.message}</p>
      <input
        {...register('password')}
        type="password"
        placeholder="Password"
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p>{errors.password?.message}</p>
      <button
        type="submit"
        className="bg-primary text-white font-bold py-2 px-8  rounded hover:bg-red-700"
      >
        Login
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default LoginForm
