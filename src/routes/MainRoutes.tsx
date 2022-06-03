import React from 'react'

import { lazy } from 'react'

// project imports
import MainLayout from 'layouts/MainLayout'
import Loadable from 'components/Loadable'

// dashboard routing
const Login = Loadable(lazy(() => import('views/Login')))


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    }
  ]
}

export default MainRoutes
