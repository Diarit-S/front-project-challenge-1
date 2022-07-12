import React, { useEffect, useState } from 'react'

import { ChallengeCard, Challenge } from './components/ChallengeCard'

const Admin = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([])

  const getChallenges = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('http://51.15.208.76:5050/challenges', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': JSON.stringify(token)
        }
      })
      const responseData = await response.json()
      setChallenges(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getChallenges()
  }, [])

  return (
    <div>
      <p>Im the Admin Page</p>
      {challenges.map((challenge) => (
        <ChallengeCard key={challenge.name} challenge={challenge} />
      ))}
    </div>
  )
}

export default Admin
