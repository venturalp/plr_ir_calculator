import React from 'react'
import { Switch, makeStyles } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  switch: {
    padding: '6px 0px',
    width: '58px',
    height: '38px',
    '& .MuiSwitch-colorSecondary': {
      '&.Mui-checked': {
        color: theme.palette.common.white,
        '&  + .MuiSwitch-track': {
          backgroundColor: props => props.fill || theme.palette.primary.main,
          opacity: 1,
        },
      },
    },
    '& .MuiSwitch-track': {
      borderRadius: '13px',
    },
    '& .MuiSwitch-switchBase': {
      padding: '9px 4px',
      '&.Mui-checked': {
        transform: 'translateX(30px)',
      },
    },
  },
}))

const CustomSwitchMemo = props => {
  const classes = useStyle(props)

  return <Switch {...props} size="medium" className={classes.switch} />
}

export const CustomSwitch = React.memo(CustomSwitchMemo)
