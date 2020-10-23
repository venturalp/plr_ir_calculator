import { ObjectSchema } from 'yup'

export const hasError = <O extends {}, P extends keyof O>(
  propName: P,
  errors: O,
): boolean => Boolean(errors?.[propName])

export interface IErrorItem {
  [key: string]: any
}

export interface IErrorValidation {
  isValid: boolean
  errors?: IErrorItem
}

export const validateData = async <F extends IErrorItem>(
  schema: ObjectSchema,
  formData: F,
): Promise<IErrorValidation> => {
  let errorsList: IErrorItem
  const validateResponse = await schema
    .validate(formData, {
      abortEarly: false,
    })
    .catch(err => {
      errorsList = err.inner.reduce(
        (errors: IErrorItem, currentError: IErrorItem) => ({
          ...errors,
          [currentError.path]: currentError.errors[0],
        }),
        {},
      )
    })

  if (!validateResponse) return { isValid: false, errors: errorsList }

  return { isValid: true }
}
