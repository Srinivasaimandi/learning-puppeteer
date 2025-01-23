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
        // to enable debug mode
        devtools: false,
        args: ['--start-maximized'],
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

    // test hooks:
    // it.skip: skips the test
    // it.only: runs the test leaving the others unexecuted

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

    it('test-3: assertions', async () => {
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

    it('test-4: handling elements using selectors', async () => {
        await page.goto('https://saucedemo.com/')
        await page.waitForSelector('form')
        await page.type("input[placeholder='Username']", 'username', { delay: 50 })
        await page.type("#password", "password")
        await page.click("[data-test='login-button']")
        await page.waitForSelector(".error")
        await setTimeout(sleepTime)
    })

    it('test-5: handling multimedia', async () => {
        await page.goto('https://saucedemo.com/')
        await page.waitForSelector('form')
        // taking screenshot
        await page.screenshot({ path: "./snaps/images/handlingMultimedia.png" })
        // making pdfs
        await page.pdf({ path: "./snaps/pdfs/handlingMultimedia.pdf" })
    })

    it('test-6: device emulations', async () => {
        // this emulates the view port of the know device and opens the website on that device
        const { KnownDevices } = require("puppeteer")
        const iPhone = KnownDevices['iPhone 15']
        await page.emulate(iPhone)
        await page.goto('https://saucedemo.com/')
        await page.waitForSelector('form')
        // we can view the configuration information for the iPhone
        console.log(iPhone)
        await setTimeout(3000)
    })

    it("test-7: file uploads", async () => {
        await page.goto("https://qa-automation-practice.netlify.app/file-upload")
        await page.waitForSelector("h2")
        // making pdfs
        await page.pdf({ path: "./snaps/pdfs/uploadTestDemoFile.pdf" })
        // uploading the created pdf document
        const fileInput = await page.$("input[type='file']")
        const file = "./snaps/pdfs/uploadTestDemoFile.pdf"
        await fileInput.uploadFile(file)
        // submitting the upload form
        await page.click("button[type='Submit']")
        await page.waitForSelector("#file_upload_response")
        // code to fetch text of an item and validate it
        let uploadSuccessMessage = await page.$eval("#file_upload_response", span => span.innerText)
        await expect(uploadSuccessMessage).to.equal("You have successfully uploaded \"uploadTestDemoFile.pdf\"")
    })

    it("test-8: custom functions", async () => {
        await page.goto("https://qa-automation-practice.netlify.app/file-upload")
        await page.waitForSelector("h2")
        await logTitle(page)
    })
})

async function logTitle(page) {
    console.log("Log from custom function: " + await page.title())
}