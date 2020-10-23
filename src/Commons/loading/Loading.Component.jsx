import React from 'react'
import { Backdrop, CircularProgress } from '@material-ui/core'

export const Loading = () => (
  <Backdrop open style={{ zIndex: 9999 }}>
    <CircularProgress color="primary" />
  </Backdrop>
)
