/**
 * Created by raphael.edwards.
 */

var async = require('async');
var action = require('./../action');
var log = require('./../log');

module.exports = {
    //Check Budget Page Elements
	budgetPageElems: function (type, home, budget) {
		async.series([
			function (callback) {
                action.validateurl(home['baseurl']+budget['budgeturlslug']);
                callback();
            },
			function (callback) {
                action.validateelementtext(type['xpath'], budget['budgetbtnXP'], home['budgetbtntext'], 'Budget Button');
                action.validateelementtext(type['xpath'], budget['reportsbtnXP'], home['reportsbtntext'], 'Reports Button');
                callback();
            },
			function (callback) {
                action.validateelementtext(type['xpath'], budget['firstcolumnXP'], budget['firstcolumntext'], 'First Column Text');
                action.validateelementtext(type['xpath'], budget['secondcolumnXP'], budget['secondcolumntext'], 'Second Column Text');
                action.validateelementtext(type['xpath'], budget['thirdcolumnXP'], budget['thirdcolumntext'], 'Third Column Text');
                callback();
            },
            function (callback) {
				action.validateelementtext(type['xpath'], budget['inflowtextXP'], budget['inflowtext'], 'Total Inflow Text');
				action.validateelementtext(type['xpath'], budget['outflowtextXP'], budget['outflowtext'], 'Total Outflow Text');
				action.validateelementtext(type['xpath'], budget['balancetextXP'], budget['balancetext'], 'Working Balance Text');
				callback();
            }],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	},

	//Check Reports Inflow Page Elements
	reportsInflowPageElems: function (type, home, budget, reports) {
		async.series([
			function (callback) {
				action.clickElement(type['xpath'], reports['inflowoutflowbtnXP'], 'Inflow vs Outflow Tab')
				action.validateurl(home['baseurl']+reports['inflowurlslug']);
				callback();
			},
			function (callback) {
				action.validateelementtext(type['xpath'], budget['budgetbtnXP'], home['budgetbtntext'], 'Budget Button');
				action.validateelementtext(type['xpath'], budget['reportsbtnXP'], home['reportsbtntext'], 'Reports Button');
				callback();
            },
			function (callback) {
				action.validateelementtext(type['xpath'], reports['inflowoutflowbtnXP'], reports['inflowoutflowbtntext'], 'Inflow vs Outflow Tab');
				action.validateelementtext(type['xpath'], reports['spendingbycatbtnXP'], reports['spendingbycatbtntext'], 'Spending by Category Tab');
				callback();
			},
			function (callback) {
				action.validateelementtext(type['xpath'], reports['firsttextXP'], reports['firstelemtext'], 'First Text');
				action.validateelementtext(type['xpath'], reports['secondtextXP'], reports['secondelemtext'], 'Second Text');
				action.validateelementtext(type['xpath'], reports['thirdtextXP'], reports['thirdelemtext'], 'Third Text');
				action.validateelementtext(type['xpath'], reports['fourthtextXP'], reports['fourthelemtext'], 'Fourth Text');
				callback();
			}],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	},
	//Check Reports Spending Page Elements
	reportsSpendingPageElems: function (type, home, budget, reports) {
		async.series([
			function (callback) {
				action.clickElement(type['xpath'], reports['spendingbycatbtnXP'], 'Spending By Category Tab');
				action.validateurl(home['baseurl']+reports['spendingurlslug']);
				callback();
			},
			function (callback) {
				action.validateelementtext(type['xpath'], budget['budgetbtnXP'], home['budgetbtntext'], 'Budget Button');
				action.validateelementtext(type['xpath'], budget['reportsbtnXP'], home['reportsbtntext'], 'Reports Button');
				callback();
			},
			function (callback) {
				action.validateelementtext(type['xpath'], reports['inflowoutflowbtnXP'], reports['inflowoutflowbtntext'], 'Inflow vs Outflow Tab');
				action.validateelementtext(type['xpath'], reports['spendingbycatbtnXP'], reports['spendingbycatbtntext'], 'Spending by Category Tab');
				callback();
			},
			function (callback) {
				action.validateelementtext(type['xpath'], reports['firsttextXP'], reports['firstelemtext'], 'First Text');
				action.validateelementtext(type['xpath'], reports['secondtextXP'], reports['secondelemtext'], 'Second Text');
				action.validateelementtext(type['xpath'], reports['thirdtextXP'], reports['thirdelemtext'], 'Third Text');
				action.validateelementtext(type['xpath'], reports['fourthtextXP'], reports['fourthelemtext'], 'Fourth Text');
				callback();
			}],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	},

	//Toggle Landing Pages
	togglePages: function (type, home, budget, reports) {
		async.series([
			function (callback) {
                action.clickElement(type['xpath'], budget['reportsbtnXP'], 'Reports Button');
				action.validateurl(home['baseurl']+reports['inflowurlslug']);
                callback();
            },
			function (callback) {
				module.exports.reportsSpendingPageElems(type, home, budget, reports);
                module.exports.reportsInflowPageElems(type, home, budget, reports);
                callback();
            },
			function (callback) {
                action.clickElement(type['xpath'], budget['budgetbtnXP'], 'Budget Button');
                callback();
            },
			function (callback) {
                module.exports.budgetPageElems(type, home, budget);
                callback();
            }],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	},
	
	//Add Budget Category
	addCategory: function (type, budget) {
		async.series([
			function (callback) {
                action.clickElement(type['css'], budget['catdropdownboxCSS'], 'Category Dropdown Box');
				action.pauseTest(1000);
				action.clickElement(type['css'], budget['catdropdownoptionCSS'], 'Category Dropdown Option');
                callback();
            },
			function (callback) {
				action.enterText(type['css'], budget['desctextboxCSS'], 'Description Text Box', budget['descritiontext']);
                callback();
            },
			function (callback) {
                action.enterText(type['css'], budget['valuetextboxCSS'], 'Value Text Box', budget['valueamount']);
                callback();
            },
			function (callback) {
                action.valNewCategory(type['xpath'], budget['outflowamountXP'], type['css'], budget['addbutonCSS'],
				'Add Button', budget['valueamount']);
                callback();
            }],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	},
	//Compute Working Balance
	calculateBalance: function (type, budget){
		async.series([
			function (callback) {
				action.calculateBalance(type['xpath'], budget['inflowamountXP'], 'Inflow Amount', budget['outflowamountXP'],
				'Outflow Amount', budget['balanceamountXP'], 'Balance Amount');
			}],
			function (err, result) {
				if (err) {
					log.errorroutine(err);
				}
			}
		);
	}
}