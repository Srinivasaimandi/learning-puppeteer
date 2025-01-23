const puppeteer = require('puppeteer')
const mocha = require('mocha')
const expect = require('expect.js')

const { setTimeout } = require('node:timers/promises')

describe('E2E Demo', function () {
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

    it("eshop flow", async () => {
        // navigate to url and wait for login form
        await page.goto("https://www.saucedemo.com/")
        await page.waitForSelector(".login_container")

        // fill login form and submit the form
        await page.type("#user-name", "standard_user")
        await page.type("#password", "secret_sauce")
        await page.click("#login-button")

        // wait for products page to load
        await page.waitForSelector(".inventory_item")
        await page.click("#item_4_title_link")

        // add item to cart
        await page.waitForSelector(".inventory_details_name")
        await page.click("#add-to-cart")

        // navigate to cart
        await page.click("[data-test='shopping-cart-link']")

        // checkout
        await page.waitForSelector(".header_secondary_container span")
        await page.click('#checkout')

        // fill checkout information and submit
        await page.type("#first-name", "Samuel")
        await page.type("#last-name", "David")
        await page.type("#postal-code", "600125")
        await page.click("#continue")

        // check overview and finishit
        await page.waitForSelector(".header_secondary_container span")
        await page.click('#finish')

        // validate order success message
        // "Thank you for your order!"
        let uploadSuccessMessage = await page.$eval("[data-test='complete-header']", span => span.innerText)
        await expect(uploadSuccessMessage).to.equal("Thank you for your order!")
        await setTimeout(3000)
    })
})