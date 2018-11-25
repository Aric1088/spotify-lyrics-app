const puppeteer = require("puppeteer");

const scrape_lyrics = async (artist, song_name) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.musixmatch.com/search/" + artist + "%20" + song_name
  );
  await page.waitFor(500);
  await page.click(
    "#search-all-results > div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a > span"
  );
  await page.waitFor(500);

  const part1 = await page.evaluate(
    () =>
      document.querySelector(
        "#site > div > div:nth-child(1) > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > p > span"
      ).textContent
  );
  const part2 = await page.evaluate(
    () =>
      document.querySelector(
        "#site > div > div:nth-child(1) > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > div > p > span"
      ).textContent
  );
  await browser.close();
  return part1 + "\n" + part2;
};

module.exports.scrape_lyrics = scrape_lyrics;
