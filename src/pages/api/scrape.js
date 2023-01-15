import { load } from "cheerio";
import puppeteer from "puppeteer";

const testUrl = "https://www.kabum.com.br/hardware/processadores";

export default async function handler(req, res) {
  const method = req.method;

  if (method === "GET") {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(testUrl);
    const html = await page.content();

    const $ = load(html);

    const products = [];

    $(".productCard").each((i, el) => {
      const title = $(".nameCard", el).text();
      const price = $(".priceCard", el).text();
      const link = "www.kabum.com.br" + $(".htpbqG", el).attr("href");
      products.push({ title, price, link });
    });

    console.log(products);
    res.status(200).json(products);
  } else {
    res.send("Method not allowed");
  }
}
