import * as module from '..'

describe('gatsby-source-graphql', () => {
  it('exports functions', () => {
    expect(module).toEqual({
      onCreateNode: expect.any(Function),
    })
  })
})
