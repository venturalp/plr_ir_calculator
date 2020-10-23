import React from 'react'
import {
  FormControl,
  Select,
  FormHelperText,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormLabel,
} from '@material-ui/core'

export const FormSelect = ({
  multiple = false,
  fullWidth,
  error,
  helperText,
  value,
  placeholder,
  options,
  idField = 'id',
  labelField = 'name',
  label,
  id = 'formSelect',
  name = 'formSelect',
  className,
  ...props
}) => {
  const renderValue = selected => {
    if (!selected || selected.length === 0) {
      return placeholder
    }

    if (multiple) {
      return `${selected.length} selecionado(s)`
    }

    return options?.filter(option => option?.[idField] === selected)[0]?.[
      labelField
    ]
  }

  return (
    <FormControl fullWidth={fullWidth} error={error} className={className}>
      {label && <FormLabel htmlFor={id}>{label}</FormLabel>}
      <Select
        fullWidth={fullWidth}
        multiple={multiple}
        displayEmpty
        input={<OutlinedInput placeholder={placeholder} />}
        renderValue={renderValue}
        value={value}
        id={id}
        name={name}
        {...props}
      >
        {!multiple && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options?.map(option =>
          multiple ? (
            <MenuItem key={option?.[idField]} value={option?.[idField]}>
              <Checkbox checked={value?.includes(option?.[idField])} />
              <ListItemText primary={option?.[labelField]} />
            </MenuItem>
          ) : (
            <MenuItem value={option?.[idField]} key={option?.[idField]}>
              {option?.[labelField]}
            </MenuItem>
          ),
        )}
      </Select>
      <FormHelperText className="select-error">{helperText}</FormHelperText>
    </FormControl>
  )
}
