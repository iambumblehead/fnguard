const fnguard = require('../');

describe('fnguard', () => {
  it('should be easily demonstrated', () =>
    (a, b, c) => {
      try {
        return fnguard.isnum(a).isobj(b).isany(c) && true;
      } catch (e) {
        return e.message;
      }
    }
  );

  it('should be easily demonstrated (throw Error)', () => {
    function guardedfn (a, b, c) {
      fnguard.isnum(a).isobj(b).isany(c);
      return true;
    }

    try {
      guardedfn(1, {}, 3);
    } catch (e) {
      expect(/^fnguard error check\[isnum\]\('str'\), arguments\[0\] at guardedfn/.test(e.message)).toBe(true);
    }
  });
});


describe('fnguard.isobj( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isobj(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/^\n!fnguard.check.isobj\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isobj\( undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isobj\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isobj\( true \)/);
  });

  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isobj\( false \)/);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isobj\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isobj\( 1 \)/);
  });
  it('should throw error if arg is "1"', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isobj\( “1” \)/);
  });
});

describe('fnguard.isnotobj( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotobj(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isnotobj\( \[object Object\] \)/);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isnotobj\( \[object Object\] \)/);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnum( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnum(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isnum\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isnum\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isnum\( \undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isnum\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isnum\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isnum\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isnum\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isnum\( null \)/);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isnum\( “1” \)/);
  });
});

describe('fnguard.isnotnum( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnum(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isnotnum\( 1 \)/);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnumstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnumstr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isnumstr\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isnumstr\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isnumstr\( \undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isnumstr\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isnumstr\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isnumstr\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isnumstr\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isnumstr\( null \)/);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnotnumstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnumstr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isnotnumstr\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isnotnumstr\( “1” \)/);
  });
});

describe('fnguard.isarr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isarr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isarr\( \[object Object\] \)/);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isarr\( \undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isarr\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isarr\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isarr\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isarr\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isarr\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isarr\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isarr\( “1” \)/);
  });
});

describe('fnguard.isnotarr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotarr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isnotarr\( \[\] \)/);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnull( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnull(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isnull\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isnull\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isnull\( \undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isnull\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isnull\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isnull\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isnull\( \[object Object\] \)/);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isnull\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isnull\( “1” \)/);
  });
});

describe('fnguard.isnotnull( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnull(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isnotnull\( null \)/);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isbool( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isbool(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isbool\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isbool\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isbool\( \undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isbool\( instanceof Date, .* \)/);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isbool\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isbool\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isbool\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isbool\( “1” \)/);
  });
});

describe('fnguard.isnotbool( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotbool(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isnotbool\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isnotbool\( false \)/);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isundefined( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isundefined(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isundefined\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isundefined\( \[\] \)/);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isundefined\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isundefined\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isundefined\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isundefined\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isundefined\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isundefined\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isundefined\( “1” \)/);
  });
});

describe('fnguard.isnotundefined( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotundefined(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isnotundefined\( \undefined \)/);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isdate( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isdate(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isdate\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isdate\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isdate\( undefined \)/);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isdate\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isdate\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isdate\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isdate\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isdate\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isdate\( “1” \)/);
  });
});

describe('fnguard.isnotdate( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotdate(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isnotdate\( instanceof Date, .* \)/);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isany( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isany(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnotany( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotany(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isnotany\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isnotany\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isnotany\( undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isnotany\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isnotany\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isnotany\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isnotany\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isnotany\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isnotany\( 1 \)/);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isnotany\( “1” \)/);
  });
});

describe('fnguard.isstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isstr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should throw error if arg is {}', () => {
    expect(guardedfn({})).toMatch(/!fnguard.check.isstr\( \[object Object\] \)/);
  });
  it('should throw error if arg is []', () => {
    expect(guardedfn([])).toMatch(/!fnguard.check.isstr\( \[\] \)/);
  });
  it('should throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toMatch(/!fnguard.check.isstr\( undefined \)/);
  });
  it('should throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toMatch(/!fnguard.check.isstr\( instanceof Date, .* \)/);
  });
  it('should throw error if arg is true', () => {
    expect(guardedfn(true)).toMatch(/!fnguard.check.isstr\( true \)/);
  });
  it('should throw error if arg is false', () => {
    expect(guardedfn(false)).toMatch(/!fnguard.check.isstr\( false \)/);
  });
  it('should throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toMatch(/!fnguard.check.isstr\( \[object Object\] \)/);
  });
  it('should throw error if arg is null', () => {
    expect(guardedfn(null)).toMatch(/!fnguard.check.isstr\( null \)/);
  });
  it('should throw error if arg is 1', () => {
    expect(guardedfn(1)).toMatch(/!fnguard.check.isstr\( 1 \)/);
  });
  it('should not throw error if arg is “1”', () => {
    expect(guardedfn('1')).toBe(true);
  });
});

describe('fnguard.isnotstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotstr(a) && true;
    } catch (e) {
      return e.message;
    }
  }

  it('should not throw error if arg is {}', () => {
    expect(guardedfn({})).toBe(true);
  });
  it('should not throw error if arg is []', () => {
    expect(guardedfn([])).toBe(true);
  });
  it('should not throw error if arg is undefined', () => {
    expect(guardedfn(undefined)).toBe(true);
  });
  it('should not throw error if arg is new Date()', () => {
    expect(guardedfn(new Date())).toBe(true);
  });
  it('should not throw error if arg is true', () => {
    expect(guardedfn(true)).toBe(true);
  });
  it('should not throw error if arg is false', () => {
    expect(guardedfn(false)).toBe(true);
  });
  it('should not throw error if arg is { foo : "bar" }', () => {
    expect(guardedfn({ foo : 'bar' })).toBe(true);
  });
  it('should not throw error if arg is null', () => {
    expect(guardedfn(null)).toBe(true);
  });
  it('should not throw error if arg is 1', () => {
    expect(guardedfn(1)).toBe(true);
  });
  it('should throw error if arg is “1”', () => {
    expect(guardedfn('1')).toMatch(/!fnguard.check.isnotstr\( “1” \)/);
  });
  it('should throw error showing at most 30 chars of str if str is longer than 30 “1”', () => {
    expect(
      guardedfn('01234567890123456789012345678901234567890123456789012345678901234567890')
    ).toMatch(/!fnguard.check.isnotstr\( “012345678901234567890123456789…” \)/);
  });
});

