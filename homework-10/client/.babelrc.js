const presets = [
    [
        '@babel/preset-env', {
            loose: true,

            targets: {
                node: 'current'
            },
        },
    ],
];

const plugins = [];

module.exports = {
    presets,
    plugins,
};