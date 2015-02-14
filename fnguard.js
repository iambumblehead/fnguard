// Filename: fnguard.js
// Timestamp: 2015.02.14-14:06:35 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com)

var fnguard = ((typeof module === 'object') ? module : {}).exports = (function (check, spec, guarderror) {

  spec = {
    isobj : function (o) {
      return typeof o === 'object' 
        && !Array.isArray(o) 
        && !(o instanceof Date)
        && o !== null;
    },
    isnumstr : function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);  
    },
    isnum : function (n) {
      return typeof n === 'number';  
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
  guarderror = function (checkfnname, arg) {    
    throw new Error(
      "!fnguard.check.:fnname(:argval),  :msg"
        .replace(/:fnname/, checkfnname)
        .replace(/:msg/, new Error().stack.split(/\n/gi)[3].replace(/^ */, ''))
        .replace(/:argval/, function () {
          if (typeof arg === 'string') {
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
    check[checkfnname] = function (arg) {
      return spec[checkfnname](arg) ? check : guarderror(checkfnname, arg);
    };
  });

  check.spec = spec;
  return check;

}({}));
