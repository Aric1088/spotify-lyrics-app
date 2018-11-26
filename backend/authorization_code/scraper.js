const puppeteer = require("puppeteer");

const scrape_musixmatch = async (artist, song_name) => {
  try {
    await page.goto("https://www.musixmatch.com/search/" + artist + " " + song_name);
    await page.waitFor(500);
    await page.click("#search-all-results > div.main-panel > div:nth-child(1) > div.box-content > div > ul > li > div > div.media-card-body > div > h2 > a > span");
    await page.waitFor(500);

    const part1 = await page.evaluate(() => document.querySelector("#site > div > div:nth-child(1) > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > p > span").textContent);
    const part2 = await page.evaluate(() => document.querySelector("#site > div > div:nth-child(1) > div > main > div > div > div.mxm-track-lyrics-container > div.container > div > div > div > div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics > span > div > p > span").textContent);

    await browser.close();
    return part1 + "\n" + part2;
  } catch (e) {
    console.log(e);
    await browser.close();
    return "No Lyrics Found";
  }
};
const scrape_lyrics = async (song_name, artist) => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  console.log("Looking for\nArtist: " + artist + "\nSong: " + song_name);
  try {
    console.log("Url: " + encodeURI("https://genius.com/search?q=" + artist +" "+ song_name));
    await page.goto(encodeURI("https://genius.com/search?q=" + artist + " " + song_name));
    await page.waitFor(500);
    try {
      await page.click("body > routable-page > ng-outlet > search-results-page > div > div.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div:nth-child(2) > search-result-section > div > div:nth-child(2) > search-result-items > div:nth-child(1) > search-result-item > div > mini-song-card > a");
    } catch (e) {
      try {
        await page.click("body > routable-page > ng-outlet > search-results-page > div > div.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div:nth-child(1) > search-result-section > div > div:nth-child(2) > search-result-items > div > search-result-item > div > mini-song-card > a");
      } catch (e) {

        console.log("No Lyrics Found");
        return "No Lyrics Found";
      }
    }
    await page.waitFor(750);
    const lyrics = await page.evaluate(() => document.querySelector("body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(2) > lyrics > div > div > section > p").innerText);
    await browser.close();
    return lyrics;
  } catch (e) {
    try {
      await page.goto(encodeURI("https://genius.com/search?q=" + song_name + " " + artist));
      await page.waitFor(500);
      try {
        await page.click("body > routable-page > ng-outlet > search-results-page > div > div.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div:nth-child(2) > search-result-section > div > div:nth-child(2) > search-result-items > div:nth-child(1) > search-result-item > div > mini-song-card > a");
      } catch (e) {
        try {
          await page.click("body > routable-page > ng-outlet > search-results-page > div > div.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div:nth-child(1) > search-result-section > div > div:nth-child(2) > search-result-items > div > search-result-item > div > mini-song-card > a");
        } catch (e) {
          console.log("err");
          return "No Lyrics Found";
        }
      }
      await page.waitFor(750);
      const lyrics = await page.evaluate(() => document.querySelector("body > routable-page > ng-outlet > song-page > div > div > div.song_body.column_layout > div.column_layout-column_span.column_layout-column_span--primary > div > defer-compile:nth-child(2) > lyrics > div > div > section > p").innerText);
      await browser.close();
      return lyrics;
    } catch (e) {
      console.log(e);
      await browser.close();
      return "No Lyrics Found";
    }
  }
};

module.exports.scrape_lyrics = scrape_lyrics;
module.exports.scrape_musixmatch = scrape_musixmatch;
