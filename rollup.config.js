import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import builtins from "builtin-modules";

var paths = {
  middleware: {
    input: "autotasks/middleware/middleware.ts",
    output: "dist/middleware/index.js",
  },
  logs: {
    input: "autotasks/logs/logs.ts",
    output: "dist/logs/index.js",
  },
  tatacuy: {
    input: "autotasks/tatacuy/tatacuy.ts",
    output: "dist/tatacuy/index.js",
  },
  wiracocha: {
    input: "autotasks/wiracocha/wiracocha.ts",
    output: "dist/wiracocha/index.js",
  },
  bottelegram: {
    input: "autotasks/bottelegram/bottelegram.ts",
    output: "dist/bottelegram/index.js",
  },
  tokens: {
    input: "autotasks/tokens/tokens.ts",
    output: "dist/tokens/index.js",
  },
};

export default (commandLineArgs) => {
  var { environment } = commandLineArgs;
  return {
    input: paths[environment].input,
    output: {
      file: paths[environment].output,
      format: "cjs",
    },
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs(),
      json({ compact: true }),
      typescript(),
    ],
    external: [
      ...builtins,
      "ethers",
      "web3",
      "axios",
      /^defender-relay-client(\/.*)?$/,
    ],
  };
};
