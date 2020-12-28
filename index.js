const puppeteer = require("puppeteer");
const checkLogin = require("./func/checkLogin");
const crawling = require("./func/crawling");
/**
 *
 * @param {*} id
 * @param {*} password
 */
const crawler = async (id, password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let ret = null;
  let firstFlag = true;

  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );
    const login = await checkLogin(page, id, password);
    if (!login) throw "Invalid Id Or Password";

    await page.goto("https://ecc.ssu.ac.kr/sap/bc/webdynpro/SAP/ZCMB3W0017", {
      waitUntil: "networkidle0",
    });
    await page.keyboard.press("Escape");

    do {
      if (firstFlag) firstFlag = false;
      else {
        await page.evaluate(() => {
          document.querySelector("#WD018D").click();
        });
      }
      ret = await crawling(page);
    } while (ret == null || !Array.isArray(ret) || ret.length == 0);
    return ret;
  } catch (e) {
    console.error(e);
  } finally {
    browser.close();
  }
};
module.exports = crawler;
