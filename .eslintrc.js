module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parseOptions: {
        sourceType: "script",
      },
    },
  ],
  parseOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {},
};
