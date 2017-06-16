const assert = require('assert');

function nextBigger(n) {
    const digits = n.toString().split('').map(Number);

    for (let i = digits.length - 2; i >= 0; i -= 1) {
        if (digits[i] < digits[i + 1]) {
            const num = Math.min.apply(null, digits.slice(i + 1).filter(v => v > digits[i]));
            const right = digits.slice(i);
            const j = right.indexOf(num);
            right.splice(j, 1);
            right.sort();
            return Number(digits.slice(0, i).concat(num, right).join(''));
        }
    }
    return -1;
}

assert.equal(nextBigger(12), 21);
assert.equal(nextBigger(513), 531);
assert.equal(nextBigger(2017), 2071);
assert.equal(nextBigger(414), 441);
assert.equal(nextBigger(144), 414);

assert.equal(nextBigger(123456789), 123456798);
assert.equal(nextBigger(1234567890), 1234567908);
assert.equal(nextBigger(9876543210), -1);
assert.equal(nextBigger(9999999999), -1);
assert.equal(nextBigger(59884848459853), 59884848483559);
