/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    setupFiles: ["./src/setup-test-env.ts"],
    include: ["**/__tests__/**/*.test.?(c|m)[jt]s?(x)"],
    coverage: {
      all: true,
      skipFull: true,
      reportOnFailure: true,
      reporter: ["html", "text"],
      provider: "v8",
      thresholds: {
        statements: 100,
        branches: 100,
        functions: 100,
        lines: 100,
      },
      include: ["src/*", "testing/*"],
      exclude: ["src/index.ts", "src/types/*", "src/constants/*", "**/__tests__/*.ts"],
    },
  },
  define: {},
});
