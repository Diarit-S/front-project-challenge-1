import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import { CssBaseline, StyledEngineProvider } from '@mui/material'

import Routes from 'routes'

import './App.css'

function App() {
  return (
    <Router>
      <StyledEngineProvider>
        <CssBaseline />
        <div className="App">
          <Routes />
        </div>
      </StyledEngineProvider>
    </Router>
  )
}

export default App
