const TESTING_STORYBOOK = process.env.testing === "storybook";

module.exports = api => {
  const env = process.env.NODE_ENV;
  api.cache.using(() => env);

  return {
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"]
      }
    },
    presets: [
      [
        "@babel/preset-env",
        {
          modules: env === "test" ? "commonjs" : false,
          targets: TESTING_STORYBOOK
            ? {
                node: "current"
              }
            : {
                chrome: "66",
                ie: "11",
                firefox: "51",
                edge: "18",
                node: "current"
              }
        }
      ],
      "@babel/preset-react"
    ],
    plugins: [
      "react-require",
      [
        "@babel/plugin-proposal-class-properties",
        {
          loose: true
        }
      ],
      [
        "@babel/plugin-proposal-private-methods",
        {
          loose: true
        }
      ],
      [
        "@babel/plugin-proposal-private-property-in-object",
        {
          loose: true
        }
      ],
      "react-docgen"
    ]
  };
};
