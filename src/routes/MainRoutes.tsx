import React from 'react'

import { lazy } from 'react'

// project imports
import MainLayout from 'layouts/MainLayout'
import Loadable from 'components/Loadable'
import { UserRole } from 'models/Auth'

// dashboard routing
const Login = Loadable(lazy(() => import('views/Login')))
const Auth = Loadable(lazy(() => import('views/Auth')))
const Register = Loadable(lazy(() => import('views/Register')))
const Evaluation = Loadable(lazy(() => import('views/Evaluation')))
const Admin = Loadable(lazy(() => import('views/Admin')))
const Promo = Loadable(lazy(() => import('views/Promo')))
const Challenge = Loadable(lazy(() => import('views/Challenge')))

import { RequireAuth } from 'layouts/RequireAuth'

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
      path: '/auth/loginLink',
      element: <Auth />
    },
    {
      path: '/admin',
      element: (
        <RequireAuth role={UserRole.ADMIN}>
          <Admin />
        </RequireAuth>
      )
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/evaluation',
      element: <Evaluation />
    },
    {
      path: '/challenge/:challengeId/:questionNumber',
      element: <Challenge />
    },
    {
      path: '/promo/:promoId/:challengeId',
      element: (
        <RequireAuth role={UserRole.ADMIN}>
          <Promo />
        </RequireAuth>
      )
    }
  ]
}

export default MainRoutes
