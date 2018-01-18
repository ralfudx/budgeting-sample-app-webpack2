/**
 * Created by raphael.edwards.
 */

var budgetApp = require('../../framework/budgetApp.js');
var config = require('../../dataconfig');
var data = config.confData;
var test = require('selenium-webdriver/testing');
var framework = require('../../action.js');
var logs = require('../../log.js');

test.describe('budgetApp Sanity Suite', function() {

    test.beforeEach(function () {
        framework.launchBrowser();
        logs.gettestname(this.currentTest.title, this.currentTest.parent.title);
    });

    test.it('Check_Landing_Pages', function() {
        framework.openURL(data.home['baseurl'], data.home['pagetitle']);
        budgetApp.togglePages(data['type'], data['home'], data['budgetpage'], data['reportspage']);
    });
	test.it('Add_Budget_Category', function() {
        framework.openURL(data.home['baseurl'], data.home['pagetitle']);
		budgetApp.addCategory(data['type'], data['budgetpage']);
    });
	test.it('Compute_Working_Balance', function() {
        framework.openURL(data.home['baseurl'], data.home['pagetitle']);
		budgetApp.addCategory(data['type'], data['budgetpage']);
        budgetApp.calculateBalance(data['type'], data['budgetpage']);
    });


    test.afterEach(function () {
        framework.closeBrowser();
    });
});