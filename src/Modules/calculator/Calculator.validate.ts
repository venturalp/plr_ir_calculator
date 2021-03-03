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
  performance: yup
    .number()
    .typeError('Desempenho deve ser uma porcentagem')
    .min(0, 'Porcentagem de desempenho não pode ser negativa'),
  company: yup
    .number()
    .typeError('Desempenho da empresa deve ser uma porcentagem')
    .min(0, 'Porcentagem desempenho da empresa não pode ser negativa'),
  plrWeight: yup
    .number()
    .typeError('Peso deve ser um valor')
    .min(0, 'Peso de PLR não pode ser negativo'),
})

export const validateCalculatorForm = async <F>(
  formData: F,
): Promise<IErrorValidation> => validateData(calculatorFormScheme, formData)
