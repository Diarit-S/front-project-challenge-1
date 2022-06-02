import { Suspense } from 'react'

// project imports
import Loader from './Loader'

import React from 'react'

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

// eslint-disable-next-line react/display-name
export const Loadable = (Component: React.ComponentType) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )

export default Loadable
