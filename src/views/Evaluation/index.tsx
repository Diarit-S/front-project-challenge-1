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
    label: 'Votre instance',
    description: `Configurez votre instance et accordez l'accès à l'utiliseur identifié par la clé
    publique suivante :`
  },
  {
    label: 'Testez votre connexion',
    description: ``
  }
]

export default function Evaluation() {
  const [activeStep, setActiveStep] = React.useState(0)

  const [lastName, setLastName] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [instanceIpAddress, setInstanceIpAddress] = React.useState('')
  const [instanceUserName, setInstanceUserName] = React.useState('')

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
                  <textarea style={{ resize: 'none' }} readOnly>
                    Test
                  </textarea>
                  <Typography>Précisez les coordonnées d&apos;accès ici</Typography>
                  <TextField
                    id="outlined-basic"
                    label="Adresse IP"
                    variant="outlined"
                    onChange={(e) => setInstanceIpAddress(e.target.value)}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Utilisateur"
                    variant="outlined"
                    onChange={(e) => setInstanceUserName(e.target.value)}
                  />
                </Box>
              )}

              {index === 3 && (
                <Box>
                  <Button variant="contained">Testez !</Button>
                </Box>
              )}

              <Box sx={{ mb: 2 }}>
                <div>
                  <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button disabled={index === 0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                    Back
                  </Button>
                </div>
              </Box>
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
