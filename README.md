fnguard
=======
**(c)[Bumblehead][0], 2015** [MIT-license](#license)

### Overview:

```javascript
function gethtml(session, config, templatename, dataarr) {
  fnguard.isobj(session).isobj(config).isstr(templatename).isarr(dataarr);
  // continue
}
```

Use `fnguard` to throw a type-related error message when a function is called with wrong params. This is useful when refactoring bigger javascript codebases for which you have no unit-tests.

Simplified rules are used to determine type. For example, native javascript will return `true` here:
```javascript
typeof null === 'object' && typeof [] === 'object'
```

Analogous comparison does not pass `fnguard`. Run the tests or look at the [source code][1] (small) to understand how it handles comparison.
```javascript
fnguard.isobj(null); // error !fnguard.check.isobj(null)
fnguard.isobj([]);   // error !fnguard.check.isobj([])
```

Chain Guard calls:
```javascript
fnguard.isobj({}).isbool(true).isnotnull("truck").isnum(20).isarr([]); // true
```

[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/iambumblehead/fnguard/blob/master/fnguard.js

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
#### <a id="how"></a>How:

 * **fnguard.isobj**
   ```javascript
   isobj : function (o) {
     return typeof o === 'object' 
       && !Array.isArray(o) 
       && !(o instanceof Date)
       && o !== null;
   }
   ```

 * **fnguard.isnotobj**
   ```javascript
   isnotobj : function (o) {
     return fnguard.isobj();
   }
   ```

 * **fnguard.isobj**
   ```javascript
   isnumstr : function (n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }
   ```

 * **fnguard.isnotobj**
   ```javascript
   isnotnumstr : function (n) {
     return !fnguard.isnumstr(n);
   }
   ```

 * **fnguard.isnumstr**
   ```javascript
   isnumstr : function (n) {
     return !isNaN(parseFloat(n)) && isFinite(n);
   }
   ```

 * **fnguard.isnotnumstr**
   ```javascript
   isnotnumstr : function (n) {
     return !fnguard.isnumstr(n);
   }
   ```

 * **fnguard.isnum**
   ```javascript
   isnum : function (n) {
     return typeof n === 'number';
   }
   ```

 * **fnguard.isnotnum**
   ```javascript
   isnotnum : function (n) {
     return !fnguard.isnum(n);
   }
   ```

 * **fnguard.isstr**
   ```javascript
   isstr : function (n) {
     return typeof n === 'string';
   }
   ```

 * **fnguard.isnotstr**
   ```javascript
   isnotstr : function (n) {
     return !fnguard.isstr(n);
   }
   ```

 * **fnguard.isarr**
   ```javascript
   isarr : function (n) {
     return Array.isArray(n);
   }
   ```

 * **fnguard.isnotarr**
   ```javascript
   isnotarr : function (n) {
     return !fnguard.isarr(n);
   }
   ```

 * **fnguard.isnull**
   ```javascript
   isnull : function (n) {
     return n === null;
   }
   ```

 * **fnguard.isnotnull**
   ```javascript
   isnotnull : function (n) {
     return !fnguard.isnull(n);
   }
   ```

 * **fnguard.isbool**
   ```javascript
   isbool : function (n) {
     return typeof n === 'boolean';
   }
   ```

 * **fnguard.isnotbool**
   ```javascript
   isnotbool : function (n) {
     return !fnguard.isbool(n);
   }
   ```

 * **fnguard.isundefined**
   ```javascript
   isundefined : function (n) {
     return typeof n === 'undefined';
   }
   ```

 * **fnguard.isnotundefined**
   ```javascript
   isnotundefined : function (n) {
     return !fnguard.isundefined(n);
   }
   ```

 * **fnguard.isdate**
   ```javascript
   isdate : function (n) {
     return n instanceof Date && !isNaN(n);
   }
   ```

 * **fnguard.isnotdate**
   ```javascript
   isnotdate : function (n) {
     return !fnguard.isdate(n);
   }
   ```

 * **fnguard.isany**
   ```javascript
   isany : function (n) {
     return true;
   }
   ```

 * **fnguard.isnotany**
   ```javascript
   isnotany : function (n) {
     return !fnguard.isany(n)
   }
   ```

---------------------------------------------------------
#### <a id="license">License:

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2013 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
