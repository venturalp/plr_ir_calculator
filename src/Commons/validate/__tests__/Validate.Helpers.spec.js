const { hasError, getQueryParam } = require('../Validate.Helpers')

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
  describe('test queryParam', () => {
    it('query param found', () => {
      const query = '?foo=bar'
      expect(getQueryParam(query, 'foo')).toEqual('bar')
    })
    it('query param not found', () => {
      const query = '?foo=bar'
      expect(getQueryParam(query, 'bar')).toBeFalsy()
    })
    it('default values', () => {
      const query = '?foo=bar&bar=foo'
      expect(getQueryParam(query)).toEqual('bar')
      expect(getQueryParam()).toBeFalsy()
    })
  })
})
