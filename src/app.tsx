/* eslint-disable operator-linebreak */
import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes, RoutesProps } from 'Modules/router/Router.routes'
import { useApplicationStore } from 'Modules/application/Application.Store'
import { Loading } from 'Commons/loading/Loading.Component'
import { Snackbar } from '@material-ui/core'
import { Alert } from 'Commons/alert/Alert'

export const App: React.FC = () => {
  const {
    isLoading,
    snackSettings,
    setSnackSettings,
  } = useApplicationStore()

  const handleSnackClose = () => setSnackSettings({ opened: false })

  return (
    <BrowserRouter>
      {isLoading && <Loading />}
      <Snackbar
        open={snackSettings.opened}
        autoHideDuration={snackSettings.duration}
        onClose={handleSnackClose}
      >
        <Alert onClose={handleSnackClose} severity={snackSettings.status}>
          {snackSettings.message}
        </Alert>
      </Snackbar>
      <Switch>
        {routes.map((route: RoutesProps) => (
          <Route component={route.component} exact={route.exact} path={route.path} key={route.path} viewName={route.viewName} title={route.title} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}

export default App
