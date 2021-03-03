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
import { validateCalculatorForm } from './Calculator.validate'
import currency from 'currency.js'
import { irPlrTable, Aliquota } from './Calculator.Consts'

interface FormError {
  error?: boolean
  message?: string
}

interface CalcResults {
  netValue: number
  aliquota: number
  deduction: number
}

interface CalculatorFormErrors {
  monthsWorked?: FormError
  grossSalary?: FormError
  plrWeight?: FormError
  performance?: FormError
  company?: FormError
}

interface ICalculatorForm extends GenericObject {
  monthsWorked?: string | number
  grossSalary?: string | number
  plrWeight?: string | number
  company?: string | number
  performance?: string | number
}

interface IResults {
  netValue?: number
  grossValue?: number
  aliquota?: number
  deduceFrom?: number
  deduction?: number
  toDeduce?: number
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

export const CalculatorForm: React.FC = () => {
  const { register, handleSubmit } = useForm<UseFormMethods>()
  const [goalsFields, setGoalsFields] = useState<number | undefined>(1)
  const [errors, setErrors] = useState<CalculatorFormErrors>({})
  const [results, setResults] = useState<IResults>({})
  const classes = useStyle()

  const onSubmit = async (data: ICalculatorForm): Promise<void> => {
    setErrors({})
    const formSubmit: ICalculatorForm = {
      monthsWorked: parseInt(data?.monthsWorked?.toString(), 10),
      company: revertBRL(data?.company?.toString()),
      grossSalary: revertBRL(data?.grossSalary?.toString()),
      performance: revertBRL(data?.performance?.toString()),
      plrWeight: revertBRL(data?.plrWeight?.toString()),
    }
    const validateForm = await validateCalculatorForm(formSubmit)
    if (!validateForm.isValid) setErrors(validateForm.errors)
    else {
      let netValue: number = currency(formSubmit.monthsWorked, {
        precision: 10,
      })
        .divide(12)
        .multiply(formSubmit.plrWeight)
        .multiply(formSubmit.grossSalary).value
      const performanceValue: number = currency(formSubmit.performance).divide(
        100,
      ).value
      const companyValue: number = currency(formSubmit.company).divide(100)
        .value

      netValue = currency(netValue, {
        precision: 10,
      })
        .multiply(performanceValue)
        .multiply(companyValue).value
      const getAliquota: Aliquota = irPlrTable.filter(
        (al: Aliquota): boolean => {
          if (netValue >= al.min) {
            if (al.max) {
              if (netValue <= al.max) return true
            } else {
              return true
            }
          }

          return false
        },
      )?.[0]

      const deduceFrom: number = currency(netValue, {
        precision: 10,
      }).multiply(getAliquota.percent).value
      const toDeduce: number = currency(deduceFrom, {
        precision: 10,
      }).subtract(getAliquota.deduction).value
      setResults({ ...results, grossValue: netValue })
      netValue = currency(netValue, {
        precision: 10,
      }).subtract(toDeduce).value

      setResults((previous: IResults) => ({
        ...previous,
        aliquota: currency(getAliquota.percent, { precision: 3 }).multiply(100)
          .value,
        deduceFrom,
        toDeduce,
        deduction: getAliquota.deduction,
        netValue,
      }))
    }
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
          <Grid item xs={2}>
            <FormControl error={errors?.plrWeight?.error} fullWidth>
              <FormLabel htmlFor="plrWeight">Peso</FormLabel>
              <TextField
                id="plrWeight"
                name="plrWeight"
                placeholder="ex: 1,25"
                inputRef={register}
                error={errors?.plrWeight?.error}
              />
              <FormHelperText error={errors?.plrWeight?.error}>
                {errors?.plrWeight?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl error={errors?.grossSalary?.error} fullWidth>
              <FormLabel htmlFor="grossSalary">Salário bruto</FormLabel>
              <TextField
                id="grossSalary"
                inputRef={register}
                error={errors?.grossSalary?.error}
                placeholder="ex: 1000,00"
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
          <Grid item xs={2}>
            <FormControl error={errors?.plrWeight?.error} fullWidth>
              <FormLabel htmlFor="plrWeight">Empresa</FormLabel>
              <TextField
                id="company"
                inputRef={register}
                error={errors?.company?.error}
                placeholder="ex: 98,5"
                InputProps={{
                  id: 'company',
                  name: 'company',
                  inputComponent: InputBRLMask,
                  endAdornment: (
                    <InputAdornment position="end" disableTypography>
                      %
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error={errors?.company?.error}>
                {errors?.company?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl error={errors?.performance?.error} fullWidth>
              <FormLabel htmlFor="performance">Desempenho</FormLabel>
              <TextField
                id="performance"
                name="performance"
                placeholder="ex: 1,25"
                inputRef={register}
                error={errors?.performance?.error}
                InputProps={{
                  id: 'performance',
                  name: 'performance',
                  inputComponent: InputBRLMask,
                  endAdornment: (
                    <InputAdornment position="end" disableTypography>
                      %
                    </InputAdornment>
                  ),
                }}
              />
              <FormHelperText error={errors?.performance?.error}>
                {errors?.performance?.message}
              </FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid>
            {Object.keys(errors).map((key: any) => (
              <FormHelperText className="feedback-error" error>
                {errors[key].message}
              </FormHelperText>
            ))}
          </Grid>
          <Grid>
            {Object.keys(results).length > 0 && (
              <>
                <Typography variant="h2">Cálculo</Typography>
                <Typography>
                  <b style={{ color: 'blue' }}>Valor bruto:</b>{' '}
                  {currency(results.grossValue).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}
                </Typography>
                <Typography>
                  <b>Alíquota:</b>{' '}
                  {currency(results.aliquota).format({
                    pattern: '# !',
                    symbol: '%',
                    decimal: ',',
                    separator: '.',
                  })}
                </Typography>
                <Typography>
                  <b>Deduzir de:</b>{' '}
                  {currency(results.grossValue).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}{' '}
                  x{' '}
                  {currency(results.aliquota).format({
                    pattern: '# !',
                    symbol: '%',
                    decimal: ',',
                    separator: '.',
                  })}{' '}
                  ={' '}
                  {currency(results.deduceFrom).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}
                </Typography>
                <Typography>
                  <b>Alíquota a Deduzir:</b>{' '}
                  {currency(results.deduction).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}
                </Typography>
                <Typography>
                  <b style={{ color: 'red' }}>Deduzir do valor bruto:</b>{' '}
                  {currency(results.toDeduce).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}
                </Typography>
                <Typography>
                  <b style={{ color: 'green' }}>Valor líquido:</b>{' '}
                  {currency(results.netValue).format({
                    decimal: ',',
                    separator: '.',
                    precision: 2,
                    symbol: 'R$ ',
                  })}
                </Typography>
              </>
            )}
          </Grid>
          <Grid container justify="center">
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
