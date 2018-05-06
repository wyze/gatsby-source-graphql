import createContentDigest from './utils/create-content-digest'
import fetch from 'node-fetch'
import upperCaseBy from './utils/upper-case-by'
import validate, { Options } from './utils/validate'

const camelCase = upperCaseBy(/[_.-](\w|$)/g)
const startCase = upperCaseBy(/^(\w)/)

const onCreateNode = async (
  { boundActionCreators: { createNode, createParentChildLink }, loadNodeContent, node },
  { headers = {}, url, variables = {} }: Options
) => {
  if ( node.extension !== 'graphql' ) {
    return
  }

  const query = await loadNodeContent(node)
  const queries = [ query ]

  validate({ headers, queries, url, variables })

  const options = {
    body: JSON.stringify({ query, variables }),
    headers: {
      'content-type': 'application/json',
      ...headers,
    },
    method: 'post',
  }
  const response = await fetch(url, options)
  const result = await response.json()

  if ( !response.ok ) {
    throw new Error(`[${response.statusText}]: ${result.message}`)
  }

  const content = JSON.stringify(result.data)
  const contentDigest = createContentDigest(content)
  const type = startCase(camelCase(`${node.name}GraphQL`))
  const child = {
    ...result.data,
    id: `__graphql__${contentDigest}`,
    children: [],
    parent: node.id,
    internal: {
      content,
      contentDigest,
      type,
    },
  }

  createNode(child)
  createParentChildLink({ parent: node, child })

  return
}

export default onCreateNode
