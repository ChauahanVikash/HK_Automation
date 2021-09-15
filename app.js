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
}).then(function(){
    let clickedAlgoPro = waitAndClick("a[data-attr1='algorithms']" , page);
    return  clickedAlgoPro ;
}).then(function (){
    let cliked_warmCB = waitAndClick("input[value='warmup']", page);
    return cliked_warmCB;
}).then(function(){
    let wait2sPro = page.waitForTimeout(3000);
    console.log("Clicked");
    return wait2sPro ;
}).then(function(){
    let click_quesPro = waitAndClick(".content--list_body", page);
    return click_quesPro ;
}).then(function(){
    console.log("clicked");
})


function waitAndClick(selector , cpage){
    return new Promise(function (resolve , reject){
        let waitforSelecPro = cpage.waitForSelector(selector , {visible : true});
         waitforSelecPro.then(function(){
            let clickSelecPro = cpage.click(selector , {visible : true ,delay : 100});
            return clickSelecPro ;
         }).then(function(){
            resolve();
         }).catch(function (err){
            reject(err);
         })
    })
}