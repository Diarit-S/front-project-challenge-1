import { Outlet } from 'react-router-dom'

import ResponsiveAppBar from 'components/ResponsiveAppBar'

import React from 'react'
import { Box } from '@mui/material'

const MainLayout = () => {
  return (
    <main>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Box
        sx={{
          backgroundColor: '#323259',
          padding: '20px',
          marginTop: '50px',
          width: 'fit-content'
        }}>
        <Outlet />
      </Box>
    </main>
  )
}

export default MainLayout
