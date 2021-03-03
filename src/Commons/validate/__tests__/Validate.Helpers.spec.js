const { hasError } = require('../Validate.Helpers')

describe('test validate helpers', () => {
  describe('test hasErro', () => {
    it('hasError true', () => {
      const errors = { foo: 'bar' }
      expect(hasError('foo', errors)).toBeTruthy()
    })
    it('hasError false', () => {
      expect(hasError('foo', {})).toBeFalsy()
      expect(hasError('foo')).toBeFalsy()
    })
  })
})
