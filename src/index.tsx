import 'core-js/stable'
import 'core-js/features/promise'
import React from 'react'
import { render } from 'react-dom'
import App from './app'
import { materialTheme } from 'Config/Config.theme'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

export const AppWithTheme: React.FC = () => (
  <ThemeProvider theme={materialTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
)

render(<AppWithTheme />, document.getElementById('app'))
