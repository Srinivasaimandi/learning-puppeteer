class LoginPage {
    constructor(page) {
        this.page = page
        this.base_url = "https://www.saucedemo.com/"
        this.iptUsername = "#user-name"
        this.iptPassword = "#password"
        this.btnLogin = "#login-button"
    }

    async load_app() {
        await this.page.goto(this.base_url)
        await this.page.waitForSelector('.login_container');
    }

    async login(username, password) {
        await this.page.type(this.iptUsername, username)
        await this.page.type(this.iptPassword, password)
        await this.page.click(this.btnLogin)
    }
}
module.exports = LoginPage