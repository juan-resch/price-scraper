import { load } from "cheerio";
import fs from "fs";
import getKabumUrl from "./../utils/getKabumUrl.js";
import getPageByUrl from "./../utils/getPageByUrl.js";

export default class KabumScrapper {
  static async getPricesByCategory({ category, maxProducts = 100, page = 1 }) {
    const url = getKabumUrl({
      isCategory: true,
      category,
      page,
      maxProducts,
    });

    console.log("Scrapping Kabum...");
    console.log("Getting browser instance...");

    const browser = await getPageByUrl(url);
    const html = await browser.content();

    console.log("ok");

    console.log("Loading HTML content to cheerio...");
    let $ = load(html);

    const products = [];
    const links = []; // for individual scrapping

    console.log("Getting links for deep scrapping...");

    $(".productCard").each((i, el) => {
      const link = $(".htpbqG", el).attr("href");
      links.push(`https://kabum.com.br${link}`);
    });

    console.log("Found", links.length, "links.");
    console.log("Start deep scrapping...");

    let i = 1;

    for (const link of links) {
      console.log("Product:", i);
      i++;

      await browser.goto(link);
      const newHtml = await browser.content();

      $ = load(newHtml);

      const name = $(".gQusXy").text();
      const description = $("#description").text().trim();
      const inCashPrice = parseFloat(
        $(".finalPrice").text().slice(2, 999).replace(",", ".")
      );
      const installmentPrice = parseFloat(
        $(".regularPrice").text().slice(2, 999).replace(",", ".")
      );
      const categories = [];
      const images = [];

      $(".jgeTtK a").each((i, el) => {
        categories.push($("", el).text());
      });

      images.push($(".iiz__img").text());

      products.push({
        name,
        description,
        inCashPrice,
        installmentPrice,
        categories,
        images,
        link,
        store: "Kabum",
      });
    }

    console.log("Finished!");

    console.log({ size: products.length, products });

    fs.writeFileSync("./kabum.products.json", JSON.stringify(products));

    await browser.close();
  }
  static async getPricesByQuery(query) {}
}
