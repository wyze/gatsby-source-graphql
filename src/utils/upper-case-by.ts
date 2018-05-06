const upperCaseBy = ( matcher: RegExp ) => ( input: string ) =>
  input.replace(matcher, ( _: string, match: string ) => match.toUpperCase())

export default upperCaseBy
