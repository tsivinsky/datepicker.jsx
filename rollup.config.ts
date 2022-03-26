import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "./dist/datepicker.js",
      format: "esm",
      sourcemap: true,
    },
    {
      file: "./dist/datepicker.cjs",
      format: "cjs",
      sourcemap: true,
    },
  ],
  plugins: [external(), typescript({ tsconfig: "./tsconfig.json" }), terser()],
});
