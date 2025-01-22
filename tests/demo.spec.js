const puppeteer = require('puppeteer')
const mocha = require('mocha')
const { setTimeout } = require('node:timers/promises')

describe('Puppeteer Demo', function () {

    let browser
    let page
    let browserOptions = {
        headless: false,
        timeout: 15000,
    }
    let viewportOptions = {
        width: 1280,
        height: 720,
    }
    let sleepTime = 1000

    this.beforeEach(async () => {
        browser = await puppeteer.launch(browserOptions)
        page = await browser.newPage()
        await page.setViewport(viewportOptions)
    })

    this.afterEach(async () => {
        await browser.close()
    })

    it('test-1', async () => {
        await page.goto('https://example.com/')

        // code to sleep using javascrip
        // await new Promise(r => setTimeout(r, 2000));
        await setTimeout(sleepTime)

        // reloads the current webpage
        await page.reload()
        //navigates backward
        await page.goBack()
        await setTimeout(sleepTime)
        // navigates forward
        await page.goForward()
        await setTimeout(sleepTime)

        // fetches browser version
        console.log(await browser.version())
        // fetches page title
        console.log(await page.title())
        // fetches page url
        console.log(await page.url())
        console.log(await page.viewport())
    })

    it('test-2: demonstrating use of hooks', async () => {
        await page.goto('https://example.com/')

        // code to sleep using javascrip
        // await new Promise(r => setTimeout(r, 2000));
        await setTimeout(sleepTime)
    })
})
