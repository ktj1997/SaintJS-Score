const puppeteer = require("puppeteer");
const dotenv = require("dotenv");
const Info = require("../model/Data");
dotenv.config();

const crawler = async (data) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    let ret = new Array();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );
    await page.goto(process.env.HOME_PAGE);

    await page.evaluate(
      (id, password) => {
        document.getElementById("logonuidfield").value = id;
        document.getElementById("logonpassfield").value = password;
        document.getElementById("logonForm").submit();
      },
      data.schoolNum,
      data.password
    );

    await page.waitForTimeout(2000);
    await page.goto(process.env.SCORE_PAGE);

    await page.waitForTimeout(2000);
    await page.keyboard.press("Escape");

    arr = await page.evaluate(() => {
      const rows = document.querySelectorAll("#WD019A-contentTBody>tr");
      let rowRet = new Array();
      rows.forEach((row) => {
        let colRet = new Array();
        const cols = row.querySelectorAll(".urSTC>span>span");
        cols.forEach((col) => {
          colRet.push(col.textContent);
        });
        if (colRet.length != 0) rowRet.push(colRet);
      });
      return rowRet;
    });
    page.close();
    browser.close();
    arr.forEach((element) => {
      ret.push(new Info(element));
    });
    return ret;
  } catch (e) {
    console.error(e);
  }
};
module.exports = crawler;
