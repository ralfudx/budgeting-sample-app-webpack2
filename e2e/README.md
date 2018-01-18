# Modus Create - Test Automation Assignment

## Summary

This coding exercise has been completed by creating a custom node.js framework using mocha as runner and mochawesome as the test reporter.
It comprises a test suite made up of 3 basic test scenarios (called sanity tests) and this includes a test scenario that fails (Compute_Working_Balance)
It also includes the ability to view the test report in HTML and JSON format (report is saved in: e2e/report/sanityTests)
Test Execution is achieved by simply typing "npm test" on cmd - after following the set-up steps below:


##Steps to set up Environment and Run Tests

	In order to set up your system to run the tests with Selenium Web driver using Mocha, you need to follow these simple steps: - if not done already,
	
	- Download and install node.js
			Before installing node.js, you need a java development kit (jdk) on your machine. (I used jdk8)
			You can download it from http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
			Navigate to https://nodejs.org/en/download/current/ where you can download the latest node.js pre-built installer for your platform.
			Run the installer package and follow the instructions. Node.js comes with the node package manager (npm). You now have npm and node.js installed.
	
	- Edit batch file for Selenium Hub
		You'll need to edit the two .bat files in the "server-hub" folder to point to your file path.
			*Grid Server: Open your text editor and edit the following text: "Java -jar C:\Selenium2\server-hub\selenium-server-standalone-3.0.1.jar -role hub -browserTimeout 240"
			Change this path to match the folder Selenium Standalone Server is located on your machine then save the file in the same location as Selenium Standalone Server.
			(please do not change the name “Grid Server.bat”)
			*Grid Nodes: Open your text editor and edit the following text: “Java -jar C:\Selenium2\server-hub\selenium-server-standalone-3.0.1.jar -role node -browser browserName=firefox,maxInstances=40 -browser browserName=chrome,maxInstances=40 -browser browserName=iexplore,maxInstances=5  -hub http://localhost:4444/grid/register"
			Change this path to match the folder Selenium Standalone Server is located on your machine then save the file in the same location as Selenium Standalone Server.
			(please do not change the name “Grid Nodes.bat”)
	
	- Download chrome driver and place in path
		Go to the "chromedriver_win32" folder and place the chrome driver in your system path by editing the system variable.
			*Right click on the "chromedriver.exe" file, click on "Properties" then copy “Location”.
			*Click on Control Panel >> System and Security >> System >> Advanced System Settings >> Environment Variables
			*Under “User variables”, scroll down and double-click on "Path"
			*Add a semi-colon and paste the Location you copied earlier then click "OK"
			*Finally confirm the path has been added by typing "path" in the command prompt.
	
	- Install mocha and mochawesome globally
			Install mocha globally by typing "npm install –g mocha" in command prompt.
			Install xunit-file globally by typing “npm install –g mochawesome in command prompt.
	
	- Start server and run tests
			Before running the tests you need to start the Selenium Server Hub by navigating to the "server-hub" folder and first clicking on “Grid Server” and then on “Grid Node”
			To run a test script from command prompt, simply change directory to the "e2e" folder then type: "npm test"
			After test is complete you can view console output on cmd or click on "report.html" to see HTML report of the test results.
	
--------------------------------------------------------------------------------------------------------
### TEST PLAN ###

##Introduction
	This test plan describes the testing approach and overall framework that will drive the testing of the Budgeting Application.
	The document introduces:
		Test Strategy:
			This provides rules the test will be based on, including objectives, assumptions, principles, test coverage, specific tasks to perform, and scheduling.
		Execution Strategy:
			This describes how the test will be performed and process to identify and report defects, and to fix and implement fixes

