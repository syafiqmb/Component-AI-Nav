import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";
import path from "path";

// export default defineConfig({
//   build: {
//     lib: {
//       entry: "./src/index.ts", // Specifies the entry point for building the library.
//       name: "componentAINav", // Sets the name of the generated library.
//       fileName: (format) => `index.${format}.js`, // Generates the output file name based on the format.
//       formats: ["es"], // Specifies the output formats (CommonJS and ES modules).
//     },
//     rollupOptions: {
//       external: [...Object.keys(peerDependencies)], // Defines external dependencies for Rollup bundling.
//     },
//     sourcemap: true, // Generates source maps for debugging.
//     emptyOutDir: true, // Clears the output directory before building.
//   },
//   css: {
//     preprocessorOptions: {
//       scss: {
//         additionalData: `@import "src/styles/variables.scss";`, // Adjust path as necessary
//       },
//     },
//     modules: {
//       scopeBehaviour: "local", // Use 'global' if you want global CSS Modules
//       globalModulePaths: [/global\.css$/], // Regex for files treated as global CSS Modules
//     },
//   },
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "src"), // Optional: Setup path alias
//     },
//   },
//   plugins: [dts()], // Uses the 'vite-plugin-dts' plugin for generating TypeScript declaration files (d.ts).
// });

import react from "@vitejs/plugin-react-swc";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "componentAINav",
      fileName: (format) => `componentAINav.${format}.js`,
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
