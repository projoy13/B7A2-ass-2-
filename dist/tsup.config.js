import { defineConfig } from "tsup";
export default defineConfig({
    entry: ["src/server.ts"], // Change this if your entry file is different
    outDir: "dist",
    format: ["cjs"],
    target: "node20",
    clean: true,
    sourcemap: true,
    minify: false,
    splitting: false,
    dts: false,
    skipNodeModulesBundle: true
});
//# sourceMappingURL=tsup.config.js.map