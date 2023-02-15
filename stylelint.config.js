module.exports = {
  plugin: ['stylelint-scss'],
  ignoreFiles: [
    // node_modulsディレクトリ配下にあるCSSを対象外する。
    '**/node_modules/**',
    './src/styles/base.scss'
  ],
  extends: [
    'stylelint-config-recommended-scss', // scssのための拡張ルール追加
    'stylelint-config-recess-order', // 視認性を考慮したcssプロパティの自動ソートを設定
    'stylelint-config-prettier', // Prettierとの競合ルールをOFFにする
  ],
  rules: {
    'order/properties-alphabetical-order': true, // アルファベット順
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['use', 'forward', 'include', 'mixin', 'each'],
      },
    ],
  },
};
