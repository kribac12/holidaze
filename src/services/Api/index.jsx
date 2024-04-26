import { useState, useCallback } from 'react'
import axios from 'axios'

const useApi = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const sendRequest = useCallback(async (config) => {
    setIsLoading(true)
    setIsError(false)

    try {
      const response = await axios(config)
      setData(response.data.data)
      return response.data
    } catch (error) {
      console.error('API request error:', error)
      setIsError(true)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { data, isLoading, isError, sendRequest }
}

export default useApi
