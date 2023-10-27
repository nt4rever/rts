const path = require("path");

module.exports = {
  // debug: process.env.NODE_ENV === "development",
  i18n: {
    defaultLocale: "vi",
    locales: ["en", "vi"],
    localeDetection: false,
    nsSeparator: '.',
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: process.env.NODE_ENV === "development",
};
