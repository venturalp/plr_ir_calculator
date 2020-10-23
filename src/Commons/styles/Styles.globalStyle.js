export const GlobalStylesMUI = theme => ({
  '@global': {
    html: {
      height: '100%',
      overflowX: 'hidden',
    },
    body: {
      color: theme.palette.text.main,
      height: '100%',
      '& #app': {
        height: '100%',
      },
    },
    textarea: {
      fontSize: '1rem',
      lineHeight: '1.188rem',
      borderRadius: '2px',
      backgroundColor: theme.palette.common.white,
      outlineColor: theme.palette.primary.main,
      borderColor: theme.custom.inputBorders,
      padding: '12px 15px',
      fontFamily: 'Roboto, sans-serif',
      '&:disabled': {
        backgroundColor: theme.custom.form.disabledBackground,
      },
    },
  },
})

export default GlobalStylesMUI
