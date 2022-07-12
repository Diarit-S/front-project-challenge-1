import React from 'react'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography
} from '@mui/material'

// third party
import * as Yup from 'yup'
import { Formik } from 'formik'

// assets
import Alert from '@mui/material/Alert'

//utils
import { getErrorMessage } from 'utils/errors'

const Login = () => {
  const login = async (email: string): Promise<void> => {
    // const { email } = credentials
    // const auth = window.btoa(`${email}:${password}`)
    // const myHeaders = new Headers({ Authorization: `Basic ${auth}` })
    // const requestConfig = { headers: myHeaders }
    try {
      const response = await fetch('http://51.15.208.76:5050/auth/sendMail', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ email })
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          email: ''
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required('Email is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email)
            setStatus({ success: true })
            setSubmitting(false)
          } catch (err) {
            console.error(err)
            setStatus({ success: false })
            setErrors({ email: getErrorMessage(err) })
            setSubmitting(false)
          }
        }}>
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
              <InputLabel htmlFor="outlined-adornment-phone-login" sx={{ color: 'white' }}>
                Email
              </InputLabel>
              <OutlinedInput
                sx={{ color: 'white' }}
                id="outlined-adornment-phone-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address / Username"
                inputProps={{}}
              />
              {touched.email && errors.email && (
                <FormHelperText error id="standard-weight-helper-text-phone-login">
                  {errors.email}
                </FormHelperText>
              )}
            </FormControl>

            {errors.email && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.email}</FormHelperText>
              </Box>
            )}

            <Alert severity="info" sx={{ mt: 2, textAlign: 'left' }}>
              Consultez votre boite mail pour récupérer votre lien magique ! Le lien sera valide
              <br />
              pendant une durée de 5 minutes.
            </Alert>

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary">
                Récupérer mon magik link
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  )
}

export default Login
