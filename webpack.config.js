const path = require("path")

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filemane: "bundle.js"
    },
    watch: true
}