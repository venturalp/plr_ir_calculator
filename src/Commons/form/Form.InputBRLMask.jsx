import React from 'react'
import NumberFormat from 'react-number-format'

export const InputBRLMask = ({ inputRef, onChange, ...props }) => (
  <NumberFormat
    {...props}
    ref={ref => {
      inputRef(ref ? ref.inputElement : null)
    }}
    getInputRef={inputRef}
    onValueChange={values => {
      onChange({
        target: {
          name: props.name,
          value: values.value,
        },
      })
    }}
    thousandSeparator="."
    decimalSeparator=","
    fixedDecimalScale
    decimalScale={2}
    isNumericString
  />
)
