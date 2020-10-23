import React from 'react'
import {
  render,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { ThemeProvider } from '@material-ui/core'
import { materialTheme } from 'Config/Config.theme'
import userEvent from '@testing-library/user-event'

export const hideErrors = () => {
  console.error = jest.fn()
  console.warn = jest.fn()
}

export const renderWithRouter = (component, history) => ({
  ...render(
    <Router history={history || createMemoryHistory()}>{component}</Router>,
  ),
})

export const renderWithRouterDocument = (component, history) => ({
  ...render(
    <Router history={history || createMemoryHistory()}>{component}</Router>,
    { container: document.body },
  ),
})

export const ThemeWrapper = ({ children }) => (
  <ThemeProvider theme={materialTheme}>{children}</ThemeProvider>
)

export const sleepTest = (timeToWait = 200) =>
  new Promise(res =>
    setTimeout(() => {
      expect(true).toBe(true)
      res()
    }, timeToWait),
  )

export const mockDateBase = '2020-12-30'
export const mockDateBaseFormat = '30/12/2020'

const hasText = (node, text) => node.textContent === text

export const byTextHelper = text => (content, node) => {
  const nodeHasText = hasText(node, text)
  const childrenDontHaveText = Array.from(node.children).every(
    child => !hasText(child, text),
  )

  return nodeHasText && childrenDontHaveText
}

export const selectMaterialUiSelectOption = async (element, optionText) =>
  new Promise(resolve => {
    // The the button that opens the dropdown, which is a sibling of the input
    const selectButton = element.parentNode.querySelector('[role=button]')

    // Open the select dropdown
    userEvent.click(selectButton)

    // Get the dropdown element. We don't use getByRole() because it includes <select>s too.
    const listbox = document.body.querySelector('ul[role=listbox]')

    // Click the list item
    const listItem = within(listbox).getByText(optionText)
    userEvent.click(listItem)

    // Wait for the listbox to be removed, so it isn't visible in subsequent calls
    waitForElementToBeRemoved(() =>
      document.body.querySelector('ul[role=listbox]'),
    ).then(resolve)
  })
