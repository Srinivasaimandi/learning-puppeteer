const puppeteer = require('puppeteer')
const mocha = require('mocha')
const expect = require('expect.js')
const LoginPage = require('../pageobjects/LoginPage')

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
        let loginPage = new LoginPage(page)

        // navigate to url and wait for login form
        await loginPage.load_app()

        // fill login form and submit the form
        // await loginPage.login("standard_user", "secret_sauce")
        await loginPage.iptUsername.fill("standard_user")
        await loginPage.iptPassword.fill("secret_sauce")
        await loginPage.btnLogin.click()
        await setTimeout(sleepTime)

        // wait for products page to load
        await page.waitForSelector(".inventory_item")
        await page.click("#item_4_title_link")
        await setTimeout(sleepTime)

        // add item to cart
        await page.waitForSelector(".inventory_details_name")
        await page.click("#add-to-cart")
        await setTimeout(sleepTime)

        // navigate to cart
        await page.click("[data-test='shopping-cart-link']")
        await setTimeout(sleepTime)

        // checkout
        await page.waitForSelector(".header_secondary_container span")
        await page.click('#checkout')
        await setTimeout(sleepTime)

        // fill checkout information and submit
        await page.type("#first-name", "Samuel")
        await page.type("#last-name", "David")
        await page.type("#postal-code", "600125")
        await page.click("#continue")
        await setTimeout(sleepTime)

        // check overview and finishit
        await page.waitForSelector(".header_secondary_container span")
        await page.click('#finish')
        await setTimeout(sleepTime)

        // validate order success message
        // "Thank you for your order!"
        let uploadSuccessMessage = await page.$eval("[data-test='complete-header']", span => span.innerText)
        await expect(uploadSuccessMessage).to.equal("Thank you for your order!")
        await setTimeout(sleepTime)
    })
})