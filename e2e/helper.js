/**
 * Created by raphael.edwards.
 */

var webdriver = require('selenium-webdriver');
var until = require('selenium-webdriver').until;
var assert = require('selenium-webdriver/testing/assert');
var async = require('async');
var logger = require('./log')

module.exports ={

    browser: null,

    addDriver:function(driver){
        module.exports.browser = driver;
    },

    elementpresent:function (type, element){
        switch(type) {
            case "css":
                return module.exports.browser.isElementPresent(webdriver.By.css(element));
            case "id":
                return module.exports.browser.isElementPresent(webdriver.By.id(element));
            case "xpath":
                return module.exports.browser.isElementPresent(webdriver.By.xpath(element));
            case "linkText":
                return module.exports.browser.isElementPresent(webdriver.By.linkText(element));
            case "name":
                return module.exports.browser.isElementPresent(webdriver.By.name(element));
            case "class":
                return module.exports.browser.isElementPresent(webdriver.By.className(element));
            default:
                return module.exports.browser.isElementPresent(webdriver.By.id(element));
        }
    },

    findelement: function (type, element){
        switch(type) {
            case "css":
                return module.exports.browser.findElement(webdriver.By.css(element));
            case "id":
                return module.exports.browser.findElement(webdriver.By.id(element));
            case "xpath":
                return module.exports.browser.findElement(webdriver.By.xpath(element));
            case "linkText":
                return module.exports.browser.findElement(webdriver.By.linkText(element));
            case "name":
                return module.exports.browser.findElement(webdriver.By.name(element));
            case "class":
                return module.exports.browser.findElement(webdriver.By.className(element));
            default:
                return module.exports.browser.findElement(webdriver.By.id(element));
        }

    },

    getRandomNumber: function (number) {
        var result = Math.floor((Math.random() * number) + 1);
        return result;
    },

    getMysqlDate: function () {
        var date;
        date = new Date();
        date = date.getFullYear() + '-' +
            ('00' + (date.getMonth() + 1)).slice(-2) + '-' +
            ('00' + date.getDate()).slice(-2) + ' ' +
            ('00' + date.getHours()).slice(-2) + ':' +
            ('00' + date.getMinutes()).slice(-2) + ':' +
            ('00' + date.getSeconds()).slice(-2) + ':' +
            ('000' + date.getMilliseconds()).slice(-3);

        return date;
    },

    setStartTime: function (start_time) {
        module.exports.start_time = start_time;
    },

    
}