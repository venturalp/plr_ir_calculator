import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import { InputBRLMask } from 'Commons/form/Form.InputBRLMask'
import React, { useState } from 'react'
import { useForm, UseFormMethods } from 'react-hook-form'

interface CalculatorFormType {
  teste?: boolean
}

interface FormError {
  error?: boolean
  message?: string
}

interface CalculatorFormErrors {
  monthsWorked?: FormError
  grossSalary?: FormError
}

const useStyle: () => any = makeStyles({
  paper: {
    padding: '30px 50px',
    width: '760px',
    maxWidth: '90%',
    '& h2': {
      marginBottom: '35px',
    },
    '& .MuiButton-root': {
      marginTop: '35px',
    },
  },
})

export const CalculatorForm = ({ teste, ...props }: CalculatorFormType) => {
  const { register, handleSubmit } = useForm<UseFormMethods>()
  const [errors, setErrors] = useState<CalculatorFormErrors>({})
  const classes = useStyle()

  const onSubmit = (data: any): void => {
    console.log(data)
  }

  return (
    <Paper className={classes.paper}>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        justify="center"
        container
      >
        <Typography variant="h2">Caluladora de PLR</Typography>
        <Grid
          container
          alignContent="center"
          justify="space-between"
          spacing={2}
        >
          <Grid item xs={5}>
            <FormControl error={errors?.monthsWorked?.error} fullWidth>
              <FormLabel htmlFor="monthsWorked">Meses trabalhados</FormLabel>
              <TextField
                id="monthsWorked"
                name="monthsWorked"
                type="number"
                placeholder="0"
                inputRef={register}
                error={errors?.monthsWorked?.error}
              />
              <FormHelperText error={errors?.monthsWorked?.error}>
                {errors?.monthsWorked?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={7}>
            <FormControl error={errors?.grossSalary?.error} fullWidth>
              <FormLabel htmlFor="grossSalary">Salário bruto</FormLabel>
              <TextField
                id="grossSalary"
                inputRef={register}
                error={errors?.grossSalary?.error}
                InputProps={{
                  id: 'grossSalary',
                  name: 'grossSalary',
                  defaultValue: 0,
                  inputComponent: InputBRLMask,
                  startAdornment: (
                    <InputAdornment position="start" disableTypography>
                      R$
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error={errors?.grossSalary?.error}>
                {errors?.grossSalary?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Button>Calcular</Button>
      </Grid>
    </Paper>
  )
}

/*
  Salario Bruto
  Meses trabalhados
  Metas {
    minimo,
    media,
    maximo,
    atingido
  }

*/
