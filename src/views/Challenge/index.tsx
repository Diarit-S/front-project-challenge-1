/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'

interface Question {
  question: string
  users: any
}

const Challenge = () => {
  // const [searchParams] = useSearchParams()

  const [question, setQuestion] = useState<Question | null>(null)

  // const challengeId = searchParams.get('challengeId')
  // const questionNumber = searchParams.get('questionNumber')

  const getChallengeQuestion = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    console.log(token)
    try {
      const response = await fetch('http://51.15.208.76:5050/challengeApi/1', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token as string
        }
      })
      const responseData = await response.json()
      setQuestion(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getChallengeQuestion()
  })

  if (question) {
    return (
      <Box>
        <Typography>{question.question}</Typography>
        <pre>{JSON.stringify(question.users)}</pre>
      </Box>
    )
  }

  return <p></p>
}

export default Challenge
