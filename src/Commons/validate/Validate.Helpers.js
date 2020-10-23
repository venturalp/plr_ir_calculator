export const hasError = (propName, errors = {}) =>
  Boolean(errors?.[propName] && errors?.[propName] != '')

export const getQueryParam = (query = '', param = '') => {
  const tryRegex = query.match(new RegExp(`\\*?${param}=[^&]*`, 'gmi'))

  return tryRegex ? tryRegex[0].split('=')[1] : false
}

export const validateData = async (schema, formData) => {
  let errorsList
  const validateResponse = await schema
    .validate(formData, {
      abortEarly: false,
    })
    .catch(err => {
      errorsList = err.inner.reduce(
        (errors, currentError) => ({
          ...errors,
          [currentError.path]: currentError.errors[0],
        }),
        {},
      )
    })

  if (!validateResponse) return { isValid: false, errors: errorsList }

  return { isValid: true }
}
