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
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    [token, apiKey]
  )

  return { data, isLoading, isError, sendRequest }
}

export default useApi
