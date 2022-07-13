/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { Divider, Button } from '@mui/material'
import JWT from 'jwt-decode'

// import { useSearchParams } from 'react-router-dom'

interface Question {
  question: string
  users: any
}

const Challenge = () => {
  // const [searchParams] = useSearchParams()

  const [question, setQuestion] = useState<Question | null>(null)
  const [isAnswerGood, setIsAnswerGood] = useState<boolean>(false)
  const [isAnswerNotGood, setIsAnswerNotGood] = useState<boolean>(false)
  const [isApiNotWorking, setIsApiNotWorking] = useState<boolean>(false)
  const [apiResponse, setApiResponse] = useState<any>(false)
  const [error, setError] = useState<string>('')
  const token = localStorage.getItem('token')
  const decryptedJwt = JWT(token as string) as { body: any }
  const email = decryptedJwt.body.email

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

  const testAnswer = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    setIsAnswerGood(false)
    setIsApiNotWorking(false)

    console.log(token)
    try {
      const response = await fetch('http://51.15.208.76:5050/challengeApi/1', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token as string
        },
        body: JSON.stringify({ email: email })
      })
      const responseData = await response.json()
      setApiResponse(responseData)
      if (response.status === 500) {
        setIsApiNotWorking(true)
        setError(`${response.status} : ${response.statusText}`)
      } else {
        if (responseData === true) {
          setIsAnswerGood(true)
        } else {
          setIsAnswerNotGood(true)
        }
      }
      if (response) console.log(responseData)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getChallengeQuestion()
  }, [])

  if (question) {
    return (
      <Box>
        <Typography>{question.question}</Typography>
        <Divider sx={{ backgroundColor: 'white', marginTop: 4, marginBottom: 4 }} />
        <pre style={{ textAlign: 'left' }}>{JSON.stringify(question.users, null, 2)}</pre>
        {isAnswerGood && (
          <Alert sx={{ marginBottom: 2 }} severity="success">
            Bravo, vous pouvez passer à la suite
          </Alert>
        )}
        {isAnswerNotGood && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            La reponse envoyé par votre api est incorrecte :
            <pre style={{ textAlign: 'left' }}>{JSON.stringify(apiResponse, null, 2)}</pre>
          </Alert>
        )}
        {isApiNotWorking && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            Votre api ne contient pas la bonne route ou est inaccessible : {error}
          </Alert>
        )}
        <Button onClick={testAnswer} variant="contained">
          Tester
        </Button>
        {isAnswerGood && (
          <Button sx={{ marginLeft: 2 }} variant="contained">
            Continuer
          </Button>
        )}
      </Box>
    )
  }

  return <p></p>
}

export default Challenge
