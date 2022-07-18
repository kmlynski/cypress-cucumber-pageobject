const cucumber = require("cypress-cucumber-preprocessor").default;
const browserify = require("@cypress/browserify-preprocessor");
const tagify = require("cypress-tags");

module.exports = (on, config) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: require.resolve("typescript"),
  };

  on("file:preprocessor", (file) => {
    return file.filePath.includes(".feature")
      ? cucumber(options)(file)
      : tagify(config)(file);
  });
};
