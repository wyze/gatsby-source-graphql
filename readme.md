# gatsby-source-graphql

[![Build Status][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![Codecov.io][codecov-image]][codecov-url]

> A Gatsby source plugin for pulling in data from GraphQL APIs.

## Installation

### Yarn

```
$ yarn add --dev gatsby-source-graphql
```

### npm

```
$ npm install --save-dev gatsby-source-graphql
```

## Usage

### With `gatsby-source-filesystem`

```js
// gatsby-config.js

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
      resolve: 'gatsby-source-graphql',
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

## Change Log

> [Full Change Log](changelog.md)

## License

MIT © [Neil Kistner](//neilkistner.com)

[travis-image]: https://img.shields.io/travis/wyze/gatsby-source-graphql.svg?style=flat-square
[travis-url]: https://travis-ci.org/wyze/gatsby-source-graphql

[npm-image]: https://img.shields.io/npm/v/gatsby-source-graphql.svg?style=flat-square
[npm-url]: https://npmjs.com/package/gatsby-source-graphql

[codecov-image]: https://img.shields.io/codecov/c/github/wyze/gatsby-source-graphql.svg?style=flat-square
[codecov-url]: https://codecov.io/github/wyze/gatsby-source-graphql
