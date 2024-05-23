import { useState, useCallback } from 'react'
import axios from 'axios'
import useStore from '@/store'

const useApi = () => {
  const { token, apiKey } = useStore((state) => state.auth)
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const sendRequest = useCallback(
    async ({ url, method = 'get', data = null, headers = {} }) => {
      setIsLoading(true)
      setIsError(false)
      const authHeaders = {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': apiKey,
        ...headers,
      }

      try {
        const response = await axios({
          url,
          method,
          data,
          headers: authHeaders,
        })
        setData(response.data)
        return response.data
      } catch (error) {
        console.error('API request error:', error.response || error)
        setIsError(true)
        // Provide more detailed error information
        if (error.response) {
          if (error.response.status === 429) {
            // Handle rate limiting specifically
            console.error('Rate limit exceeded, please try again later')
            error.response.data.message =
              'Rate limit exceeded, please try again later'
          }
          throw error.response.data
        } else {
          throw error
        }
      } finally {
        setIsLoading(false)
      }
    },
    [token, apiKey]
  )

  const clearError = useCallback(() => {
    setIsError(false)
  }, [])

  return { data, isLoading, isError, sendRequest, clearError }
}

export default useApi
