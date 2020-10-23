import React from 'react'
import { Grid, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  grid: {
    height: '100%',
    textAlign: 'center',
  },
  title: {
    marginBottom: '42px',
  },
})

export const Error404 = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className={classes.grid}
    >
      <Grid>
        <Typography variant="h3" className={classes.title}>
          Página não encontrada
        </Typography>
      </Grid>
    </Grid>
  )
}