##Test Strategy

	#Test Objectives
		The objective of the test is to verify that the functionality of the Budgeting Application works according to the specifications. 
		The test will execute and verify the test scripts, identify, all high and medium severity defects per the entrance criteria and retest after fix then prioritize lower severity defects for future fixing and retesting.
		The final product of the test is twofold: 
			- A production-ready software;
			- A set of stable test scripts that can be reused for Sanity, Regression and Functional test execution.

	# Assumptions
		The following assumptions have been made in planning the testing of the application
			Sanity Testing will be carried out once the build is ready for testing
			Performance testing will not be carried out
			All high severity defects will come along with a snapshot JPEG/PNG format
			The Test Team will be provided with access to all feature dependent environments (api urls, database, dev env/test env)
			The Test Team assumes all necessary inputs required during Test design and execution will be supported by other teams appropriately.
			Test case design activities will be performed by the Test Team 
			Test environment and preparation activities will be owned by Test Team
			Dev team will provide Defect fix plans based on the Defect meetings during each sprint to plan. The same will be informed to Test team prior to start of Defect fix cycles
			The defects will be tracked through Project Management tool only. Any defect fixes planned will be shared with Test Team prior to applying the fixes on the Test environment
			The project management tool will provide test planning, test design and test execution support
			Test team will manage the testing effort with close coordination with other stakeholders (Project PM/Business Analyst)
			There is no environment downtime during test due to outages or defect fixes. 

	# Test Principles
		The following test principles have been defined for the application
			Testing will be focused on meeting the business objectives, cost efficiency, and QUALITY.
			There will be common, consistent procedures for all teams supporting testing activities. 
			Testing processes will be well defined, yet flexible, with the ability to change as needed. 
			Testing activities will build upon previous stages to avoid redundancy or duplication of effort.
			Testing will be a repeatable, quantifiable, and measurable activity (Automate as much as possible).
			Testing will be divided into distinct phases, each with clearly defined objectives and goals. 

	# Test Coverage
		This section describes the testing scope and levels of testing to be employed. it covers areas that are within scope and out of scope

			*Within Scope
				This section highlights areas covered
					-Sanity Tests
						The purpose of this test is to make sure critical defects are removed before the next levels of testing can start.
						It is carried out on the application with test scripts comprising the sanity suite
					
					-Functional Tests
						Functional testing will be performed to check the functions of application.
						The functional testing is carried out by feeding in input and validating the output from the application.
						Functional testing will be achieved by using preloaded data which is available on the system at the time of execution.



			*Out of Scope
				This section highlights areas that are not covered
					-Performance Testing:
						Performance testing allows to check the optimization level of application.
						It is carried out by load, stress and volume criteria while reporting average response time, CPU usage and slow queries associated with each endpoint/application.
						This includes both API and UI performance tests.

					-WebService/API Testing:
						The response received from this test varies with each endpoint, request type, request-object/payload and should be performed according to test scripts specifically designed for each endpoint.
					
					-User Acceptance Testing:
						This allows end users to complete one final review of the system prior to deployment.

					-Mobile Responsiveness:
						For mobile responsiveness, tests will utilize browsers available on Android, IOS platforms for both phone and tablet.
						However, test coverage in this regard will be dependent on analysis from the application monitoring tool used.
					
					-Distributed Test Execution:
						For better test coverage, test execution can be extended to run in simultaneously on other platforms (OS X) and major browsers like Internet Explorer, Firefox, and Safari.


##Execution Strategy

	# Validation and Defect Management
		It is expected that the testers execute all the scripts defined. However it is recognized that the testers could also do additional testing if they identify a possible gap in the scripts.
		If a gap is identified, the scripts will be updated and then a defect logged against the scripts.
		It is the responsibility of the test team to open the defects, link them to the corresponding script, assign an initial severity and status then retest and close the defect.
		it is the responsibility of the Project team to review the severity of the defects and facilitate with the technical team the fix and its implementation, communicate with testers when the test can continue or should be halt, request the tester to retest, and modify status as the defect progresses through the sprint.
		it is the responsibility of the technical team to review the program management tool on a daily basis, ask for details if necessary, fix the defect, communicate to the Project team that the fix is done, and implement the solution per the Project team’s request/acceptance criteria.
		Defects found during Testing will be categorized according to the project management/bug-reporting tool and the categories will include but are not limited to:
			Critical
			High
			Medium
			Low			

	# Defect Tracking and Reporting
		Standard process for defect tracking and reporting will be used. This should involve interaction from the development and test team until a resolution is found.
		Defect reporting will be accomplished via the project management tool which will in turn aid tracking.
		The format of reporting a defect/bug should include the following:
			Subject
			Description
			Environment
			Status
			Priority
			Defect/bug number (this should be auto-generated)
			Repro steps
			Label (sprint/iteration number)
			Assignee


