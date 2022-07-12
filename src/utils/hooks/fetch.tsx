import { useState, useEffect } from 'react'
import { HTTPMethod } from 'models/Fetch'

export const useFetch = (
  url: string,
  method: HTTPMethod = HTTPMethod.GET,
  headers: Headers = new Headers({ Authorization: `Bearer ${sessionStorage.getItem('jwt')}` })
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<Record<string, any>>({})

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    setIsLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(url, { method, headers })
        setData(await response.json())
      } catch (err) {
        console.log(err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { isLoading, data, error }
}
