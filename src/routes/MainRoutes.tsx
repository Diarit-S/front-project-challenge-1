import React from 'react'

import { lazy } from 'react'

// project imports
import MainLayout from 'layouts/MainLayout'
import Loadable from 'components/Loadable'

// dashboard routing
const Login = Loadable(lazy(() => import('views/Login')))
const Register = Loadable(lazy(() => import('views/Register')))
const Evaluation = Loadable(lazy(() => import('views/Evaluation')))

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/evaluation',
      element: <Evaluation />
    }
  ]
}

export default MainRoutes
