import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
  stylistic: {
    indent: 2,
    semi: true,
  }
}, {
  rules: {
    'no-console': 'warn',
    'antfu/no-top-level-await': 'off',
    'perfectionist/sort-imports': ["error", {
      internalPattern: ["~/**"],
    }],
    'unicorn/filename-case': ['error', {
      case: 'kebabCase',
    }]
  }
})
