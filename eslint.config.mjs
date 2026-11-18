import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".claude/**",
  ]),
  {
    // Regeln är skriven för Pages Router. Med toppnivåroutern app/[city] tolkar den
    // varje intern <a href="/…"> som en stadssida och ger falsklarm. Interna länkar
    // ska ändå vara next/link (åtgärd 2.10).
    rules: { "@next/next/no-html-link-for-pages": "off" },
  },
]);

export default eslintConfig;
