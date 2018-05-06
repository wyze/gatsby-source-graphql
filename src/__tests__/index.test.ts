import * as module from '..'

describe('gatsby-source-graphql', () => {
  it('exports functions', () => {
    expect(module).toEqual({
      __esModule: true,
      onCreateNode: expect.any(Function),
    })
  })
})
