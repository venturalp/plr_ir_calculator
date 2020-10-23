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
  },
})

export default GlobalStylesMUI
