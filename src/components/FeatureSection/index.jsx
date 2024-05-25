import { useEffect } from 'react'
import campingImage from '@/assets/images/camping.jpg'
import { preloadImage } from '@/utils/PreloadImage'
import useStore from '@/store'
import Button from '../Shared/Buttons'

function FeatureSection() {
  const openModal = useStore((state) => state.openModal)

  useEffect(() => {
    preloadImage(campingImage)
  }, [])

  const handleRegisterClick = () => {
    openModal(true)
  }

  return (
    <div className="w-full">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-4 py-8 md:grid-cols-2">
        <div>
          <h1 className="text-h1 font-h1">
            Should your home be <strong>holidazed?</strong>
          </h1>
          <p className="mt-2">
            With only a few steps, you can make money on your home too.
          </p>
        </div>
        <div className="relative mx-auto h-auto w-full max-w-xl">
          <img src={campingImage} alt="Camping" className="h-600 w-400" />
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <Button
            type="primary"
            onClick={handleRegisterClick}
            size="small"
            className="absolute bottom-20 left-1/2 -translate-x-1/2 transform md:px-8 md:py-3"
          >
            Register Here
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
