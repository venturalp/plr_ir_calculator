import { Grid, makeStyles } from '@material-ui/core'
import React from 'react'
import { CalculatorForm } from './Calculator.form'

const useStyle = makeStyles({
  pageContainer: {
    minHeight: '100%',
  },
})

const CalculatorPage: React.FC = () => {
  const classes = useStyle()

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      alignContent="center"
      className={classes.pageContainer}
    >
      <CalculatorForm />
    </Grid>
  )
}

export { CalculatorPage }
