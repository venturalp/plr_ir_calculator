import { createMuiTheme } from '@material-ui/core/styles'
import { baseTitle } from 'Commons/styles/Styles.base'
import GlobalStylesMUI from 'Commons/styles/Styles.globalStyle'

const materialTheme = createMuiTheme({
  custom: {
    highlight: '#17D5D5',
    sidebarPadding: '114px',
    successColor: '#007E33',
    inputBorders: 'rgba(0, 0, 0, 0.23)',
    menu: {
      iconDefault: '#A2A9B0',
    },
    commonGray: '#A2A9B0',
    charts: ['#3D2892', '#17D5D5', '#2788B7'],
    form: {
      disabledBackground: '#F5F6F8',
    },
    border: {
      default: '#D8D8D8',
    },
  },
  palette: {
    primary: {
      main: '#3D2892',
      light: '#A2EEEE',
    },
    text: {
      main: '#1E1E1E',
      secondary: '#FFF',
    },
    background: {
      default: '#f5f6f8',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
    },
    MuiSelect: {
      variant: 'outlined',
    },
    MuiCheckbox: {
      color: 'primary',
    },
  },
})

materialTheme.typography = {
  ...materialTheme.typography,
  body1: {
    ...materialTheme.typography.body1,
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1rem',
    lineHeight: '1.5rem',
    letterSpacing: 0,
    color: materialTheme.palette.text.main,
  },
  body2: {
    ...materialTheme.typography.body2,
    fontFamily: 'Roboto, sans-serif',
  },
  h1: {
    color: materialTheme.palette.common.white,
    ...baseTitle,
  },
  h3: {
    color: materialTheme.palette.primary.main,
    ...baseTitle,
  },
  h2: {
    color: materialTheme.palette.primary.main,
    lineHeight: '1.5rem',
    fontSize: '1.5rem',
    letterSpacing: 0,
    fontWeight: 400,
  },
}

materialTheme.overrides = {
  ...materialTheme.overrides,
  MuiDivider: {
    root: {
      backgroundColor: materialTheme.custom.border.default,
      margin: '40px 0',
    },
  },
  MuiAutocomplete: {
    root: {
      '& .MuiFormLabel-root.Mui-error': {
        color: materialTheme.palette.text.main,
      },
    },
  },
  MuiCssBaseline: { ...GlobalStylesMUI(materialTheme) },
  MuiSelect: {
    select: {
      '&:focus': {
        backgroundColor: materialTheme.palette.common.white,
      },
    },
  },
  MuiInputBase: {
    root: {
      '&.Mui-disabled': {
        backgroundColor: materialTheme.custom.form.disabledBackground,
      },
    },
  },
  MuiButton: {
    root: {
      textTransform: 'none',
      height: '48px',
      lineHeight: '1.188rem',
      fontSize: '1rem',
      letterSpacing: 0,
      borderRadius: '3px',
      padding: '6px 28px',
    },
    outlined: {
      backgroundColor: materialTheme.palette.common.white,
    },
  },
  MuiCheckbox: {
    root: {
      borderColor: materialTheme.palette.primary.main,
      color: materialTheme.palette.primary.main,
    },
  },
  MuiPaper: {
    elevation2: {
      borderRadius: '16px',
      backgroundColor: materialTheme.palette.common.white,
      boxShadow: '0 3px 10px 0 rgba(0,0,0,0.1)',
      padding: '18px 33px',
      marginBottom: '24px',
    },
  },
  MuiFormHelperText: {
    root: {
      '&.select-error': {
        marginLeft: '14px',
        marginTop: '3px',
      },
      '&:not(.Mui-error)': {
        color: materialTheme.custom.successColor,
      },
    },
  },
  MuiOutlinedInput: {
    root: {
      height: '48px',
      fontSize: '1rem',
      lineHeight: '1.188rem',
      borderRadius: '2px',
      backgroundColor: materialTheme.palette.common.white,
      '& input': {
        borderColor: materialTheme.custom.inputBorders,
        '&::placeholder': {
          color: materialTheme.custom.inputBorders,
        },
      },
      '& svg': {
        fill: materialTheme.custom.inputBorders,
      },
    },
  },
}

export { materialTheme }
