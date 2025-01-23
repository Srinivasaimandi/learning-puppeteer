class LoginPage {
    constructor(page) {
        this.page = page
        this.BASE_URL = "https://www.saucedemo.com/"
    }

    async load_app() {
        await this.page.goto(this.BASE_URL)
        await this.page.waitForSelector('.login_container');
    }
}
module.exports = LoginPage