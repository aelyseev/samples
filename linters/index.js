module.exports = {
    extends: [
        'eslint-config-airbnb-base',
        'eslint-config-airbnb-base/rules/strict',
    ].map(require.resolve),
    rules: {
        'comma-dangle': ['off'],
        'no-use-before-define': ['off'],
        'class-methods-use-this': ['off'],
        'max-len': ['warn', 120],
        indent: ['error', 4, { SwitchCase: 1 }],
    },
};

