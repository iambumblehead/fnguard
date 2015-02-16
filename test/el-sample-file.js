var fnguard = require('../fnguard');

function testfun1 (a, b, c) {
    fnguard.isobj(a, b).isbool(c);
}

function testfun2 (a, b, c) {
    fnguard.isobj(a, b).isbool(c);
}
