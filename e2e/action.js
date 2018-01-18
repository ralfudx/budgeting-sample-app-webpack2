/**
 * Created by raphael.edwards.
 */

/*Common actions used by all tests in framework*/

var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var async = require('async');
var config = require('./dataconfig');
var data = config.confData;
var driver;
var log = require('./log');
var util =require('./helper');

module.exports = {
	
    browsername: null,

	//use this function to initialize a browser
    launchBrowser: function (browser) {

        if (typeof (browser) === 'undefined') { // initialize if driver variable
            browser = data.default_browser;
        }

        module.exports.browsername = browser;
        var selenium_address = 'http://' + ("localhost" || "52.214.205.71") + ':' + 4444 + '/wd/hub';
        driver = new webdriver.Builder().usingServer(selenium_address).withCapabilities({'browserName': browser}).build();

        //driver = new webdriver.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities({'browserName': browser}).build();

        util.addDriver(driver);
        log.addDriver(driver);

        driver.manage().deleteAllCookies();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(20000);
    },

	//use this function to send a url to a browser address bar
    openURL: function (url, title) {
        driver.manage().timeouts().pageLoadTimeout(120000);
        log.logtoconsole("Loading page...");

        driver.get(url).then(function () {}, function (err) {
            log.logtoconsole("Page did not load fully: " + err.state);
        });

        driver.manage().timeouts().implicitlyWait(20000);
        module.exports.validatePageTitle(title);
    },

	//use this function to close an existing browser
    closeBrowser: function (results, title) {
        driver.wait(function(){
            console.log("Quitting browser...");
            driver.quit();
            return true;
        }, 10000000);
    },

	//use this function to wait for page load to be complete
    waitUntilLoadingComplete: function (loaderxpath) {
        var elem = driver.findElement(webdriver.By.xpath(loaderxpath));
        driver.wait(until.elementIsNotVisible(elem));
    },

    clickElement: function (type, element, label) {
        module.exports.validateelementpresent(type, element, label);
        util.findelement(type, element).click().then(function () {
            log.logtoconsole(label+' clicked!')
            driver.manage().timeouts().implicitlyWait(100000)
        }, function (err) {
            log.errorroutine(err);
        });

    },

	//use this function to validate that new category amount is added to total flow
	valNewCategory: function (type, element, type2, element2, label, amount) {
		driver.wait(function () {
			util.findelement(type, element).getText().then(function(currentamount){
				log.logtoconsole('Current Total is = '+ currentamount);
				module.exports.clickElement(type2, element2, label);
				module.exports.pauseTest(2000);
				util.findelement(type, element).getText().then(function(newamount){
					var calcamount = parseInt(amount.replace(/\D/g,'')) + parseInt(currentamount.replace(/\D/g,''));
					var thenewamount = parseInt(newamount.replace(/\D/g,''));
					log.logtoconsole('Calculated Amount is = '+ calcamount/100);
					if (calcamount == thenewamount){
						log.logtoconsole('Validation === PASS :: ' + newamount + ' is Correct');
					}else{
						log.assertEqualto(thenewamount/100, calcamount/100, 'Amount:')
					}
				});
			});
			return true;
		}, 10000);
	},
	
	//use this function to validate that the working balance is well calculated
	calculateBalance: function (type, element1, label1, element2, label2, element3, label3){
		driver.wait(function () {
			util.findelement(type, element1).getText().then(function(inflow){
				util.findelement(type, element2).getText().then(function(outflow){
					util.findelement(type, element3).getText().then(function(balance){
						log.logtoconsole(label1 + ' is = '+ inflow);
						log.logtoconsole(label2 + ' is = '+ outflow);
						log.logtoconsole(label3 + ' is = '+ balance);
						//do calculations here...
						var calcamount = parseInt(inflow.replace(/\D/g,'')) - parseInt(outflow.replace(/\D/g,''));
						var thebalance = parseInt(balance.replace(/\D/g,''));
						log.logtoconsole('Calculated Amount is = '+ calcamount/100);
						if (calcamount == thebalance){
							log.logtoconsole('Validation === PASS :: ' + balance + ' is Correct');
						}else{
							log.assertEqualto(thebalance/100, calcamount/100, 'Working Balance:');
						}
					});
				});
			});
			return true;
		}, 10000);
	},

    //Use this function to send keys with any selector
    enterText: function (type, element, label, text) {
        module.exports.validateelementpresent(type, element, label);
        util.findelement(type, element).sendKeys(text).then(function(){
            log.logtoconsole('\"'+text+'\"' +' entered into '+label)
        },
            function(err){
            log.errorroutine(err)
        });

    },


    scrolldown: function (hor, ver) {
        var script = '"window.scrollBy(' + hor + ',' + ver + ')", ""';
        driver.executeScript(script);
    },

    scrollto: function (hor, ver) {
        var script = "window.scrollTo('" + hor + "','" + ver + "')";
        driver.executeScript(script);
    },

    scrollToTop: function () {
        var script = "window.scrollTo(0,-Math.max(document.documentElement.scrollHeight,document.body.scrollHeight,document.documentElement.clientHeight))";
        driver.executeScript(script);
    },

    scrollToEnd: function () {
        var script = "window.scrollTo(0,document.body.scrollHeight)";
        driver.executeScript(script);
    },
	
	//use this function to pause the test
    pauseTest: function(time){
        log.logtoconsole('Paused execution for '+ time/1000 + ' secs...') 
        driver.sleep(time)
    },


    //VALIDATIONS
	
	//use this function to validate the pagetitle
    validatePageTitle: function (Title) {
        log.logtoconsole("Validating page title...");
        driver.wait(driver.getTitle().then(function (title) {
			//log.logtoconsole("Actual Title: "+ title)
			//log.logtoconsole("Expected Title: "+ Title)
			if (title === Title) {
				log.logtoconsole('Page Title is displayed successfully!');
				return true;
			} else {
				log.assertEqualto(title, Title, 'Page:')
			}

		}),50000,'should be')
    },

    //Use this function to validate if any type of element is present
    validateelementpresent: function (type, element, label) {
        driver.manage().timeouts().implicitlyWait(120000);
       util.findelement(type, element).then(function (present) {
            if (present) {
                log.logtoconsole(label + " is present");
                return true;
            } else {
                log.assertTrue(label,'present',present)
            }
        });

    },

    //Use this function to validate if any type of element is displayed
    validateelementdisplayed: function (type, element, label) {
        driver.manage().timeouts().implicitlyWait(120000);
        module.exports.validateelementpresent(type, element, label);
        util.findelement(type, element).isDisplayed().then(function (Link) {
            //log.logtoconsole('Link = ' + Link);
            if (Link) {
                log.logtoconsole("Validation === PASS :: " + label + " is displayed");
                return true;
            } else {
                log.assertTrue(label,'displayed',Link)
            }
        }, function (err) {
            log.errorroutine(err);
        });
    },

    //Use this function to validate the text of any type of element
    validateelementtext: function (type, element, text, label) {
        module.exports.validateelementdisplayed(type, element, label);
        driver.manage().timeouts().implicitlyWait(120000);
        
        util.findelement(type, element).getText().then(function (Text) {
            //log.logtoconsole('Actual Text: ' + Text);
            //log.logtoconsole('Expected Text: ' + text);

            var link = (Text === text);

            if (link) {
                log.logtoconsole("Actual text:- \"" + Text + "\" is equal to Expected text:- \"" + text + "\"");
                return true;
            } else {
                log.assertEqualto(Text,text,label)
            }
        });
    },

	//Use this function to validate the url on a page
    validateurl: function (url) {
        driver.manage().timeouts().implicitlyWait(120000);
        driver.getCurrentUrl().then(function (link) {
			//log.logtoconsole('Actual URL is : ' + link);
			//log.logtoconsole('Expected URL is: ' + url);
            var check = (link === url);
			log.logtoconsole('Actual URL is equal to Expected URL? : ' + check);
            if (check) {
                log.logtoconsole("Correct URL Displayed: " + url);
                //log.logtoconsole('URL :' + link + ' is displayed');
				//log.logtoconsole('URL :' + url + ' should be displayed');
                return true;
            } else {
                log.assertEqualto(url,link,'Url');
            }
        });
    },

}