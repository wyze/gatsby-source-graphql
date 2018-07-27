# @wyze/gatsby-source-graphql

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![Codecov.io][codecov-image]][codecov-url]

> A Gatsby source plugin for pulling in data from GraphQL APIs.

## Installation

### Yarn

```
$ yarn add @wyze/gatsby-source-graphql
```

### npm

```
$ npm install --save @wyze/gatsby-source-graphql
```

## Usage

### With `gatsby-source-filesystem`

```js
// gatsby-config.js

// Optionally pull in environment variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  // ...
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'queries',
        path: `${__dirname}/src/queries/`,
      },
    },
    {
      resolve: '@wyze/gatsby-source-graphql',
      options: {
        headers: {
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        url: 'https://api.github.com/graphql',
      },
    },
  ]
}
```

```graphql
# src/queries/github.graphql
{
  viewer {
    name
    url
  }
}
```

### How to query

Given the above example with a GraphQL file named `github.graphql`, you would query Gatsby like so:

```graphql
query GitHubViewerQuery {
  githubGraphQl {
    viewer {
      name
      url
    }
  }
}
```

## Change Log

> [Full Change Log](changelog.md)

### [v1.2.0](https://github.com/wyze/gatsby-source-graphql/releases/tag/v1.2.0) (2018-07-27)

* [[`ac57b7ab69`](https://github.com/wyze/gatsby-source-graphql/commit/ac57b7ab69)] - Rename package under my named scope (Neil Kistner)
* [[`befa28c85f`](https://github.com/wyze/gatsby-source-graphql/commit/befa28c85f)] - Allow the use of a mapper function between results and nodes (#6) (Judah Anthony)

## License

MIT © [Neil Kistner](//neilkistner.com)

[travis-image]: https://img.shields.io/travis/wyze/gatsby-source-graphql.svg?style=flat-square
[travis-url]: https://travis-ci.org/wyze/gatsby-source-graphql

[npm-image]: https://img.shields.io/npm/v/@wyze/gatsby-source-graphql.svg?style=flat-square
[npm-url]: https://npmjs.com/package/@wyze/gatsby-source-graphql

[codecov-image]: https://img.shields.io/codecov/c/github/wyze/gatsby-source-graphql.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wyze/gatsby-source-graphql
