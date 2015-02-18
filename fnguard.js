// Filename: fnguard.js
// Timestamp: 2015.02.17-23:20:43 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var fnguard = ((typeof module === 'object') ? module : {}).exports = (function (check, spec, guarderror) {

  spec = {
    isobj : function (o) {
      return typeof o === 'object' 
        && !spec.isarr(o) 
        && !spec.isdate(o)
        && !spec.isnull(o);
    },
    isnumstr : function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);  
    },
    isnum : function (n) {
      return typeof n === 'number';  
    },
    isfn : function (n) {
      return typeof n === 'function';  
    },
    isstr : function (n) {
      return typeof n === 'string';
    },
    isarr : function (n) {
      return Array.isArray(n);
    },
    isnull : function (n) {
      return n === null;
    },
    isbool : function (n) {
      return typeof n === 'boolean';
    },    
    isundefined : function (n) {
      return typeof n === 'undefined';
    },
    isdomelem : function (n) {
      return n instanceof Element;
    },
    isdate : function (n) {
      return n instanceof Date && !isNaN(n);
    },
    isany : function (n) {
      return true;
    }
  };

  // define first message of stack to indicate source fnguard callee
  guarderror = function (checkfnname, arg, i) {    
    throw new Error(
      "!fnguard.check.:fnname(:argval), arguments[:i] :msg"
        .replace(/:fnname/, checkfnname)
        .replace(/:msg/, new Error().stack.split(/\n/gi)[5].replace(/^ */, ''))
        .replace(/:i/, i)
        .replace(/:argval/, function () {
          if (typeof arg === 'string') {
            arg = arg.length > 30 ? arg.slice(0, 30) + '...' : arg;
            arg = '"' + arg + '"';
          } else if (Array.isArray(arg)) {
            arg = "[" + arg.toString() + "]";
          } else if (arg instanceof Date) {
            arg = "instanceof Date, " + arg;
          }

          return arg;
        })
    );      
  };

  // construct 'isnot' functions from 'is' functions
  Object.keys(spec).forEach(function (fnname) {
    spec[fnname.replace(/^is/, 'isnot')] = function (arg) {
      return !spec[fnname](arg);
    };
  });

  Object.keys(spec).forEach(function (checkfnname) {
    check[checkfnname] = function () {
      return Array.prototype.every.call(arguments, function (arg, i) {
        return spec[checkfnname](arg) || guarderror(checkfnname, arg, i);
      }) && check;
    };
  });

  check.spec = spec;
  return check;

}({}));
