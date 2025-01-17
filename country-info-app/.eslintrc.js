// .eslintrc.js
module.exports = {
  extends: [
    'next',
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    // Puedes agregar reglas personalizadas aquí
    'react/react-in-jsx-scope': 'off', // Desactiva la regla que requiere React en el ámbito
    'react/prop-types': 'off', // Si no usas prop-types, desactiva esta regla
    'no-console': 'warn', // Da una advertencia si se usa `console.log`
    'prefer-const': 'warn', // Advierte si una variable puede declararse como `const`
    'no-unused-vars': 'warn', // Advierte sobre variables no utilizadas
  },
  settings: {
    react: {
      version: 'detect', // Detecta la versión de React que estás usando
    },
  },
}
