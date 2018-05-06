import * as crypto from 'crypto'

const createContentDigest = ( content: string ) =>
  crypto
    .createHash('md5')
    .update(content)
    .digest('hex')

export default createContentDigest
