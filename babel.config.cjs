module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
          node: 'current'
        },
        corejs: {
          // `version` 값은 문자열. 마이너 버전까지 명시해줄 것을 권장함.
          // '3'으로 지정 시 '3.0'을 의미
          // 참고: https://babeljs.io/docs/en/babel-preset-env#corejs
          version: '3.19',
          proposals: true
        },
        debug: false,
        // `false` 값은 브라우저에서 ES 모듈을 사용할 경우에만 사용할 것.
        // 참고: https://babeljs.io/docs/en/babel-preset-env#modules
        // modules: false,
        modules: 'auto',
        useBuiltIns: 'usage'
      }
    ]
  ],
  plugins: [['@babel/plugin-transform-runtime']]
};
