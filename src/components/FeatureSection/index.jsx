import campingImage from '@/assets/images/camping.jpg'
import useStore from '@/store'
import Button from '../Shared/Buttons'

function FeatureSection() {
  const openModal = useStore((state) => state.openModal)

  const handleRegisterClick = () => {
    openModal(true)
  }

  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div>
          <h1 className="font-h1 text-h1">
            Should your home be <strong>holidazed?</strong>
          </h1>
          <p className="mt-2">
            With only a few steps, you can make money on your home too.
          </p>
        </div>
        <div className="relative w-full h-auto max-w-xl mx-auto">
          <img src={campingImage} alt="Camping" className="w-full h-auto" />
          <div className="absolute inset-0 bg-white opacity-50"></div>
          <Button
            type="primary"
            onClick={handleRegisterClick}
            size="small"
            className="absolute bottom-20 left-1/2 transform -translate-x-1/2 md:py-3 md:px-8"
          >
            Register Here
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FeatureSection
