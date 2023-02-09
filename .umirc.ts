import { defineConfig } from "umi";

export default defineConfig({
  // routes: [
  //   { path: "/", component: "index" },
  //   { path: "/docs", component: "docs" },
  // ],
  npmClient: 'pnpm',
  clickToComponent: {},
  mfsu: false,

  alias: {
    // '@docs': resolve(__dirname, './docs'),
  },
});
