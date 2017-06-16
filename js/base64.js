/* eslint no-extend-native: 0 */

const assert = require('assert');

String.prototype.base64CodeMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

String.prototype.toBase64 = function r() {
    let base64 = '';
    const zeroes8 = '00000000';
    const map = this.base64CodeMap.split('');
    let bytesString = this.split('').reduce((acc, c) => {
        const code = c.charCodeAt(0).toString(2);
        return code.length <= 8 ? acc + (zeroes8 + code).slice(-8) : acc + (zeroes8 + code).slice(-16);
    }, '');

    const length24 = Math.ceil(bytesString.length / 24) * 24;
    const pads = (length24 - bytesString.length) / 8;

    bytesString = (bytesString + zeroes8 + zeroes8 + zeroes8).slice(0, length24 - (6 * pads));

    for (let k = 0; k < bytesString.length; k += 6) {
        base64 += map[parseInt(bytesString.slice(k, k + 6), 2)];
    }
    return base64 + Array(...new Array(pads)).map(() => '=').join('');
};

String.prototype.fromBase64 = function r() {
    const pads = this.replace(/.*?(=*)$/, '$1');
    let decodebase64 = '';
    const zeroes6 = '000000';
    const zeroes8 = '00000000';
    const encode = this.base64CodeMap.split('').reduce((acc, c, i) => {
        acc[c] = i;
        return acc;
    }, {});
    const str = (pads.length) ? this.slice(0, -1 * pads.length) : this;

    let bytesString = str.split('').reduce((acc, c) => {
        return acc + (zeroes6 + encode[c].toString(2)).slice(-6);
    }, '');

    const length24 = Math.ceil(bytesString.length / 24) * 24;

    bytesString = (bytesString + zeroes8 + zeroes8 + zeroes8).slice(0, length24 - (8 * pads.length));

    for (let k = 0; k < bytesString.length; k += 8) {
        decodebase64 += String.fromCharCode(parseInt(bytesString.slice(k, k + 8), 2));
    }

    return decodebase64;
};

assert.strictEqual('this is a string!!'.toBase64(), 'dGhpcyBpcyBhIHN0cmluZyEh');
assert.strictEqual('A'.toBase64(), 'QQ==');
assert.strictEqual('1'.toBase64(), 'MQ==');
assert.strictEqual('MQ=='.fromBase64(), '1');
assert.strictEqual('dGhpcyBpcyBhIHN0cmluZyEh'.fromBase64(), 'this is a string!!');
