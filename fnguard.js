// Filename: fnguard.js
// Timestamp: 2015.02.17-23:20:43 (last modified)
// Author(s): Bumblehead (www.bumblehead.com)

module.exports = (function (check, spec, guarderror) {
  spec = {
    isobj : o =>
      typeof o === 'object'
      && !spec.isarr(o)
      && !spec.isdate(o)
      && !spec.isnull(o)
      && !spec.isre(o),

    isnumstr : n =>
      !isNaN(parseFloat(n)) && isFinite(n),

    isnum : n =>
      typeof n === 'number',

    isfn : n =>
      typeof n === 'function',

    isstr : n =>
      typeof n === 'string',

    isarr : n =>
      Array.isArray(n),

    isnull : n =>
      n === null,

    isbool : n =>
      typeof n === 'boolean',

    isundefined : n =>
      typeof n === 'undefined',

    isdomelem : n =>
      n instanceof Element,

    isdate : n =>
      n instanceof Date && !isNaN(n),

    isre : n =>
      n instanceof RegExp,

    isany : () =>
      true
  };

  // define first message of stack to indicate source fnguard callee
  guarderror = function (checkfnname, arg, i) {
    throw new Error(
      '!fnguard.check.:fnname(:argval), arguments[:i] :msg'
        .replace(/:fnname/, checkfnname)
        .replace(/:msg/, new Error().stack.split(/\n/gi)[5].replace(/^ */, ''))
        .replace(/:i/, i)
        .replace(/:argval/, () => {
          if (typeof arg === 'string') {
            arg = arg.length > 30 ? `${arg.slice(0, 30)}…` : arg;
            arg = `"${arg}"`;
          } else if (Array.isArray(arg)) {
            arg = `[${arg.toString()}]`;
          } else if (arg instanceof Date) {
            arg = `instanceof Date, ${arg}`;
          }

          return arg;
        })
    );
  };

  // construct 'isnot' functions from 'is' functions
  Object.keys(spec).forEach(fnname =>
    spec[fnname.replace(/^is/, 'isnot')] = arg =>
      !spec[fnname](arg));

  Object.keys(spec).forEach(checkfnname => {
    check[checkfnname] = (...args) =>
      Array.prototype.every.call(args, (arg, i) => (
        spec[checkfnname](arg) || guarderror(checkfnname, arg, i)
      )) && check;
  });

  check.spec = spec;

  return check;
}({}));
