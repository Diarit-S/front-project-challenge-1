import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
// import { useSearchParams } from 'react-router-dom'

const Challenge = () => {
  // const [searchParams] = useSearchParams()

  const [question] = useState(null)

  // const challengeId = searchParams.get('challengeId')
  // const questionNumber = searchParams.get('questionNumber')

  // const getChallengeQuestion = async (): Promise<void> => {
  //   const token = localStorage.getItem('token')
  //   console.log(token)
  //   try {
  //     const response = await fetch('http://51.15.208.76:5050/challenges', {
  //       method: 'GET',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'auth-token': token as string
  //       }
  //     })
  //     const responseData = await response.json()
  //     setQuestion(responseData)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  if (question) {
    return (
      <Box>
        <Typography>{question}</Typography>
      </Box>
    )
  }

  return <p></p>
}

export default Challenge
