const puppeteer = require('puppeteer')
const { toMatchImageSnapshot } = require('jest-image-snapshot')
expect.extend({ toMatchImageSnapshot })

describe('Visual Regression Testing', () => {
    let browser
    let page

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false })
        page = await browser.newPage()
    })

    afterAll(async () => {
        await browser.close()
    })

    it('Full page snapshot', async () => {
        await page.goto('https://www.example.com')
        await page.waitForSelector('h1')
        const image = await page.screenshot()
        expect(image).toMatchImageSnapshot()
        // expect(image).toMatchImageSnapshot({
        //     failureThresholdType: 'pixel',
        //     failureThreshold: 500,
        // })
    })
})
