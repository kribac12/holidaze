import useStore from '@/store'

async function fetchApiKey(token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  }

  try {
    const response = await fetch(
      'https://v2.api.noroff.dev/auth/create-api-key',
      requestOptions
    )
    const data = await response.json()

    if (response.ok) {
      useStore.getState().setAuth({ apiKey: data.data.key })
      return data.data.key
    } else {
      console.error('API key creation failed:', data)
      throw new Error(
        `Failed to fetch API key: ${data.errors ? data.errors.map((e) => e.message).join(', ') : 'Server error'}`
      )
    }
  } catch (error) {
    console.error('Error fetching API key:', error)
    throw error
  }
}

export { fetchApiKey }
