const puppeteer = require("puppeteer");
const dotenv = require("dotenv");

dotenv.config();

const crawler = async () =>{
    try{
        const browser = await puppeteer.launch({headless:false})
        const page = await browser.newPage()
    
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36");
        await page.goto(process.env.HOME_PAGE);
        
        await page.evaluate((id,password) =>{
            document.getElementById("logonuidfield").value=id;
            document.getElementById("logonpassfield").value=password;
            document.getElementById("logonForm").submit();
        },process.env.SCHOOLNUM,process.env.PASSWORD);
        
        await page.waitForTimeout(2000);
        await page.goto(process.env.SCORE_PAGE);
        
        await page.waitForTimeout(2000);
        await page.keyboard.press("Escape");
        
        ret = await page.evaluate(()=> {
           const rows = document.querySelectorAll("#WD019A-contentTBody>tr");
           let rowRet = new Array();
            rows.forEach((row) =>{
                let colRet = new Array();
                const cols = row.querySelectorAll(".urSTC>span>span");    
                cols.forEach((col) =>{
                    colRet.push(col.textContent);            
                })
                rowRet.push(colRet);
            })
            return rowRet;
        });
        console.log(ret);
        }catch(e){
           console.error(e);
       }
}
crawler();