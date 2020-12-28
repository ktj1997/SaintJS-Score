const Row = require("../Row");
const crawling = async (page) => {
  let ret = new Array();
  rowRet = await page.evaluate(() => {
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
  rowRet.forEach((element) => {
    ret.push(new Row(element));
  });
  return ret;
};
module.exports = crawling;
