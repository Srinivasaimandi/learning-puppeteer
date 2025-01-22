const puppeteer = require('puppeteer')
const mocha = require('mocha')
const expect = require('expect.js')

const { setTimeout } = require('node:timers/promises')

describe('Puppeteer Demo', function () {
    let browser
    let page
    let browserOptions = {
        headless: false,
        timeout: 15000,
        devtools: true
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

    // this skips the test
    it.skip('test-1', async () => {
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

    // only this test runs
    it.only('test-3: assertions', async () => {
        await page.goto('https://example.com/')

        // code to sleep using javascrip
        // await new Promise(r => setTimeout(r, 2000));
        await setTimeout(sleepTime)

        // code to be used when we want to debug a feature
        await page.evaluate(() => {
            debugger
        })

        const pageTitle = await page.title()
        const pageUrl = await page.url()
        // assertions
        expect(pageTitle).to.contain('Example Domain')
        expect(pageUrl).to.contain('example.com')
        // waiting for an element and this is by puppeteer
        await page.waitForSelector('h1')
    })
})
