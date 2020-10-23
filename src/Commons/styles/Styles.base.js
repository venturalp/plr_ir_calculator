import { makeStyles } from '@material-ui/core'
import { green } from '@material-ui/core/colors'

export const useButtonProgressStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: '-12px',
    marginTop: '-12px',
  },
})

export const baseTitle = {
  fontSize: '2.25rem',
  fontWeight: '300',
  lineHeight: '2.25rem',
  letterSpacing: 0,
}

export const rightIconButton = {
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
}

export const buttonBetweenContent = {
  '& .MuiButton-label': {
    justifyContent: 'space-between',
  },
}
