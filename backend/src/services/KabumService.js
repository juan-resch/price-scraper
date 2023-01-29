import { load } from "cheerio";
import getPageByUrl from "../utils/getPageByUrl.js";
import getKabumUrl from "./../utils/getKabumUrl.js";

class KabumService {
  static async getPricesByQuery(req, res) {
    try {
      const { query, pageNumber = 1 } = req.params;

      const page = await getPageByUrl(
        getKabumUrl({ pageNumber, pageSize: 20, query })
      );
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

      res.status(200).json({ size: products.length, products });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal server error.", msg: error.stack });
    }
  }
}

export default KabumService;
