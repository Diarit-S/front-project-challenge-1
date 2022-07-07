import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const login = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${searchParams.get('jwt')}`
        }
      })
      const responseData = await response.json()
      const { status, statusCode, token, refreshToken } = responseData
      localStorage.setItem('refreshToken', refreshToken)
      localStorage.setItem('toek', token)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    login()
  }, [])

  return (
    <div>
      <p>{searchParams.get('jwt')}</p>
    </div>
  )
}

export default Auth
