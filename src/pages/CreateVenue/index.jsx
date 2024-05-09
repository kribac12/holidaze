import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useParams, useNavigate } from 'react-router-dom'
import useApi from '@/services/Api'

const venueSchema = Yup.object().shape({
  name: Yup.string().required('Venue name is required'),
  description: Yup.string().required('Description is required'),
  price: Yup.number()
    .positive('Price must be greater than zero')
    .required('Price is required'),
  maxGuests: Yup.number()
    .positive('Must be at least one guest')
    .integer('Must be an integer')
    .required('Maximum guests is required'),
  mediaUrl: Yup.string().url('Must be a valid URL'),
  mediaAlt: Yup.string(),
  wifi: Yup.boolean(),
  parking: Yup.boolean(),
  breakfast: Yup.boolean(),
  pets: Yup.boolean(),
  address: Yup.string().nullable(),
  zip: Yup.string().nullable(),
  country: Yup.string().nullable(),
  continent: Yup.string().nullable(),
  lat: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(true),
  lng: Yup.number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .nullable(true),
})

const CreateVenueForm = () => {
  const { venueId } = useParams()
  const navigate = useNavigate()
  const { sendRequest } = useApi()
  const [showAdditional, setShowAdditional] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(venueSchema),
  })

  useEffect(() => {
    if (venueId) {
      sendRequest({
        url: `https://v2.api.noroff.dev/holidaze/venues/${venueId}`,
        method: 'get',
      })
        .then((response) => {
          const fields = [
            'name',
            'description',
            'price',
            'maxGuests',
            'mediaUrl',
            'mediaAlt',
            'wifi',
            'parking',
            'breakfast',
            'pets',
            'address',
            'zip',
            'country',
            'continent',
            'lat',
            'lng',
          ]
          fields.forEach((field) => setValue(field, response.data[field]))
          setShowAdditional(true) // Automatically show additional information if editing
        })
        .catch((error) => console.error('Fetching venue data failed:', error))
    }
  }, [venueId, sendRequest, setValue])

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      location: {
        address: data.address,
        city: data.city,
        zip: data.zip,
        country: data.country,
        continent: data.continent,
        lat: data.lat,
        lng: data.lng,
      },
    }

    const url = venueId
      ? `https://v2.api.noroff.dev/holidaze/venues/${venueId}`
      : 'https://v2.api.noroff.dev/holidaze/venues'
    const method = venueId ? 'put' : 'post'

    try {
      const response = await sendRequest({
        url: url,
        method: method,
        data: formattedData,
        headers: { 'Content-Type': 'application/json' },
      })
      alert(`Venue ${venueId ? 'updated' : 'created'} successfully!`)
      reset()
      navigate(`/venues/${response.data.id}`)
    } catch (error) {
      console.error(`Failed to ${venueId ? 'update' : 'create'} venue:`, error)
      alert(
        `Error ${venueId ? 'updating' : 'creating'} venue. Please try again.`
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-4 bg-white shadow-md rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-lg  font-semibold mb-1">
            Venue Name
          </label>
          <input
            {...register('name')}
            id="name"
            placeholder="Venue Name"
            className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
          />
          <p className="text-red-500 text-sm mt-1">{errors.name?.message}</p>
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-semibold mb-1">
            Price
          </label>
          <input
            {...register('price')}
            id="price"
            placeholder="Price"
            type="number"
            className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
          />
          <p className="text-red-500 text-sm mt-1">{errors.price?.message}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            {...register('description')}
            id="description"
            placeholder="Description"
            className="textarea border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
            rows="4"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.description?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="maxGuests"
            className="block text-lg font-semibold mb-1"
          >
            Maximum Guests
          </label>
          <input
            {...register('maxGuests')}
            id="maxGuests"
            placeholder="Maximum Guests"
            type="number"
            className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.maxGuests?.message}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="mediaUrl"
            className="block text-lg font-semibold mb-1"
          >
            Media URL{' '}
            <span className="text-sm font-normal text-secondaryText">
              (Optional)
            </span>
          </label>
          <input
            {...register('mediaUrl')}
            id="mediaUrl"
            placeholder="https://example.com/photo.jpg"
            className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
          />
          <p className="text-red-500 text-sm mt-1">
            {errors.mediaUrl?.message}
          </p>
        </div>

        <div>
          <label
            htmlFor="mediaAlt"
            className="block text-lg font-semibold mb-1"
          >
            Media Description{' '}
            <span className="text-sm font-normal text-secondaryText">
              (Optional)
            </span>
          </label>
          <input
            {...register('mediaAlt')}
            id="mediaAlt"
            placeholder="Describe the image"
            className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
          />
        </div>
      </div>

      <div className="flex gap-5 flex-wrap">
        <div>
          <label htmlFor="wifi" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('wifi')}
              id="wifi"
              className="checkbox mr-2"
            />
            <p className="text-lg">Wifi</p>
            <span className="ml-2 text-sm text-secondaryText"> (Optional)</span>
          </label>
        </div>

        <div>
          <label htmlFor="parking" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('parking')}
              id="parking"
              className="checkbox mr-2"
            />{' '}
            <p className="text-lg">Parking</p>
            <span className="text-sm  text-secondaryText"> (Optional)</span>
          </label>
        </div>

        <div>
          <label htmlFor="breakfast" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('breakfast')}
              id="breakfast"
              className="checkbox mr-2"
            />{' '}
            <p className="text-lg">Breakfast</p>
            <span className="text-sm text-secondaryText">(Optional)</span>
          </label>
        </div>

        <div>
          <label htmlFor="pets" className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('pets')}
              id="pets"
              className="checkbox mr-2"
            />{' '}
            <p className="text-lg">Pets Allowed</p>
            <span className="text-sm  text-secondaryText">(Optional)</span>
          </label>
        </div>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdditional(!showAdditional)}
          className="underline py-4"
        >
          {showAdditional
            ? 'No Additional Information'
            : 'Add Additional Information'}
        </button>
        {showAdditional && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <label
                htmlFor="country"
                className="block text-lg font-semibold mb-1"
              >
                Country{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('country')}
                id="country"
                placeholder="Norway"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-lg font-semibold mb-1"
              >
                Address{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('address')}
                id="address"
                placeholder="1234 Street"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="zip" className="block text-lg font-semibold mb-1">
                Zip Code{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('zip')}
                id="zip"
                placeholder="1234"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label
                htmlFor="continent"
                className="block text-lg font-semibold mb-1"
              >
                Continent{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('continent')}
                id="continent"
                placeholder="Europe"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="lat" className="block text-lg font-semibold mb-1">
                Latitude{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('lat')}
                id="lat"
                placeholder="47.1234"
                type="number"
                step="0.0001"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="lng" className="block text-lg font-semibold mb-1">
                Longitude{' '}
                <span className="text-sm font-normal text-secondaryText">
                  (Optional)
                </span>
              </label>
              <input
                {...register('lng')}
                id="lng"
                placeholder="-122.1234"
                type="number"
                step="0.0001"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
            </div>
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary-dark"
        disabled={isSubmitting}
      >
        {venueId ? 'Update Venue' : 'Create Venue'}
      </button>
    </form>
  )
}

export default CreateVenueForm
