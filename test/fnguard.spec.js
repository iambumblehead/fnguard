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
      expect(/^fnguard error check\[isnum\]\("str"\),  at guardedfn/.test(e.message)).toBe(true);
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
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isobj\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isobj\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isobj\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isobj\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isobj\(false\),  at guardedfn/);    
  });
  it("should not throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toBe( true );
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isobj\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isobj\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isobj\("1"\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnotobj\(\[object Object\]\),  at guardedfn/);
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
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnotobj\(\[object Object\]\),  at guardedfn/);
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnum\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnum\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnum\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnum\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnum\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnum\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnum\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnum\(null\),  at guardedfn/);    
  });
  it("should not throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toBe( true );    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnum\("1"\),  at guardedfn/);    
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
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotnum\(1\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnumstr\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnumstr\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnumstr\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnumstr\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnumstr\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnumstr\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnumstr\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnumstr\(null\),  at guardedfn/);    
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
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotnumstr\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotnumstr\("1"\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isarr\(\[object Object\]\),  at guardedfn/);
  });
  it("should not throw error if arg is []", function () {  
    expect( guardedfn([]) ).toBe( true );
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isarr\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isarr\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isarr\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isarr\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isarr\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isarr\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isarr\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isarr\("1"\),  at guardedfn/);    
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
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnotarr\(\[\]\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnull\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnull\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnull\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnull\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnull\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnull\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnull\(\[object Object\]\),  at guardedfn/);
  });
  it("should not throw error if arg is null", function () {  
    expect( guardedfn(null) ).toBe(true);
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnull\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnull\("1"\),  at guardedfn/);    
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
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnotnull\(null\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isbool\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isbool\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isbool\(\undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isbool\(\instanceof Date, .*\),  at guardedfn/);    
  });
  it("should not throw error if arg is true", function () {  
    expect( guardedfn(true) ).toBe( true );    
  });
  it("should not throw error if arg is false", function () {  
    expect( guardedfn(false) ).toBe( true );    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isbool\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isbool\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isbool\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isbool\("1"\),  at guardedfn/);    
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
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnotbool\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnotbool\(false\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isundefined\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isundefined\(\[\]\),  at guardedfn/);    
  });
  it("should not throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toBe(true);
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isundefined\(instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isundefined\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isundefined\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isundefined\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isundefined\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isundefined\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isundefined\("1"\),  at guardedfn/);    
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
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnotundefined\(\undefined\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isdate\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isdate\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isdate\(undefined\),  at guardedfn/);    
  });
  it("should not throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toBe(true);
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isdate\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isdate\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isdate\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isdate\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isdate\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isdate\("1"\),  at guardedfn/);    
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
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnotdate\(instanceof Date, .*\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isnotany\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isnotany\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isnotany\(undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isnotany\(instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isnotany\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isnotany\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isnotany\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isnotany\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isnotany\(1\),  at guardedfn/);    
  });
  it("should throw error if arg is '1'", function () {  
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotany\("1"\),  at guardedfn/);    
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
    expect( guardedfn({}) ).toMatch(/^!fnguard.check.isstr\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is []", function () {  
    expect( guardedfn([]) ).toMatch(/^!fnguard.check.isstr\(\[\]\),  at guardedfn/);    
  });
  it("should throw error if arg is undefined", function () {  
    expect( guardedfn(undefined) ).toMatch(/^!fnguard.check.isstr\(undefined\),  at guardedfn/);    
  });
  it("should throw error if arg is new Date()", function () {  
    expect( guardedfn(new Date()) ).toMatch(/^!fnguard.check.isstr\(instanceof Date, .*\),  at guardedfn/);    
  });
  it("should throw error if arg is true", function () {  
    expect( guardedfn(true) ).toMatch(/^!fnguard.check.isstr\(true\),  at guardedfn/);    
  });
  it("should throw error if arg is false", function () {  
    expect( guardedfn(false) ).toMatch(/^!fnguard.check.isstr\(false\),  at guardedfn/);    
  });
  it("should throw error if arg is { foo : 'bar' }", function () {  
    expect( guardedfn({ foo : 'bar' }) ).toMatch(/^!fnguard.check.isstr\(\[object Object\]\),  at guardedfn/);
  });
  it("should throw error if arg is null", function () {  
    expect( guardedfn(null) ).toMatch(/^!fnguard.check.isstr\(null\),  at guardedfn/);    
  });
  it("should throw error if arg is 1", function () {  
    expect( guardedfn(1) ).toMatch(/^!fnguard.check.isstr\(1\),  at guardedfn/);    
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
    expect( guardedfn('1') ).toMatch(/^!fnguard.check.isnotstr\("1"\),  at guardedfn/);
  });
  it("should throw error showing at most 30 chars of str if str is longer than 30 '1'", function () {  
    expect( 
      guardedfn('01234567890123456789012345678901234567890123456789012345678901234567890') 
    ).toMatch(/^!fnguard.check.isnotstr\("012345678901234567890123456789..."\),  at guardedfn/);
  });
});

