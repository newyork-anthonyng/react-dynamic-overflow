const npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    commit: {
      script: "git cz",
      description: "Use commitizen for commit messages"
    },

    build: "webpack",

    lint: "eslint src/",

    pretty: "prettier --write src/**.js",

    test: {
      default: "jest",

      cover: "jest --coverage",

      watch: "jest --watch"
    },

    validate: {
      default: {
        description: "Run on Travis",
        script: npsUtils.concurrent.nps("test.cover", "lint", "build")
      },

      prepush: npsUtils.concurrent.nps("test.cover", "lint")
    },

    afterSuccess: "codecov"
  }
};
