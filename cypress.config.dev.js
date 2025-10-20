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

    baseUrl: "https://guest:welcome2qauto@qauto.forstudy.space",

    setupNodeEvents(on, config) {
      config.env.environment = "dev";
      return config;
    },
  },
});
