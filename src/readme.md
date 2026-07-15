Add these scripts to package.json

  "start": "node dist/server.js",

  "dev": "tsx watch ./src/server.ts",

  "build": "tsc",











Command: [npm i tsup]


<!-- creat a file with this name -->
<!-- tsup.config.ts -->

import { defineConfig } from "tsup";

<!-- 
creat a file in root with name tsup.config.ts and pest this code


1
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
 -->



export default defineConfig({

 entry: ["src/server.ts"],

 format: ["esm", "cjs"], // Keep this as ESM

 target: "esnext",

 outDir: "dist",

 clean: true,

 bundle: true,

 splitting: false,

 sourcemap: true,

 // Add this banner to shim require() for CJS dependencies


Add these scripts to package.json

  "start": "node dist/server.js",

  "dev": "tsx watch ./src/server.ts",

  "build": "tsc",











Command: [npm i tsup]

tsup.config.ts

import { defineConfig } from "tsup";





export default defineConfig({

 entry: ["src/server.ts"],

 format: ["esm", "cjs"], // Keep this as ESM

 target: "esnext",

 outDir: "dist",

 clean: true,

 bundle: true,

 splitting: false,

 sourcemap: true,

 // Add this banner to shim require() for CJS dependencies

 banner: {

  js: `

   import { createRequire } from 'module';

   const require = createRequire(import.meta.url);

  `,

 },

});













Add these lines to tsconfig.json

"include": ["src/**/*"],

 "exclude": []











Command: [npm i -g vercel, vercel login, vercel –prod] 

vercel.json

{

 "version": 2,

 "builds": [

  {

   "src": "dist/server.js",

   "use": "@vercel/node"

  }

 ],

 "routes": [

  {

   "src": "/(.*)",

   "dest": "dist/server.js"

  }

 ]

}


