const checkLogin = async (page, id, password) => {
  try {
    await page.goto("https://saint.ssu.ac.kr", { waitUntil: "networkidle0" });
    await page.evaluate(
      (id, password) => {
        document.getElementById("logonuidfield").value = id;
        document.getElementById("logonpassfield").value = password;
        document.getElementById("logonForm").submit();
      },
      id,
      password
    );
    await page.on("dialog", (dialog) => {
      dialog.accept();
    });
    await page.waitForTimeout(1500);
    const success = await page.evaluate(() => {
      const navBar = document.querySelector(".mhList");
      if (navBar) return true;
      return false;
    });
    return success;
  } catch (e) {
    throw e;
  }
};
module.exports = checkLogin;
