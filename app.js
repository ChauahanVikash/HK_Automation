const puppeteer = require('puppeteer')
const {answers} = require("./Solns")
const emailPass = require("./secrets")

const ans = 
`#include <bits/stdc++.h>
using namespace std;

int main(){
    int number_of_elements;
    cin >> number_of_elements;
    vector <int> array(number_of_elements);
    int sum_of_array = 0;
    
    for(int i = 0; i < number_of_elements; i++){
       cin >> array[i];
       sum_of_array += array[i];
    }
    
    cout << sum_of_array;
    return 0;
}`;

let loginLink = "https://www.hackerrank.com/auth/login";
let browserOpenPrmoise = puppeteer.launch({
    headless:false ,
    defaultViewport : null, 
    args : ['--start-maximized' , '--disable-notifications']
});
let page, browser ;
browserOpenPrmoise.then(function(browserGivenbyBrowserOpenPrmoise){
    browser = browserGivenbyBrowserOpenPrmoise ;
    let browserTabOpenPromise = browser.newPage();
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
}).then(function(){
    let wait2sPro = page.waitForTimeout(2000);
    return wait2sPro ;
}).then(function (){
    let cliked_warmCB = waitAndClick("input[value='warmup']", page);
    return cliked_warmCB;
}).then(function(){
    let wait2sPro = page.waitForTimeout(3000);
    return wait2sPro ;
}).then(function(){
    //let click_quesPro = waitAndClick(".content--list_body", page);
    let quesArrPro = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", {delay :100})
    return quesArrPro ;
}).then(function(quesArr){
    //console.log(quesArr);
    console.log("length : ", quesArr.length);
    //return quesArr[0].click();
    let quessolvePro = quesSolver(page , quesArr[0] , ans);
    return quessolvePro;
}).then(function(){
    console.log("reached");
}).catch(function(err){
    console.log(err)
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
function quesSolver(page , ques , ans){
    return new Promise(function(resolve , reject){
        console.log("in quesSolve");
        let quesclickPro = ques.click();
        console.log("in quesSolvepro");
        quesclickPro
        .then(function(){
        let getEditorinFocusp = waitAndClick(".monaco-editor.no-user-select.vs", page ) ;
        return getEditorinFocusp;
        }).then(function(){
            return page.keyboard.down("Control" , {delay:100});
        }).then(function(){
            return page.keyboard.press("A" , {delay : 50});
        }).then(function(){
            return page.keyboard.press("X" , {delay : 50});
        }).then(function(){
            return page.keyboard.up("Control" , {delay:100});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject(err);
        })
    })
}