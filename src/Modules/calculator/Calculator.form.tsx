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
  Theme,
  Typography,
} from '@material-ui/core'
import { InputBRLMask } from 'Commons/form/Form.InputBRLMask'
import { GenericObject } from 'Commons/types/Types.base'
import React, { useState } from 'react'
import { useForm, UseFormMethods } from 'react-hook-form'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { revertBRL } from './Calculator.math'

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
  goals?: Array<any>
}

interface ICalculatorGoals {
  minimum?: number | string
  average?: number | string
  maximum?: number | string
  achieved?: number | string
}

interface ICalculatorForm extends GenericObject {
  monthsWorked?: number | string
  grossSalary?: string | number
  goals?: Array<ICalculatorGoals>
}

const useStyle = makeStyles((theme: Theme) => ({
  paper: {
    padding: '30px 50px',
    width: '760px',
    maxWidth: '90%',
    '& h3': {
      marginBottom: '35px',
    },
    '& h2': {
      margin: '35px 0 16px',
    },
    '& .MuiButton-root': {
      marginTop: '35px',
    },
    '& .feedback-error': {
      textAlign: 'center',
    },
  },
  goalsRow: {
    position: 'relative',
    marginBottom: '16px',
    '&:last-child': {
      marginBottom: '0px',
    },
  },
  incrementGoals: {
    position: 'absolute',
    right: '-28px',
    width: '28px',
    height: '28px',
    fill: theme.palette.primary.main,
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
  },
  noIncrementInput: {
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '& input[type=number]': {
      backgroundColor: 'red',
      appearance: 'none',
    },
  },
}))

export const CalculatorForm = ({ teste, ...props }: CalculatorFormType) => {
  const { register, handleSubmit } = useForm<UseFormMethods>()
  const [goalsFields, setGoalsFields] = useState<number | undefined>(1)
  const [errors, setErrors] = useState<CalculatorFormErrors>({})
  const classes = useStyle()

  const onSubmit = async (data: ICalculatorForm): Promise<void> => {
    console.log(data)
    const formData: ICalculatorForm = {
      grossSalary: revertBRL(data.grossSalary as string),
      monthsWorked: parseInt(data.monthsWorked as string, 10),
      goals: [],
    }

    new Array(goalsFields).fill(null).forEach((el: any, index: number) => {
      formData.goals.push({
        minimum: parseFloat(data?.[`minimum${index}`]),
        average: parseFloat(data?.[`average${index}`]),
        maximum: parseFloat(data?.[`maximum${index}`]),
        achieved: parseFloat(data?.[`achieved${index}`]),
      })
    })

    console.log('formData', formData)
  }

  const addGoal = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setGoalsFields((previousValue: number) => previousValue + 1)
  }

  return (
    <Paper className={classes.paper}>
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        justify="center"
        container
      >
        <Typography variant="h3">Caluladora de PLR</Typography>
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
        <Typography variant="h2">Metas</Typography>
        <Grid container>
          {new Array(goalsFields).fill('goals').map((el: any, i: number) => {
            return (
              <Grid
                container
                spacing={2}
                key={`${el}${i}`}
                className={classes.goalsRow}
              >
                {i === goalsFields - 1 && (
                  <AddCircleOutlineIcon
                    className={classes.incrementGoals}
                    onClick={addGoal}
                  />
                )}
                <Grid item xs={3}>
                  <FormControl
                    error={errors?.goals?.[i]?.minimum?.error}
                    fullWidth
                  >
                    <FormLabel htmlFor={`minimum${i}`}>Mínima</FormLabel>
                    <TextField
                      id={`minimum${i}`}
                      name={`minimum${i}`}
                      className={classes.noIncrementInput}
                      inputRef={register}
                      error={errors?.goals?.[i]?.minimum?.error}
                    />
                    <FormHelperText error={errors?.goals?.[i]?.minimum?.error}>
                      {errors?.goals?.[i]?.minimum?.error}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    error={errors?.goals?.[i]?.average?.error}
                    fullWidth
                  >
                    <FormLabel htmlFor={`average${i}`}>Média</FormLabel>
                    <TextField
                      id={`average${i}`}
                      name={`average${i}`}
                      className={classes.noIncrementInput}
                      inputRef={register}
                      error={errors?.goals?.[i]?.average?.error}
                    />
                    <FormHelperText error={errors?.goals?.[i]?.average?.error}>
                      {errors?.goals?.[i]?.average?.error}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    error={errors?.goals?.[i]?.maximum?.error}
                    fullWidth
                  >
                    <FormLabel htmlFor={`maximum${i}`}>Máxima</FormLabel>
                    <TextField
                      id={`maximum${i}`}
                      name={`maximum${i}`}
                      className={classes.noIncrementInput}
                      inputRef={register}
                      error={errors?.goals?.[i]?.minimum?.error}
                    />
                    <FormHelperText error={errors?.goals?.[i]?.minimum?.error}>
                      {errors?.goals?.[i]?.minimum?.error}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl
                    error={errors?.goals?.[i]?.achieved?.error}
                    fullWidth
                  >
                    <FormLabel htmlFor={`achieved${i}`}>Alcançada</FormLabel>
                    <TextField
                      id={`achieved${i}`}
                      name={`achieved${i}`}
                      className={classes.noIncrementInput}
                      inputRef={register}
                      error={errors?.goals?.[i]?.achieved?.error}
                    />
                    <FormHelperText error={errors?.goals?.[i]?.achieved?.error}>
                      {errors?.goals?.[i]?.achieved?.error}
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            )
          })}
        </Grid>
        <Grid container justify="center">
          <Grid>
            <FormHelperText className="feedback-error" error>
              Erros aqui
            </FormHelperText>
            <Button>Calcular</Button>
          </Grid>
        </Grid>
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
