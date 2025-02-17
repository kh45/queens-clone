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

    const extractBoardDimensions = $.extract({
      dimensions: {
        selector: 'div#queens-grid',
        value: 'style'
      }
    })

    // const $cells = $('[data-cell-idx]')
    const $cellsExtracted = $.extract({
      squares: [{
        selector: '[data-cell-idx]',
        value: 'aria-label'}]
    })

    console.log('SHOW ME THE $CELLS:', $cellsExtracted)
    console.log('here are the dimensions:', extractBoardDimensions)

    await browser.close();
  } catch (err) {
    console.error(err);
  }
})();