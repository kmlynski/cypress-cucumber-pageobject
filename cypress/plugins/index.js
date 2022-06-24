const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = (on) => {
  const options = {
    typescript: require.resolve("typescript"),
  };

  on("file:preprocessor", cucumber(options));
};
