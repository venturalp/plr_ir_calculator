import { CalculatorPage } from 'Modules/calculator/Calculator.page'
import { Error404 } from 'Modules/error/Error.404.page'

export const errorRoute = {
  component: Error404,
  path: '*',
}

export type RoutesProps = {
  component: React.FunctionComponent
  path: string
  viewName?: string
  title?: string
  exact?: boolean
}

export const routes: RoutesProps[] = [
  {
    component: CalculatorPage,
    path: '/',
    viewName: 'homeView',
    title: 'Hme',
    exact: true,
  },
  {
    ...errorRoute,
  },
]

export const getRouteByPath = (path: string) => {
  const filtered = routes.filter(route => {
    if (route.exact) return route.path === path

    return path.includes(route.path)
  })
  if (filtered.length) return { ...filtered[0], path }

  return errorRoute
}
