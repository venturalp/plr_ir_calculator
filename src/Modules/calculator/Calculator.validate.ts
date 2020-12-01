import {
  IErrorValidation,
  validateData,
} from 'Commons/validate/Validate.Helpers'
import * as yup from 'yup'

const calculatorFormScheme: yup.ObjectSchema = yup.object().shape({
  monthsWorked: yup
    .number()
    .typeError('Meses de trabalho deve ser um número')
    .min(1, 'Escolha pelo menos 1 mês trabalhado')
    .max(12, 'Máximo 12 meses de trabalho'),
  grossSalary: yup.number().typeError('Salário bruto deve ser um número'),
})

const calculatorGoalsScheme: yup.ObjectSchema = yup.object().shape({
  goals: yup.array().of(
    yup.object().shape({
      minimum: yup
        .number()
        .typeError('Metas devem ser um número')
        .min(0, 'Metas não podem ser negativas'),
      average: yup
        .number()
        .typeError('Metas devem ser um número')
        .min(0, 'Metas não podem ser negativas'),
      maximum: yup
        .number()
        .typeError('Metas devem ser um número')
        .min(0, 'Metas não podem ser negativas'),
      achieved: yup
        .number()
        .typeError('Metas devem ser um número')
        .min(0, 'Metas não podem ser negativas'),
    }),
  ),
})

export const validateCalculatorForm = async <F extends unknown>(
  formData: F,
): Promise<IErrorValidation> => validateData(calculatorFormScheme, formData)

export const validateCalculatorGoals = async <F extends unknown>(
  formData: F,
): Promise<IErrorValidation> => validateData(calculatorGoalsScheme, formData)
