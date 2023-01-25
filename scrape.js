const { load } = require("cheerio");
const puppeteer = require("puppeteer");

export default async function handler(req, res) {
  const method = req.method;

  if (method === "POST") {
    const { url } = req.body;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();

    const $ = load(html);

    const products = [];

    $(".productCard").each((i, el) => {
      const title = $(".nameCard", el).text();
      const price = parseFloat(
        $(".priceCard", el).text().slice(3, 999).replace(",", ".")
      );
      const link = "www.kabum.com.br" + $(".htpbqG", el).attr("href");
      products.push({ title, price, link });
    });

    console.log(products);
    res.status(200).json({ size: products.length, products });
  } else {
    res.send("Method not allowed");
  }
}
