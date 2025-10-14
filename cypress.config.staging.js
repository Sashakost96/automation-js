const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/results/json",
      overwrite: false,
      html: false,
      json: true,
      timestamp: "ddmmyyyy_HHMMss",
    },

    baseUrl: "https://guest:welcome2qauto@qauto2.forstudy.space",

    setupNodeEvents(on, config) {
      config.env.environment = "staging";
      return config;
    },
  },
});
