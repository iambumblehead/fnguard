// Filename: fnguard.js
// Timestamp: 2015.02.17-23:20:43 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

const isobj = ((getproto, objproto = getproto({})) =>
  obj => obj && (getproto(obj) === objproto)
)(Object.getPrototypeOf)

const isnumstr = n => !isNaN(parseFloat(n)) && isFinite(n)
const isnum = n => typeof n === 'number'
const isfn = n => typeof n === 'function'
const isstr = n => typeof n === 'string'
const isarr = n => Array.isArray(n)
const isnull = n => n === null
const isbool = n => typeof n === 'boolean'
const isundefined = n => typeof n === 'undefined'
const isdomelem = n => n instanceof Element
const isdate = n => n instanceof Date && !isNaN(n)
const isre = n => n instanceof RegExp
const isany = () => true

export default ((check, spec, guarderror, custError, cropMessage) => {
  spec = {
    isobj,
    isnumstr,
    isnum,
    isfn,
    isstr,
    isarr,
    isnull,
    isbool,
    isundefined,
    isdomelem,
    isdate,
    isre,
    isany
  }

  cropMessage = (message, lines) => {
    const [ , ...rest] = lines || message.split('\n')

    return /fnguard[^\n]*/i.test(rest)
      ? cropMessage(message, rest)
      : rest.join('\n')
  }

  custError = (message, err) => {
    err = new Error(message)
    err.stack = cropMessage(err.stack)
    throw err
  }

  // define first message of stack to indicate source fnguard callee
  guarderror = (checkfnname, arg, i) => {
    custError(
      '\n!fnguard.check.:fnname( :argval ),\n arg num: :i (0 is first),\n :msg'
        .replace(/:fnname/, checkfnname)
        .replace(/:msg/, new Error().stack.split(/\n/gi)[5].replace(/^ */, ''))
        .replace(/:i/, i)
        .replace(/:argval/, () => {
          if (isstr(arg)) {
            arg = arg.length > 30 ? `${arg.slice(0, 30)}…` : arg
            arg = `“${arg}”`
          } else if (isarr(arg)) {
            arg = `[${arg.toString()}]`
          } else if (isdate(arg)) {
            arg = `instanceof Date, ${arg}`
          }

          return arg
        })
    )
  }

  // construct 'isnot' functions from 'is' functions
  Object.keys(spec).forEach(fnname =>
    spec[fnname.replace(/^is/, 'isnot')] = arg =>
      !spec[fnname](arg))

  Object.keys(spec).forEach(checkfnname => {
    check[checkfnname] = (...args) =>
      Array.prototype.every.call(args, (arg, i) => (
        spec[checkfnname](arg) || guarderror(checkfnname, arg, i)
      )) && check
  })

  check.spec = spec

  return check
})({})
