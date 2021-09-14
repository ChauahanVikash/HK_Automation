const puppeteer = require('puppeteer')
const {answers} = require("./Solns")
const emailPass = require("./secrets")

let loginLink = "https://www.hackerrank.com/auth/login";
let browserOpenPrmoise = puppeteer.launch({
    headless:false ,
    defaultViewport : null, 
    args : ["--start-maximized" , "--disable-notifications"]
});
let page, browser ;
browserOpenPrmoise.then(function(browserGivenbyBrowserOpenPrmoise){
    browser = browserGivenbyBrowserOpenPrmoise ;
    let browserTabOpenPromise = browserGivenbyBrowserOpenPrmoise.newPage();
    return browserTabOpenPromise;
}).then(function (tabGievnbyBrowserTabOpenPromise){
    page = tabGievnbyBrowserTabOpenPromise;
    let hkOpenPro = page.goto(loginLink);
    return hkOpenPro ;
}).then(function(){
    let emailEnterPromise = page.type("input[id = 'input-1']" , emailPass.email , {delay : 100});
    return emailEnterPromise ;
}).then(function(){
    let passEnterPromise = page.type("input[id = 'input-2']" , emailPass.pass , {delay : 100});
    return passEnterPromise ;
}).then(function(){
    let loginClickPro = page.click("button[data-analytics='LoginPassword']", {delay : 50})
    return loginClickPro ;
})