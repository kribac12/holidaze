import { useState, useCallback } from 'react'
import axios from 'axios'

const useApi = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [auth, setAuth] = useState({ token: '', apiKey: '' })

  const sendRequest = useCallback(
    async ({ url, method = 'get', data = null, headers = {} }) => {
      setIsLoading(true)
      setIsError(false)

      try {
        const response = await axios({
          url,
          method,
          data,
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'X-Noroff-API-Key': auth.apiKey,
            ...headers,
          },
        })
        setData(response.data.data)
        return response.data
      } catch (error) {
        console.error('API request error:', error)
        setIsError(true)
        return error.response
      } finally {
        setIsLoading(false)
      }
    },
    [auth]
  )

  return { data, isLoading, isError, sendRequest, setAuth }
}

export default useApi
