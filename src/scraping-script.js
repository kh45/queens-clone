import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio'
// Or import puppeteer from 'puppeteer-core';

// async function getHTML() {
//   const { data: html } = await axios.get('https://www.imdb.com/chart/top')
//   console.log('THIS IS IT:', html.data)
//   return html
// }

// getHTML()

(async function main() {
  try {
    const browser = await puppeteer.launch();
    const [page] = await browser.pages();

    await page.goto('https://www.linkedin.com/games/view/queens/desktop/', { waitUntil: 'networkidle0' });


    page.waitForSelector('button#ember19')

    // console.log('AM I HITTING THIS???')
    
    await page.click('button#ember19')

    page.waitForSelector('div#queens-grid')
    const data = await page.evaluate(() => document.querySelector('div#queens-grid').outerHTML);

    // console.log(data, 'at the end');

    const $ = cheerio.load(data)

    const $cells = $('[data-cell-idx]')

    console.log('SHOW ME THE $CELLS:', $cells)

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();



// Launch the browser and open a new blank page
const browser = await puppeteer.launch();
const page = await browser.newPage();

// Navigate the page to a URL.
// await page.goto('https://www.imdb.com/chart/top');

// console.log(page.content())

// // // Set screen size.
// // await page.setViewport({width: 1080, height: 1024});



// // // Type into search box.
// // await page.locator('.devsite-search-field').fill('automate beyond recorder');

// // // Wait and click on first result.
// // await page.locator('.devsite-result-item-link').click();

// // // Locate the full title with a unique string.
// // const textSelector = await page
// //   .locator('text/Customize and automate')
// //   .waitHandle();
// // const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // // Print the full title.
// // console.log('The title of this blog post is "%s".', fullTitle);

// await browser.close();