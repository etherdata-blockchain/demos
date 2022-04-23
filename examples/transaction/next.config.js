/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["ui", "file-storage-contract"]);

module.exports = withTM({
  reactStrictMode: true,
});