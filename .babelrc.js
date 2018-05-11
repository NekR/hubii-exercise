module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        loose: true,
        targets: {
          browsers: true
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    ['@babel/plugin-transform-runtime', {
      polyfill: false
    }],
    '@babel/plugin-transform-regenerator',
    [
      '@babel/plugin-transform-react-jsx',
      {
        pragma: 'jsx',
        pragmaFrag: 'React.Fragment',
      },
    ],
  ],
};
