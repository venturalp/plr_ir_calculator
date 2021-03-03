import { createMuiTheme } from '@material-ui/core/styles'
import { baseTitle } from 'Commons/styles/Styles.base'
import GlobalStylesMUI from 'Commons/styles/Styles.globalStyle'

const materialTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#666A86',
      light: '#92B6B1',
    },
    text: {
      main: '#1E1E1E',
      secondary: '#FFF',
    },
    background: {
      default: '#DFDFDF',
    },
  },
  props: {
    MuiButton: {
      variant: 'contained',
      color: 'primary',
      type: 'submit',
    },
    MuiCheckbox: {
      color: 'primary',
    },
    MuiTextField: {
      variant: 'outlined',
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
  MuiCssBaseline: { ...GlobalStylesMUI(materialTheme) },
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
  MuiFormHelperText: {
    root: {
      '&.select-error': {
        marginLeft: '14px',
        marginTop: '3px',
      },
      '&:not(.Mui-error)': {
        color: materialTheme.palette.success.main,
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
        borderColor: materialTheme.palette.primary.main,
      },
    },
  },
}

export { materialTheme }
