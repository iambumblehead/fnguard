var fnguard = require('../fnguard');

describe("fnguard", function () {
  it("should be easily demonstrated", function () {
    function guardedfn (a, b, c) {
      try {
        return fnguard.isnum(a).isobj(b).isany(c) && true;
      } catch(e) {
        return e.message;
      }
    }
  });

  it("should be easily demonstrated (throw Error)", function () {
    function guardedfn (a, b, c) {
      fnguard.isnum(a).isobj(b).isany(c);
      return true;
    }

    try {
      guardedfn(1, {}, 3);
    } catch(e) {
      expect(/^fnguard error check\[isnum\]\("str"\), arguments\[0\] at guardedfn/.test(e.message)).toBe(true);
    }
  });
});


describe("fnguard.isobj( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isobj(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isobj\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isobj\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isobj\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isobj\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isobj\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isobj\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isobj\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isobj\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotobj( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotobj(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnotobj\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe(true);    
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);    
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);    
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe(true);    
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe(true);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnotobj\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );    
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );    
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );    
  });
});


describe("fnguard.isnum( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnum(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnum\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnum\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnum\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnum\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnum\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnum\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnum\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnum\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnum\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotnum( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotnum(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe(true);    
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);    
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);    
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe(true);    
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe(true);    
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotnum\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );
  });
});

describe("fnguard.isnumstr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnumstr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnumstr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnumstr\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnumstr\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnumstr\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnumstr\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnumstr\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnumstr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnumstr\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );    
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );    
  });
});

describe("fnguard.isnotnumstr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotnumstr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe( true );
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe( true );
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotnumstr\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotnumstr\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isarr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isarr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isarr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isarr\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isarr\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isarr\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isarr\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isarr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isarr\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isarr\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isarr\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotarr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotarr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnotarr\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe( true );
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe( true );
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe(true);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe(true);
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe(true);
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe(true);
  });
});

describe("fnguard.isnull( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnull(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnull\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnull\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnull\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnull\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnull\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnull\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnull\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe(true);
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnull\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnull\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotnull( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotnull(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe(true);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe(true);
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe(true);
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe(true);
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe(true);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnotnull\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe(true);
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe(true);
  });
});

describe("fnguard.isbool( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isbool(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isbool\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isbool\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isbool\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isbool\(\instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );    
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isbool\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isbool\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isbool\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isbool\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotbool( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotbool(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe(true);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe(true);
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnotbool\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnotbool\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe(true);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe(true);
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe(true);
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe(true);
  });
});

describe("fnguard.isundefined( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isundefined(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isundefined\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isundefined\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isundefined\(instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isundefined\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isundefined\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isundefined\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isundefined\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isundefined\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isundefined\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotundefined( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotundefined(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnotundefined\(\undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe( true );
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );
  });
});

describe("fnguard.isdate( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isdate(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isdate\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isdate\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isdate\(undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isdate\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isdate\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isdate\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isdate\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isdate\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isdate\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isnotdate( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotdate(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe( true );
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnotdate\(instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );
  });
});

describe("fnguard.isany( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isany(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe( true );
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe( true );
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe( true );
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe( true );
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );
  });
});

describe("fnguard.isnotany( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotany(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnotany\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnotany\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnotany\(undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnotany\(instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnotany\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnotany\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnotany\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnotany\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotany\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotany\("1"\), arguments\[0\] at guardedfn/);    
  });
});

describe("fnguard.isstr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isstr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isstr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isstr\(\[\]\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isstr\(undefined\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isstr\(instanceof Date, .*\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isstr\(true\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isstr\(false\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isstr\(\[object Object\]\), arguments\[0\] at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isstr\(null\), arguments\[0\] at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isstr\(1\), arguments\[0\] at guardedfn/);    
  });
  it("should not throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toBe( true );
  });
});

describe("fnguard.isnotstr( arg )", function () {
  function guardedfn (a) {
    try {
      return fnguard.isnotstr(a) && true;
    } catch(e) {
      return e.message;
    }
  }

  it("should not throw error if arg is {}", function () {  
    expect( guardedfn({}) ).toBe(true);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe(true);
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe(true);
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe(true);
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe(true);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe(true);
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe(true);
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotstr\("1"\), arguments\[0\] at guardedfn/);
  });
  it("should throw error showing at most 30 chars of str if str is longer than 30 '1'", function () {  
    expect( 
      guardedfn('01234567890123456789012345678901234567890123456789012345678901234567890') 
    ).toMatch(/^!fnguard.check.isnotstr\("012345678901234567890123456789..."\), arguments\[0\] at guardedfn/);
  });
});

