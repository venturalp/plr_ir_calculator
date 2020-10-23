import '@testing-library/jest-dom/extend-expect'

global.mockPush = jest.fn()
global.pathname = '/'

jest.setTimeout(15000)

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    location: { pathname: global.pathname },
    push: global.mockPush,
    listen(func) {
      func(this.location)
    },
  }),
}))
