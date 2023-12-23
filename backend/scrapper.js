import KabumScrapper from "./src/scrappers/KabumScrapper.js";

async function main() {
  KabumScrapper.getPricesByCategory({ category: "Hardware", maxProducts: 100 });
}

// main();
