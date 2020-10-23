import {
  renderWithRouterDocument,
  ThemeWrapper,
} from 'Commons/tests/Tests.Helpers'
import React from 'react'
import { FormSelect } from '../Form.Select'

const options = [
  { id: 1, name: 'foo' },
  { id: 2, name: 'bar' },
]

describe('test form select', () => {
  it('test single select', () => {
    const { asFragment } = renderWithRouterDocument(
      <ThemeWrapper>
        <FormSelect options={options} value={1} />
      </ThemeWrapper>,
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
