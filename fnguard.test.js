import test, { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import fnguard from './fnguard.js'

test('should be easily demonstrated', () => (
  ((a, b, c) => {
    try {
      return fnguard.isnum(a).isobj(b).isany(c) && true
    } catch (e) {
      return e.message
    }
  }),
  assert.ok(true)
))

test('should be easily demonstrated (throw Error)', () => {
  function guardedfn (a, b, c) {
    fnguard.isnum(a).isobj(b).isany(c)
    return true
  }

  try {
    guardedfn(1, {}, 3)
  } catch (e) {
    assert.ok(e.message.includes(
      "fnguard error check[isnum]('str'), arguments[0] at guardedfn"))
  }
})

describe('fnguard.isobj( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isobj(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /^\n!fnguard.check.isobj\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isobj\( undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isobj\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isobj\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isobj\( false \)/)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.ok(guardedfn({ foo: 'bar' }))
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isobj\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isobj\( 1 \)/)
  })
  it('should throw error if arg is "1"', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isobj\( “1” \)/)
  })
})

describe('fnguard.isnotobj( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotobj(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(
      guardedfn({}),
      /!fnguard.check.isnotobj\( \[object Object\] \)/)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isnotobj\( \[object Object\] \)/)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnum( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnum(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isnum\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isnum\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isnum\( \undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isnum\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isnum\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isnum\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isnum\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isnum\( null \)/)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isnum\( “1” \)/)
  })
})

describe('fnguard.isnotnum( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnum(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isnotnum\( 1 \)/)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnumstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnumstr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(
      guardedfn({}),
      /!fnguard.check.isnumstr\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isnumstr\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(
      guardedfn(undefined),
      /!fnguard.check.isnumstr\( \undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isnumstr\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isnumstr\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isnumstr\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isnumstr\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isnumstr\( null \)/)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnotnumstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnumstr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isnotnumstr\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isnotnumstr\( “1” \)/)
  })
})

describe('fnguard.isarr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isarr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isarr\( \[object Object\] \)/)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isarr\( \undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isarr\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isarr\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isarr\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isarr\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isarr\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isarr\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isarr\( “1” \)/)
  })
})

describe('fnguard.isnotarr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotarr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isnotarr\( \[\] \)/)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnull( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnull(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isnull\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isnull\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isnull\( \undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isnull\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isnull\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isnull\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isnull\( \[object Object\] \)/)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isnull\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isnull\( “1” \)/)
  })
})

describe('fnguard.isnotnull( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotnull(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isnotnull\( null \)/)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isbool( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isbool(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isbool\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isbool\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isbool\( \undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isbool\( instanceof Date, .* \)/)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isbool\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isbool\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isbool\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isbool\( “1” \)/)
  })
})

describe('fnguard.isnotbool( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotbool(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isnotbool\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isnotbool\( false \)/)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isundefined( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isundefined(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(
      guardedfn({}),
      /!fnguard.check.isundefined\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isundefined\( \[\] \)/)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isundefined\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isundefined\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isundefined\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isundefined\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isundefined\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isundefined\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isundefined\( “1” \)/)
  })
})

describe('fnguard.isnotundefined( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotundefined(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(
      guardedfn(undefined),
      /!fnguard.check.isnotundefined\( \undefined \)/)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isdate( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isdate(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isdate\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isdate\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isdate\( undefined \)/)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isdate\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isdate\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isdate\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isdate\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isdate\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isdate\( “1” \)/)
  })
})

describe('fnguard.isnotdate( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotdate(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isnotdate\( instanceof Date, .* \)/)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isany( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isany(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnotany( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotany(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(
      guardedfn({}),
      /!fnguard.check.isnotany\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isnotany\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isnotany\( undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isnotany\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isnotany\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isnotany\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isnotany\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isnotany\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isnotany\( 1 \)/)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isnotany\( “1” \)/)
  })
})

describe('fnguard.isstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isstr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should throw error if arg is {}', () => {
    assert.match(guardedfn({}), /!fnguard.check.isstr\( \[object Object\] \)/)
  })
  it('should throw error if arg is []', () => {
    assert.match(guardedfn([]), /!fnguard.check.isstr\( \[\] \)/)
  })
  it('should throw error if arg is undefined', () => {
    assert.match(guardedfn(undefined), /!fnguard.check.isstr\( undefined \)/)
  })
  it('should throw error if arg is new Date()', () => {
    assert.match(
      guardedfn(new Date()),
      /!fnguard.check.isstr\( instanceof Date, .* \)/)
  })
  it('should throw error if arg is true', () => {
    assert.match(guardedfn(true), /!fnguard.check.isstr\( true \)/)
  })
  it('should throw error if arg is false', () => {
    assert.match(guardedfn(false), /!fnguard.check.isstr\( false \)/)
  })
  it('should throw error if arg is { foo : "bar" }', () => {
    assert.match(
      guardedfn({ foo: 'bar' }),
      /!fnguard.check.isstr\( \[object Object\] \)/)
  })
  it('should throw error if arg is null', () => {
    assert.match(guardedfn(null), /!fnguard.check.isstr\( null \)/)
  })
  it('should throw error if arg is 1', () => {
    assert.match(guardedfn(1), /!fnguard.check.isstr\( 1 \)/)
  })
  it('should not throw error if arg is “1”', () => {
    assert.strictEqual(guardedfn('1'), true)
  })
})

describe('fnguard.isnotstr( arg )', () => {
  function guardedfn (a) {
    try {
      return fnguard.isnotstr(a) && true
    } catch (e) {
      return e.message
    }
  }

  it('should not throw error if arg is {}', () => {
    assert.strictEqual(guardedfn({}), true)
  })
  it('should not throw error if arg is []', () => {
    assert.strictEqual(guardedfn([]), true)
  })
  it('should not throw error if arg is undefined', () => {
    assert.strictEqual(guardedfn(undefined), true)
  })
  it('should not throw error if arg is new Date()', () => {
    assert.strictEqual(guardedfn(new Date()), true)
  })
  it('should not throw error if arg is true', () => {
    assert.strictEqual(guardedfn(true), true)
  })
  it('should not throw error if arg is false', () => {
    assert.strictEqual(guardedfn(false), true)
  })
  it('should not throw error if arg is { foo : "bar" }', () => {
    assert.strictEqual(guardedfn({ foo: 'bar' }), true)
  })
  it('should not throw error if arg is null', () => {
    assert.strictEqual(guardedfn(null), true)
  })
  it('should not throw error if arg is 1', () => {
    assert.strictEqual(guardedfn(1), true)
  })
  it('should throw error if arg is “1”', () => {
    assert.match(guardedfn('1'), /!fnguard.check.isnotstr\( “1” \)/)
  })
  it('should throw error showing at most 30 chars if str length > 30', () => {
    assert.match(guardedfn(
      '01234567890123456789012345678901234567890123456789012345678901234567890'
    ), /!fnguard.check.isnotstr\( “012345678901234567890123456789…” \)/)
  })
})
