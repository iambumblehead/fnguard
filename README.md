fnguard
=======
**(c)[Bumblehead][0]** [MIT-license](#license)

fnguard provides something similar to an Erlang-style "function guard". Inside the function, the parameter types are specified and, at runtime, if one of the params is wrong, and error is thrown and with a message explaining which parameter failed and a stack trace started from the call to fnguard.

The functions used to test each value are made to be safe and logical. For example, the function used for 'isobj' and 'isnotobj' looks like this, so that `null` and other values don't pass the test.

``` javascript
isobj : o =>
  typeof o === 'object'
  && !spec.isarr(o)
  && !spec.isdate(o)
  && !spec.isnull(o)
  && !spec.isre(o);
```

Here's an example of its usage
```javascript
gethtml = (session, config, templatename, dataarr) => {
  fnguard.isobj(session, config).isstr(templatename).isarr(dataarr);
  
  // continue
}
```

`fnguard` is useful when refactoring bigger javascript codebases for which you have no unit-tests. Or highly dynamic sources which are difficult to type check. Run the tests or look at the [source code][1] (small) to understand how it handles comparison.

A negation function prefixed with _isnot_ is provided for each '_is_' function, for example:

```javascript
spec.isnotnum = function (n) {
  return !spec.isnum(n);
};
```


Todo:
 - would be great if fnguard could use custom types (similar to how [Erlang does this][3])


[0]: http://www.bumblehead.com                            "bumblehead"
[1]: https://github.com/iambumblehead/fnguard/blob/master/fnguard.js
[2]: https://github.com/iambumblehead/fnguardrm
[3]: http://www.erlang.org/doc/reference_manual/typespec.html "erlang type spec"


 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
