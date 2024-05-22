import { useEffect, useState, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { useParams, useNavigate } from 'react-router-dom'
import useApi from '@/services/Api'
import useStore from '@/store'
import ErrorMessage from '@/lib/ErrorMessage'
import Notification from '@/components/Notifications'
import Button from '@/lib/Buttons'

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

  media: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string()
          .url('Must be a valid URL')
          .required('URL is required'),
        alt: Yup.string(),
      })
    )
    .min(1, 'At least one media entry is required'),
  wifi: Yup.boolean(),
  parking: Yup.boolean(),
  breakfast: Yup.boolean(),
  pets: Yup.boolean(),
  address: Yup.string().nullable(),
  zip: Yup.string().nullable(),
  country: Yup.string().nullable(),
})

const CreateVenueForm = () => {
  const { venueId } = useParams()
  const navigate = useNavigate()
  const { sendRequest } = useApi()
  const { notification, setNotification, clearNotification } = useStore(
    (state) => ({
      notification: state.notification,
      setNotification: state.setNotification,
      clearNotification: state.clearNotification,
    })
  )
  const [showAdditional, setShowAdditional] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(venueSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'media',
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
            'media',
            'wifi',
            'parking',
            'breakfast',
            'pets',
            'address',
            'zip',
            'country',
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
      },
      meta: {
        wifi: data.wifi,
        parking: data.parking,
        breakfast: data.breakfast,
        pets: data.pets,
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
      setNotification({
        message: `Venue ${venueId ? 'updated' : 'created'} successfully!`,
        type: 'success',
      })
      reset()
      navigate(`/venues/${response.data.id}`, {
        state: {
          message: `Venue ${venueId ? 'updated' : 'created'} successfully!`,
          type: 'success',
        },
      })
    } catch (error) {
      console.error(`Failed to ${venueId ? 'update' : 'create'} venue:`, error)
      setNotification({
        message: `Error ${venueId ? 'updating' : 'creating'} venue. Please try again.`,
        type: 'error',
      })
    }
  }

  const clearNotificationCallback = useCallback(() => {
    clearNotification()
  }, [clearNotification])

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-8 p-4 bg-white shadow-md rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-1">
              Venue Name
            </label>
            <input
              {...register('name')}
              id="name"
              placeholder="Venue Name"
              className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
            />
            {errors.name && <ErrorMessage message={errors.name.message} />}
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
            {errors.price && <ErrorMessage message={errors.price.message} />}
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
              className="textarea border-primary focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              rows="4"
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
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
            {errors.maxGuests && (
              <ErrorMessage message={errors.maxGuests.message} />
            )}
          </div>
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Media</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex items-center space-x-2 mb-2">
              <input
                {...register(`media.${index}.url`)}
                placeholder="Media URL"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
              <input
                {...register(`media.${index}.alt`)}
                placeholder="Alt text(optional)"
                className="input border-gray-300 focus:border-primary focus:ring-primary rounded-lg p-2 w-full"
              />
              <Button type="red" onClick={() => remove(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button type="extra" onClick={() => append({ url: '', alt: '' })}>
            Add Media
          </Button>
          {errors.media && errors.media.message && (
            <ErrorMessage message={errors.media.message} />
          )}
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
              <span className="ml-2 text-sm text-secondaryText">
                {' '}
                (Optional)
              </span>
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
                <label
                  htmlFor="zip"
                  className="block text-lg font-semibold mb-1"
                >
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
            </div>
          )}
        </div>

        <Button type="primary" disabled={isSubmitting}>
          {venueId ? 'Update Venue' : 'Create Venue'}
        </Button>
      </form>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onDismiss={clearNotificationCallback}
        />
      )}
    </div>
  )
}

export default CreateVenueForm
