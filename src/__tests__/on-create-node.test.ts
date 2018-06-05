import onCreateNode from '../on-create-node'

// Cast fetch to a mockFn to avoid casting everytime below
const fetch: jest.Mock = require('node-fetch').default

jest.mock('node-fetch', () => ({
  default: jest.fn()
}))

const createGatsby = ({
  createNode = jest.fn(),
  createParentChildLink = jest.fn(),
  loadNodeContent = jest.fn(),
  node = {},
} = {}) => ({
  boundActionCreators: {
    createNode,
    createParentChildLink,
  },
  loadNodeContent,
  node: {
    extension: 'graphql',
    name: 'github',
    ...node,
  },
})

const createOptions = ({
  headers = {},
  queries = [],
  url = '//api.local',
  variables = {},
} = {}) => ({
  headers,
  queries,
  url,
  variables,
})

const mockFetch = ({ message = '', statusText = '' } = {}) => {
  fetch.mockReset()
  fetch.mockReturnValue({
    json: jest.fn(() => ({
      data: { id: 1 },
      message,
    })),
    ok: message.length === 0,
    statusText,
  })
}

describe('onCreateNode', () => {
  it('creates a node and links to parent', async () => {
    mockFetch()

    const createNode = jest.fn()
    const loadNodeContent = jest.fn(() => 'query { id }')
    const gatsby = createGatsby({ createNode, loadNodeContent })
    const options = createOptions()
    const actual = await onCreateNode(gatsby, options)
    const contentDigest = 'd2ce28b9a7fd7e4407e2b0fd499b7fe4'

    expect(createNode.mock.calls[0][0]).toEqual({
      children: [],
      id: `__graphql__${contentDigest}`,
      internal: {
        content: JSON.stringify({ id: 1 }),
        contentDigest,
        type: 'GithubGraphQL',
      },
    })
  })

  it('allows Promise based options', async () => {
    mockFetch()

    const headers = {
      authorization: 'Bearer token',
    }
    const loadNodeContent = jest.fn(() => 'query { id }')
    const gatsby = createGatsby({ loadNodeContent })
    const options = Promise.resolve(createOptions({ headers }))
    const actual = await onCreateNode(gatsby, options)

    expect(fetch.mock.calls[0][1]).toMatchSnapshot()
  })

  it('allows passing custom headers', async () => {
    mockFetch()

    const headers = {
      authorization: 'Bearer token',
    }
    const loadNodeContent = jest.fn(() => 'query { id }')
    const gatsby = createGatsby({ loadNodeContent })
    const options = createOptions({ headers })
    const actual = await onCreateNode(gatsby, options)

    expect(fetch.mock.calls[0][1]).toMatchSnapshot()
  })

  it('throws an error with bad api response', async () => {
    mockFetch({ message: 'Post is malformed.', statusText: 'Bad Request' })

    const gatsby = createGatsby()
    const options = createOptions()
    const actual = onCreateNode(gatsby, options)

    await expect(actual).rejects.toThrowErrorMatchingSnapshot()
  })

  it('throws an error when null `headers`', async () => {
    const gatsby = createGatsby()
    const options = createOptions({ headers: null })
    const actual = onCreateNode(gatsby, options)

    await expect(actual).rejects.toThrowErrorMatchingSnapshot()
  })

  it('throws an error with missing or empty `url`', async () => {
    const gatsby = createGatsby()
    const options = createOptions({ url: '' })
    const actual = onCreateNode(gatsby, options)

    await expect(actual).rejects.toThrowErrorMatchingSnapshot()
  })

  it('throws an error when null `variables`', async () => {
    const gatsby = createGatsby()
    const options = createOptions({ variables: null })
    const actual = onCreateNode(gatsby, options)

    await expect(actual).rejects.toThrowErrorMatchingSnapshot()
  })

  it('does nothing when node.extensions !== `graphql`', async () => {
    const gatsby = createGatsby({ node: { extension: '' } })
    const options = createOptions()
    const actual = await onCreateNode(gatsby, options)

    expect(actual).toBeUndefined()
  })
})
