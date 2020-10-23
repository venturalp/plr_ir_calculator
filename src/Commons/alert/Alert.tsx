import React, { ReactNode, SyntheticEvent } from 'react'
import MuiAlert from '@material-ui/lab/Alert'
import { ColorStatus } from 'Commons/types/Types.base'

export type AlertProps = {
  onClose: (event: SyntheticEvent) => void
  severity: ColorStatus
  children: ReactNode
}

export const Alert = (props: AlertProps) => (
  <MuiAlert elevation={6} variant="filled" {...props} />
)
