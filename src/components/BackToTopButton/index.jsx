import { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa6'

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className=" flex rounded-full bg-primary p-2 text-white shadow-lg transition duration-300 hover:bg-secondary"
        >
          <p>To top</p>
          <FaArrowUp className="h-6 w-6 " />
        </button>
      )}
    </div>
  )
}

export default BackToTopButton
