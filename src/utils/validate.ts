type Options = {
  headers: {
    [ header: string ]: string,
  },
  queries: string[],
  url: string,
  variables: {
    [ variable: string ]: any,
  },
  transform?: (data: any) => any | any[],
}

const isObject = <T>( value: T ) =>
  typeof value === 'object'
    && Array.isArray(value) === false
    && value !== null

const validate = ({ headers, queries, url, variables, transform }: Options) => {
  if ( !(Array.isArray(queries) && queries.length > 0) ) {
    throw new Error('Must supply `queries` option with atleast one query.')
  }

  if ( !isObject(headers) ) {
    throw new Error('Must supply `headers` option that is an object.')
  }

  if ( !(typeof url === 'string' && url.length > 0) ) {
    throw new Error('Must supply `url` option to point to your GraphQL API.')
  }

  if ( !isObject(variables) ) {
    throw new Error('Must supply `variables` option that is an object.')
  }

  if ( !(typeof transform === 'undefined' || typeof transform === 'function') ) {
    throw new Error('Can supply `transform` option that is a function.')
  }
}

export { Options }
export default validate
