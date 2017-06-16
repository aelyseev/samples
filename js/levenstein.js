const assert = require('assert');

class Dictionary {
    constructor(words) {
        this.words = words;
    }

    findMostSimilar(term) {
        let distance = Number.MAX_VALUE;
        return this.words.reduce((init, word) => {
            const d = this.levenstein(term, word);
            const similar = (d >= distance) ? init : word;
            distance = Math.min(d, distance);
            return similar;
        }, this.words[0]);
    }

    levenstein(a, b) {
        const matrix = [];

        if (a.length === 0) {
            return b.length;
        }
        if (b.length === 0) {
            return a.length;
        }

        // increment along the first column of each row
        for (let i = 0; i <= b.length; i += 1) {
            matrix[i] = [i];
        }

        // increment each column in the first row
        for (let j = 0; j <= a.length; j += 1) {
            matrix[0][j] = j;
        }

        // Fill in the rest of the matrix
        for (let i = 1; i <= b.length; i += 1) {
            for (let j = 1; j <= a.length; j += 1) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1, Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                    );
                }
            }
        }

        return matrix[b.length][a.length];
    }
}

const fruits = ['cherry', 'peach', 'pineapple', 'melon', 'strawberry', 'raspberry', 'apple', 'coconut', 'banana'];
fruits.sort(() => Math.random() > 0.5);
const m1 = new Dictionary(fruits);
assert.strictEqual(m1.findMostSimilar('strawbery'), 'strawberry');
assert.strictEqual(m1.findMostSimilar('berry'), 'cherry');
assert.strictEqual(m1.findMostSimilar('aple'), 'apple');

const words = ['stars', 'mars', 'wars', 'codec', 'code', 'codewars'];
words.sort(() => Math.random() > 0.5);
const m2 = new Dictionary(words);
assert.strictEqual(m2.findMostSimilar('coddwars'), 'codewars');

const langs = ['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript', 'c', 'cpp', 'brainfuck'];
langs.sort(() => Math.random() > 0.5);
const m3 = new Dictionary(langs);
assert.strictEqual(m3.findMostSimilar('heaven'), 'java');
assert.strictEqual(m3.findMostSimilar('javascript'), 'javascript');

const rands = ['psaysnhfrrqgxwik', 'pdyjrkaylryr', 'lnjhrzfrosinb', 'afirbipbmkamjzw', 'loogviwcojxgvi', 'iqkyztorburjgiudi', 'cwhyyzaorpvtnlfr', 'iroezmixmberfr', 'jhjyasikwyufr', 'tklquxrnhfiggb', 'cpnqknjyviusknmte', 'hwzsemiqxjwfk', 'ntwmwwmicnjvhtt', 'emvquxrvvlvwvsi', 'sefsknopiffajor', 'znystgvifufptxr', 'xuwahveztwoor', 'hrwuhmtxxvmygb', 'karpscdigdvucfr', 'xrgdgqfrldwk', 'nnsoamjkrzgldi', 'ljxzjjorwgb', 'cfvruditwcxr', 'eglanhfredaykxr', 'fxjskybblljqr', 'qifwqgdsijibor', 'xikoctmrhpvi', 'ajacizfrgxfumzpvi', 'mhmkakybpczjbb', 'vkholxrvjwisrk', 'npyrgrpbdfqhhncdi', 'pxyousorusjxxbt', 'jcocndjkyb', 'fxpvfhfrujjaifr', 'hkldhadcxrjbmkmcdi', 'hirldidcuzbyb', 'ggcvrtxrtnafw', 'tdvibqccxr', 'osbednerciaai', 'qojfrlhufr', 'kqijoorfkejdcxr', 'zqdrhpviqslik', 'clxmqmiycvidiyr', 'xffrkbdyjveb', 'dyhxgviphoptak', 'dihhiczkdwiofpr', 'riyhpvimgaliuxr', 'fgtrjakzlnaebxr', 'ppctybxgtleipb', 'ucxmdeudiycokfnb'];
rands.sort(() => Math.random() > 0.5);
const m4 = new Dictionary(rands);
assert.strictEqual(m4.findMostSimilar('rkacypviuburk'), 'zqdrhpviqslik');
