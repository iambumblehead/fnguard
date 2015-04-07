fnguard
=======
**(c)[Bumblehead][0], 2015** [MIT-license](#license)

### Overview:

```javascript
function gethtml(session, config, templatename, dataarr) {
  fnguard.isobj(session, config).isstr(templatename).isarr(dataarr);
  // continue
}
```

Use `fnguard` to throw a type-related error message when a function is called with wrong params. This is useful when refactoring bigger javascript codebases for which you have no unit-tests. Simplified rules are used to determine type. For example, native javascript returns `true` here:
```javascript
typeof null === 'object' && typeof [] === 'object'
```

Analogous comparison does not pass `fnguard`. Run the tests or look at the [source code][1] (small) to understand how it handles comparison.
```javascript
fnguard.isobj(null); // error !fnguard.check.isobj(null)
fnguard.isobj([]);   // error !fnguard.check.isobj([])
```

An [accessory script is available][2] separately to strip-out fnguard from a script. This makes it easy to use `fnguard` for development while removing fnguard from production deployments, where it may adversly effect performance and script size.

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/iambumblehead/fnguard/blob/master/fnguard.js
[2]: https://github.com/iambumblehead/fnguard/blob/master/fnguardrm.js

---------------------------------------------------------
#### <a id="install"></a>Install:

```bash
$ npm install fnguard
```

---------------------------------------------------------
#### <a id="test"></a>Test:

```bash
$ npm test
```

---------------------------------------------------------
#### <a id="example"></a>Example:

A real method from an application using fnguard. An error is thrown right away if a parameter is 'wrong'.

```javascript
toelem: function(sess, cfg, tplstr, data, elem, fn) {
  fnguard.isobj(sess, cfg).isstr(tplstr).isobj(data).isdomelem(elem);
  fn = optfn(fn);
  
  this.depthfirstrender(sess, cfg, tplstr, data, function (err, htmlstr) {
    if (err) return fn(err);
    
    elem.innerHTML = htmlstr;
    fn(null, elem);
  });
},
```

---------------------------------------------------------
#### <a id="how"></a>How comparisons are made:

```javascript
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
```

A negation function prefixed with _isnot_ is provided for each '_is_' function, for example:

```javascript
spec.isnotnum = function (n) {
  return !spec.isnum(n);
};
```

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2015 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