## Test Environment
	The test environment can be accessed via http://localhost:3000
	Tests will be carried out in Windows environment using Google Chrome browser.

-----------------------------------------------------------------------------------------------------------------

	
## Automation Test Scenarios
	1. Verify landing Pages
	2. Add Budget Category
	3. Compute Working Balance***
		
		***It will be observed that the 3rd scenario fails due to the expectation of a negative balance after adding a category with a high outflow amount ($3000) making the Total Outflow greater than the Total Inflow.
		   However, the system does not compute a negative working balance - A workaround will be to reduce the "valueamount" (Edit the JSON file in e2e/test/budgetApp.json and change "budgetpage.valueamount" from $3000 to $1000) and then the test will PASS!
		   

	#Test Cases
		101 - Visit Home page
			-Steps:
				Go to baseURL [http://localhost:3000]
				Check Page URL
				Check Page Title
			-Expected Result:
				Home page is displayed successfully
				URL [http://localhost:3000/budget] is displayed successfully
				Page Title [Budgeting App - Educational React App] is displayed successfully
			-Result: PASS
				
		102 - Check Navigation buttons
			-Pre Condition : Visit Home page
			-Steps:
				Check first navigation button
				Check second navigation button
			-Expected Result:
				Budget button text is correct and displayed successfully
				Reports button text is correct and displayed successfully
			-Result: PASS
		
		103 - Check Table
			-Pre Condition: Visit Home page
			-Steps:
				Check header texts
				Check table columns and rows
			-Expected Result:
				Header texts are displayed successfully
				Table contents are displayed successfully
			-Result: PASS
			
		104 - Visit Reports Page
			-Pre Condition : Visit Home page
			-Steps:
				Click on "Reports" navigation button			
				Check Page URL				
				Check Page Title			
			-Expected Result:			
				Reports page is loaded and displayed successfully		
				URL [http://localhost:3000/inflow-outflow] is displayed successfully
				Page Title [Budgeting App - Educational React App] is displayed successfully			
			-Result: PASS
	
		105 - Check Reports Navigation Tabs	
			-Pre Condition : Visit Reports page	
			-Steps:			
				Check first navigation tab				
				Check second navigation tab			
			-Expected Result:		
				Inflow vs Outflow text is correct and tab is displayed successfully			
				Spending By Category text is correct and tab is displayed successfully		
			-Result: PASS	

		106 - Visit Inflow vs Outflow Page			
			-Pre Condition: Check Reports Navigation Tabs		
			-Steps:			
				Check page contents			
			-Expected Result:
				Inflow vs Outflow chart is displayed successfully
				INFLOW text and OUTFLOW text are displayed with corresponding amount				
				URL [http://localhost:3000/inflow-outflow] is displayed successfully
				Page Title [Budgeting App - Educational React App] is displayed successfully			
			-Result: PASS

		107 - Visit Spending By Category Page			
			-Pre Condition: Check Reports Navigation Tabs		
			-Steps:			
				Click "Spending By Category" navigation tab
				Check Page URL
				Check Page Title			
			-Expected Result:
				Spending by category chart is displayed successfully			
				URL [http://localhost:3000/spending] is displayed successfully
				Page Title [Budgeting App - Educational React App] is displayed successfully			
			-Result: PASS
	---------------------------------------
			
		201 - Fill Category Fields (Inflow)
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: Income)
				Enter a description (Example: Business)
				Enter a value amount (Example: 4000)
			Expected Result:
				The fields should be populated accordingly
				"ADD" button should be enabled
			Result : PASS
			
		202 - Fill Category Fields (Outflow)
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: School)
				Enter a description (Example: Tuition)
				Enter a value amount (Example: 3000)
			Expected Result:
				The fields should be populated accordingly
				"ADD" button should be enabled
			Result : PASS
			
		203 - Fill Category Fields (without description) - #Negative Scenario
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: School)
				Leave the description field blank
				Enter a value amount (Example: 3000)
			Expected Result:
				The other fields should be populated accordingly
				"ADD" button should be enabled
			Result : PASS
			
		204 - Fill Category Fields (without value) - #Negative Scenario
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: School)
				Enter a description (Example: Tuition)
				Leave the value field blank
			Expected Result:
				The other fields should be populated accordingly
				"ADD" button should NOT be enabled
			Result : PASS
			
		205 - Fill Category Fields (with invalid value) - #Negative Scenario
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: School)
				Enter a description (Example: Tuition)
				Enter an invalid value amount (Example: 1e2e3e)
			Expected Result:
				The fields should be populated accordingly
				"ADD" button should NOT be enabled
			Result : PASS
			
		206 - Fill Category Fields (with alphabetic value) - #Negative Scenario
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: School)
				Enter a description (Example: Tuition)
				Enter alphabets (apart from 'e') in value field (Example: willing)
			Expected Result:
				The other fields should be populated accordingly
				Value field should not be populated
				"ADD" button should NOT be enabled
			Result : PASS
			
		207 - Fill Category Fields (with exponential value) - #Negative Scenario
			-Pre Condition: Check Table
			-Steps
				Select a Category (Example: Income)
				Enter a description (Example: Business)
				Enter exponential value as value amount (Example: 3e5)
			Expected Result:
				The fields should be populated accordingly
				"ADD" button should be enabled
			Result : PASS
				
		208 - Add New Category (Inflow)
			-Pre Condition: Fill Category Fields (Inflow)
			-Steps:
				Click on "ADD" button
			-Expected Result:
				Category should be added successfully
				Total Inflow amount should be incremented accordingly ($6,802.00 + $4000.00 = $10,802.00)
			-Result: PASS
		
		209 - Add New Category (Outflow)
			-Pre Condition : Fill Category Fields (Outflow)
			-Steps:
				Click on "ADD" button
			-Expected Result:
				Category should be added successfully
				Total Outflow amount should be incremented accordingly ($4,588.07 + $3000.00 = $7,588.07)
			-Result: PASS
			
		210 - Add New Category (without description) - #Negative Scenario
			-Pre Condition : Fill Category Fields (without description)
			-Steps:
				Click on "ADD" button
			-Expected Result:
				Category should be added successfully
				Total Outflow amount should be incremented accordingly ($4,588.07 + $3000.00 = $7,588.07)
			-Result: PASS
			
		211 - Add New Category (with Invalid value) - #Negative Scenario
			-Pre Condition : Fill Category Fields (with invalid value)
			-Steps
				Click on "ADD" button
			-Expected Result:
				Category should NOT be added
				Total Outflow amount should remain the same
			-Result: PASS
			
		212 - Add New Category (with exponential value) - #Negative Scenario
			-Pre Condition : Fill Category Fields (with exponential value)
			-Steps
				Click on "ADD" button
			-Expected Result:
				Category should be added with value of $300,000.000
				Total Inflow amount should be incremented accordingly ($6,802.00 + $300,000.00 = $306,802.00)
			-Result: PASS
	------------------------------------
		
		301 - Calculate Working Balance (Inflow)
			-Pre Condition : Add New Category (Inflow)
			-Steps:
				Check working balance
			-Expected Result:
				Working Balance amount should be incremented accordingly [Total Inflow($10,802.00) - Total Outflow($4,588.07) = Working Balance ($6213.93)]
			-Result: PASS

		302 - Calculate Working Balance (Outflow)
			-Pre Condition : Add New Category (Outflow)		
			-Steps:
				Check working balance
			-Expected Result:
				Working Balance amount should be decremented accordingly [Total Inflow($6,802.00) - Total Outflow($7,588.07) = Working Balance (-$786.07)]
			-Result: FAIL
			-Comment: Expected -$786.07 found $786.07 (Image url - http://take.ms/Dxa20) [Error message - AssertionError: 786.07 is not equal to -786.07: expected 786.07 to equal -786.07]