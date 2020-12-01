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
import {
  validateCalculatorForm,
  validateCalculatorGoals,
} from './Calculator.validate'

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
  plrWeight?: FormError
  goals?: Array<any>
}

interface ICalculatorInputs {
  minimum?: number | string
  target?: number | string
  maximum?: number | string
}

interface ICalculatorForm extends GenericObject {
  monthsWorked?: number | string
  grossSalary?: string | number
  plrWeight?: string | number
  goals?: {
    values: Array<ICalculatorInputs>
    scale: Array<ICalculatorInputs>
    achieved?: number | string
  }
}

const useStyle = makeStyles((theme: Theme) => ({
  paper: {
    margin: '30px 0',
    padding: '30px 50px',
    width: '900px',
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
    marginTop: '16px',
    '& .MuiFormLabel-root': {
      fontSize: theme.typography.pxToRem(13),
      paddingBottom: '4px',
    },
    '&>div': {
      maxWidth: 'calc(100% / 8)',
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
      monthsWorked: data.monthsWorked
        ? parseInt(data.monthsWorked as string, 10)
        : 0,
      plrWeight: data.plrWeight ? parseFloat(data.plrWeight as string) : 0,
      goals: [],
    }

    new Array(goalsFields).fill(null).forEach((el: any, index: number) => {
      formData.goals.push({
        minimum: data?.[`minimum${index}`]
          ? parseFloat(data?.[`minimum${index}`])
          : 0,
        average: parseFloat(data?.[`average${index}`]),
        maximum: parseFloat(data?.[`maximum${index}`]),
        achieved: parseFloat(data?.[`achieved${index}`]),
      })
    })

    console.log(await validateCalculatorForm(formData))
    console.log(await validateCalculatorGoals(formData))

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
          <Grid item xs={3}>
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
          <Grid item xs={3}>
            <FormControl error={errors?.plrWeight?.error} fullWidth>
              <FormLabel htmlFor="plrWeight">Peso</FormLabel>
              <TextField
                id="plrWeight"
                name="plrWeight"
                type="number"
                placeholder="0"
                inputRef={register}
                error={errors?.plrWeight?.error}
              />
              <FormHelperText error={errors?.plrWeight?.error}>
                {errors?.plrWeight?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
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
        <Grid container justify="space-between">
          {new Array(goalsFields).fill('goals').map((el: any, i: number) => {
            return (
              <Grid container key={`goalsWrapper${el}${i}`}>
                {/* <Grid
                  container
                  spacing={2}
                  key={`row1${el}${i}`}
                  className={classes.goalsRow}
                >

                </Grid> */}
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
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.weight?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`weight${i}`}>Peso</FormLabel>
                      <TextField
                        id={`weight${i}`}
                        name={`weight${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.weight?.error}
                      />
                      <FormHelperText error={errors?.goals?.[i]?.weight?.error}>
                        {errors?.goals?.[i]?.weight?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>

                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.minimumValue?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`minimumValue${i}`}>
                        Valor mínima
                      </FormLabel>
                      <TextField
                        id={`minimumValue${i}`}
                        name={`minimumValue${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.minimumValue?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.minimumValue?.error}
                      >
                        {errors?.goals?.[i]?.minimumValue?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.minimumScale?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`minimumScale${i}`}>
                        Escala mínima
                      </FormLabel>
                      <TextField
                        id={`minimumScale${i}`}
                        name={`minimumScale${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.minimumScale?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.minimumScale?.error}
                      >
                        {errors?.goals?.[i]?.minimumScale?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.targetValue?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`targetValue${i}`}>
                        Valor target
                      </FormLabel>
                      <TextField
                        id={`targetValue${i}`}
                        name={`targetValue${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.targetValue?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.targetValue?.error}
                      >
                        {errors?.goals?.[i]?.targetValue?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.targetScale?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`targetScale${i}`}>
                        Escala target
                      </FormLabel>
                      <TextField
                        id={`targetScale${i}`}
                        name={`targetScale${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.targetScale?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.targetScale?.error}
                      >
                        {errors?.goals?.[i]?.targetScale?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.maximumValue?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`maximumValue${i}`}>
                        Valor máxima
                      </FormLabel>
                      <TextField
                        id={`maximumValue${i}`}
                        name={`maximumValue${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.maximumValue?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.maximumValue?.error}
                      >
                        {errors?.goals?.[i]?.maximumValue?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControl
                      error={errors?.goals?.[i]?.maximumScale?.error}
                      fullWidth
                    >
                      <FormLabel htmlFor={`maximumScale${i}`}>
                        Escala máxima
                      </FormLabel>
                      <TextField
                        id={`maximumScale${i}`}
                        name={`maximumScale${i}`}
                        className={classes.noIncrementInput}
                        inputRef={register}
                        error={errors?.goals?.[i]?.maximumScale?.error}
                      />
                      <FormHelperText
                        error={errors?.goals?.[i]?.maximumScale?.error}
                      >
                        {errors?.goals?.[i]?.maximumScale?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
                  <Grid item>
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
                      <FormHelperText
                        error={errors?.goals?.[i]?.achieved?.error}
                      >
                        {errors?.goals?.[i]?.achieved?.error}
                      </FormHelperText>
                    </FormControl>
                  </Grid>
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
