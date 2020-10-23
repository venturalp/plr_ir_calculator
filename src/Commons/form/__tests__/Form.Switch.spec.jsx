import React from 'react'
import { render } from '@testing-library/react'
import { ThemeWrapper } from 'Commons/tests/Tests.Helpers'
import { CustomSwitch } from '../Form.Switch'

const renderSwitch = props =>
  render(
    <ThemeWrapper>
      <CustomSwitch {...props} />
    </ThemeWrapper>,
  )

describe('test form switch component', () => {
  it('render with default colors', () => {
    const { asFragment } = renderSwitch()

    expect(asFragment()).toMatchSnapshot()
  })
  it('render with custom color', () => {
    const { asFragment } = renderSwitch({ fill: '#ff0000' })

    expect(asFragment()).toMatchSnapshot()
  })
})
