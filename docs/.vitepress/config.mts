import { defineConfig } from "vitepress";
import { tabsMarkdownPlugin } from "vitepress-plugin-tabs";
import yaml from "js-yaml";
import fs from "fs";

const loadSidebar = () => {
  const yamlString = fs.readFileSync("docs/sidebar.yml", "utf8");
  return yaml.load(yamlString);
};


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "X1 Blockchain Documentation",
  description:
    "X1 blockchain is a high performance, high throughput, monolithic L1 with a mission to provide a decentralised, censorship-resistant multi-purpose infrastructure that empowers the freedom to transact with minimal technical and economic limitations.",
  themeConfig: {
    logo: {
      dark: "/img/x1-logo.svg",
      light: "/img/x1-logo-light.svg",
    },
    siteTitle: "Documentation",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Explorer", link: "https://explorer.x1.xyz/" },
      { text: "TPS", link: "https://preview.xen.network/x1/dashboard" },
      { text: "Validators", link: "https://x1val.online/" },
    ],

    sidebar: loadSidebar(),

    socialLinks: [
      { icon: "x", link: "https://x.com/x1_chain" },
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    search: {
      provider: "local",
    },

    outline: {
      level: [2,3],
    }
  },
  cleanUrls: true,

  markdown: {
    config(md) {
      md.use(tabsMarkdownPlugin);
    },
  },

  rewrites: {
    "README.md": "index.md",
    "(.*)/README.md": "(.*)/index.md",
  },
});
