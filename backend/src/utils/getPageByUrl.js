import puppeteer from "puppeteer";

async function getPageByUrl(url = "") {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  return page;
}

export default getPageByUrl;
