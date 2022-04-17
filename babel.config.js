module.exports = (api) => {
  const prodMode = api.env("production");

  return {
    presets: [
      "@babel/preset-env",
      "@babel/preset-typescript",
      [
        "minify",
        prodMode && {
          removeConsole: {
            exclude: ["error", "info"],
          },
        },
      ].filter(Boolean),
    ],
    plugins: [
      "@babel/proposal-class-properties",
      "@babel/plugin-transform-regenerator",
      "@babel/proposal-object-rest-spread",
      "@babel/plugin-transform-runtime",
      "@babel/plugin-transform-async-to-generator",
    ],
  };
};
