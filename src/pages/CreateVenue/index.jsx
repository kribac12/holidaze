import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// Validation schema using Yup
const venueSchema = Yup.object().shape({
  name: Yup.string().required('Venue name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .typeError('Price must be a number')
    .positive('Price must be greater than zero')
    .required('Price is required'),
  maxGuests: Yup.number()
    .typeError('Maximum guests must be a number')
    .positive('Must be at least one guest')
    .integer('Must be an integer')
    .required('Maximum guests is required'),
  wifi: Yup.boolean(),
  parking: Yup.boolean(),
  breakfast: Yup.boolean(),
  pets: Yup.boolean(),
  address: Yup.string(),
  city: Yup.string(),
  zip: Yup.string(),
  country: Yup.string(),
  continent: Yup.string(),
  lat: Yup.number(),
  lng: Yup.number(),
})

const CreateVenueForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(venueSchema),
  })

  const onSubmit = (data) => {
    console.log('Form Data:', data)

    alert('Check console for form submission data')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Venue Name
        </label>
        <input
          {...register('name')}
          id="name"
          placeholder="Venue Name"
          className="input"
        />
        <p className="text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          id="description"
          placeholder="Description"
          className="textarea"
        />
        <p className="text-red-500">{errors.description?.message}</p>
      </div>

      <div>
        <label htmlFor="price" className="block mb-2">
          Price
        </label>
        <input
          {...register('price')}
          id="price"
          placeholder="Price"
          type="number"
          className="input"
        />
        <p className="text-red-500">{errors.price?.message}</p>
      </div>

      <div>
        <label htmlFor="maxGuests" className="block mb-2">
          Maximum Guests
        </label>
        <input
          {...register('maxGuests')}
          id="maxGuests"
          placeholder="Maximum Guests"
          type="number"
          className="input"
        />
        <p className="text-red-500">{errors.maxGuests?.message}</p>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="wifi" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('wifi')}
              id="wifi"
              className="checkbox"
            />
            <span className="ml-2">WiFi</span>
          </label>
        </div>

        <div>
          <label htmlFor="parking" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('parking')}
              id="parking"
              className="checkbox"
            />
            <span className="ml-2">Parking</span>
          </label>
        </div>

        <div>
          <label htmlFor="breakfast" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('breakfast')}
              id="breakfast"
              className="checkbox"
            />
            <span className="ml-2">Breakfast</span>
          </label>
        </div>

        <div>
          <label htmlFor="pets" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('pets')}
              id="pets"
              className="checkbox"
            />
            <span className="ml-2">Pets Allowed</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark"
      >
        Create Venue
      </button>
    </form>
  )
}

export default CreateVenueForm
