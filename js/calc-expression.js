const assert = require('assert');

function calc(expression) {
    let expr = expression;
    const inBrackets = /(-)?(?:\()([^()]+)(?:\))/;

    while (inBrackets.test(expr)) {
        expr = expr.replace(
            inBrackets,
            (match, sign, subExpression) => (sign ? -1 * simpleCalc(subExpression) : simpleCalc(subExpression))
        );
    }

    return Number(simpleCalc(expr));
}

function simpleCalc(expr) {
    const number = '(?:-)?(?:\\d+)(?:\\.\\d+)?';
    const primaryAction = '\\s?[*/]\\s?';
    const secondaryAction = '\\s?[+-]\\s?';
    const prime = new RegExp(`(${number})(${primaryAction})(${number})`);
    const second = new RegExp(`(${number})(${secondaryAction})(${number})`);
    let result = expr;

    while (prime.test(result)) {
        result = result.replace(prime, (match, a, o, b) => operation(Number(a), Number(b), o.trim()));
    }

    while (second.test(result)) {
        result = result.replace(second, (match, a, o, b) => operation(Number(a), Number(b), o.trim()));
    }

    return result;
}

function operation(a, b, o) {
    switch (o) {
        case '+':
            return a + b;

        case '-':
            return a - b;

        case '*':
            return a * b;

        case '/':
            return a / b;

        default:
            throw Error(`Unknown operation ${o}`);
    }
}

[
    ['12 *-1', -12],
    ['12* 123/-(-5 + 2)', 492],
    ['((80 - (19)))', 61],
    ['(1 - 2) + -(-(-(-4)))', 3],
    ['1 - -(-(-(-4)))', -3],
    ['12* 123/(-5 + 2)', -492],
    ['(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ', 1],
    ['1+1', 2],
    ['1 - 1', 0],
    ['1* 1', 1],
    ['1 /1', 1],
    ['-123', -123],
    ['123', 123],
    ['2 /2+3 * 4.75- -6', 21.25],
    ['12* 123', 1476],
    ['12 * -123', -1476],
    ['2 / (2 + 3) * 4.33 - -6', 7.732],
    ['((2.33 / (2.9+3.5)*4) - -6)', 7.45625],
    ['123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11', -12042.760875],
].forEach(([expr, result]) => {
    // calc(expr);
    assert.equal(calc(expr), result, `Expected: "${expr}" to be ${result}  but got ${calc(expr)}`);
});
