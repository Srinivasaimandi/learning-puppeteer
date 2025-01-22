const puppeteer = require('puppeteer')
const mocha = require('mocha')

describe("Puppeteer Demo", function () {
    let browser
    let page
    let browserOptions = {
        headless: false,
        timeout: 15000
    }
    let viewportOptions = {
        width: 1280,
        height: 720
    }

    it('first test', async () => {
        browser = await puppeteer.launch(browserOptions)
        page = await browser.newPage()
        await page.setViewport(viewportOptions)
        console.log(await browser.version())
        await browser.close()
    })
})