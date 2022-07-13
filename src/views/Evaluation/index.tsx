/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { TextField } from '@mui/material'

import { useNavigate } from 'react-router-dom'

import JWT from 'jwt-decode'

const steps = [
  {
    label: 'Consignes',
    description: `Bienvenue sur le challenge SHELL ! Vous allez configurer et déployer votre
    propre instance Ubuntu, et renseigner les coordonnées de connexion sur cette page. Ce système
    va executer un certain nombre de tests selon les critères listés ici. Votre scrore sera
    calculé automatiquement.
    
    Attention ! Utilisez une instance de déploiement dédiée à cet exercice. Le système est 
    susceptible d'engendrer une perte de donneés.`
  },
  {
    label: 'Identité',
    description: 'Merci de renseigner votre nom et prénom'
  },
  {
    label: 'Votre API',
    description: `Fournissez le endpoint de votre API`
  },
  {
    label: 'Continuer',
    description: ``
  }
]

export default function Evaluation() {
  const token = localStorage.getItem('token')
  const decryptedJwt = JWT(token as string) as { body: any }
  const email = decryptedJwt.body.email
  console.log(decryptedJwt)
  const navigate = useNavigate()

  const createInstanceForUser = async (): Promise<void> => {
    console.log(token)
    try {
      const response = await fetch('http://51.15.208.76:5050/instance', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'auth-token': token as string
        },
        body: JSON.stringify({ userEmail: email, ipAddress: endpoint })
      })
      navigate('/challenge/1/1')
    } catch (error) {
      console.error(error)
    }
  }

  const [activeStep, setActiveStep] = React.useState(0)

  const [lastName, setLastName] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [endpoint, setEndpoint] = React.useState('')

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}>
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>

              {index === 1 && (
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="Nom"
                    variant="outlined"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Prénom"
                    variant="outlined"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Box>
              )}

              {index === 2 && (
                <Box>
                  <TextField
                    id="outlined-basic"
                    label="API Endpoint"
                    variant="outlined"
                    onChange={(e) => setEndpoint(e.target.value)}
                  />
                </Box>
              )}

              {index === 3 && (
                <Box>
                  <Button variant="contained" onClick={createInstanceForUser}>
                    Continuer
                  </Button>
                </Box>
              )}

              {index !== 3 && (
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                      Continuer
                    </Button>
                    {/* <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button> */}
                  </div>
                </Box>
              )}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}
