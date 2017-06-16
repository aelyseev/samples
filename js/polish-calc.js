const assert = require('assert');

function calc(expr) {
  const action = '\\+|-|\\*|\\/';

  if (!(new RegExp(`(?:${action})$`)).test(expr)) {
    return Number(expr.split(' ').pop()) || 0;
  }
  const digit = '\\d+(?:\\.\\d+)?';
  const [subexp, f, s, o] = expr.match(new RegExp(`(${digit})\\s(${digit})\\s(${action})`));
  const res = eval(`${f}${o}${s}`);
  return calc(expr.replace(subexp, res.toString()));
}

assert.equal(calc(''), 0, 'Should work with empty string');
assert.equal(calc('1 2 3'), 3, 'Should parse numbers');
assert.equal(calc('12 3.5'), 3.5, 'Should parse float numbers');
assert.equal(calc('1 3 +'), 4, 'Should support addition');
assert.equal(calc('1 3 *'), 3, 'Should support multiplication');
assert.equal(calc('1 3 -'), -2, 'Should support subtraction');
assert.equal(calc('4 2 /'), 2, 'Should support division');
assert.equal(calc('10000 123 +'), 10123, 'Should work with numbers longer than 1 digit');
assert.equal(calc('5 1 2 + 4 * + 3 -'), 14, 'Should work with complex expressions');
