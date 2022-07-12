import React, { useEffect } from 'react'

import { useSearchParams } from 'react-router-dom'

const Auth = () => {
  const [searchParams] = useSearchParams()

  const login = async (): Promise<void> => {
    try {
      const response = await fetch('https://51.15.208.76:5050/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `auth-token ${searchParams.get('jwt')}`
        }
      })
      const responseData = await response.json()
      const { token, refreshToken } = responseData
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
