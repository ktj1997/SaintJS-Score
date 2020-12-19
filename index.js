const puppeteer = require("puppeteer");
const Row = require("./Row");
/**
 * 
 * @param {*} id 
 * @param {*} password 
 */
const crawler = async (id,password) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try{
    const ret = new Array();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
    );

    const login = await checkLogin(page,id,password);
    if(!login){
      throw "Invalid Id Or Password";
    } 
    await page.goto("https://ecc.ssu.ac.kr/sap/bc/webdynpro/SAP/ZCMB3W0017",{waitUntil : "networkidle0"});
    await page.keyboard.press("Escape");
    
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
    rowRet.forEach((element) => {ret.push(new Row(element));});
    return ret;
  }catch(e){
    throw e;
  }finally{
      page.close()
      browser.close();
  }      
};
const checkLogin = async (page,id,password) =>{
  try{
      await page.goto("https://saint.ssu.ac.kr",{waitUntil : "networkidle0"});
      await page.evaluate(
          (id, password) => {
            document.getElementById("logonuidfield").value = id;
            document.getElementById("logonpassfield").value = password;
            document.getElementById("logonForm").submit();
          },
          id,
          password
        );
      await page.on(("dialog"),dialog =>{
          dialog.accept();
      })
      await page.waitForTimeout(2000);
      const success = await page.evaluate(() =>{
          const navBar = document.querySelector(".mhList");
          if(navBar)
              return true;
          return false;
      })
      return success;
  }catch(e){
      console.error(e);
  }
};
module.exports = crawler;
