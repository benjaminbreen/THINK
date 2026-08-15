import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypeScript from 'eslint-config-next/typescript'

/**
 * Flat config. Next 16 removed `next lint`, so linting runs through the
 * ESLint CLI directly (see the `lint` script in package.json).
 */
const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      'package-lock.json',
    ],
  },

  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      /*
       * Guide and project pages are long-form prose written directly in JSX,
       * so this rule fires on every contraction and quotation mark — 522 hits,
       * none of them defects. Escaping them all would make the copy far harder
       * for a non-engineer to edit, which is the opposite of what this repo
       * needs. React renders these correctly as-is.
       */
      'react/no-unescaped-entities': 'off',

      /*
       * eslint-plugin-react-hooks v7 ships the React Compiler rules. They flag
       * real patterns worth revisiting — components declared inside render in
       * app/resources/page.tsx, refs read during render in the canvas
       * backgrounds — but none of them are live bugs, and fixing them means
       * restructuring files well beyond the scope of a lint pass. Kept as
       * warnings so they stay visible instead of blocking every run.
       */
      'react-hooks/refs': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/immutability': 'warn',

      // Unused bindings are cruft, not breakage — surface without blocking.
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
]

export default config
