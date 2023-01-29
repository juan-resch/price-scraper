import KabumScrapper from "./src/scrappers/KabumScrapper.js";

import fs from "fs";
async function main() {
  KabumScrapper.getPricesByCategory({ category: "Hardware", maxProducts: 100 });
}

// main();
fs.writeFileSync("./kabum.products.json", JSON.stringify([{ name: "Juan" }]));
