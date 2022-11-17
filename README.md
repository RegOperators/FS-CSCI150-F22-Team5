# Overall Description
## 2.1 Product Perspective
The Operation Registration website is being built to be used as a supplement to the alrleady existing course registration system provided by Fresno State through the My Fresno State portal. The website itself will rely heavily upon currently available information that is hosted by Fresno State, as one of the website's primary funcitons will be to pull and cohesively present relevant course information that is hosted by Fresno State in a variety of different locations.

## 2.2 Product Functions
The user will supply the website with a short list of courses they which to register for in the upcoming semester, and the website will fetch information on these courses, calculate viable potential schedules for the given list of courses, and display these schedules to the user.

## 2.3 User Classes and Characteristics
The only and most important user class that is anticipated to use this product are Fresno State students who are seeking to register for courses at Fresno State. It will be assumed that they have little technical expertise and will only make use of the website a few times in the weeks before or of their course registration date.

## 2.4 Operating Environment
The software will work on any hardware and operating system that is able to run a web browser and connect to the internet.

## 2.5 Design and Implementation Constraints
Since the project will be implemented as a website that consolidates information being hosted by a third party (Fresno State), the website will only be able to function while Fresno State's online resources are functioning properly. Furthermore, any changes to how or where data pertinent to the website will have to be accounted for manually. Furthermore, the website will be unable to run on machines that have no web browsers (Internet Edge, Firefox, Google Chrome, Safari) and/or no internet connection.

## 2.6 User Documentation
Instructions for the user will be displayed on the website contain something to the effect of the following: "Input the courses you'd like to register for this semester and get a batch of possible schedules you can have"

## 2.7 Assumptions and Dependencies
It will be assumed that Fresno State will host pertinent information in the same places and in the same way, that their web services will remain live, and that AWS will remain live.

# External Interface Requirements
## 3.1 User Interfaces
The user will input the courses they wish to schedule in the website interface. After submitting all of their desired courses, they will click "generate schedule" and be shown all of the schedules that are possible with their given input. 

## 3.2 Hardware Interfaces
The software wil interface with any device that can run a web browser and can conect to the internet. In particular, desktop computers and laptops are the main target in terms of hardware but mobile devices such as phones and tablets should be able to interface with the software as well.

## 3.3 Software Interfaces
A user's web client will connect to the registration site hosted on AWS. Any operating system capable of running a web browser should be able to do this. Beyond this, no there are no other requirements or restrictions worth noting.

## 3.4 Communications Interfaces
A web browser with netwrok access will be necessary for the project. HTTP standards will be used for communication between the users web client and AWS where the project will be hosted. 

# System Features
## 4.1 Generate Schedules
- ### 4.1.1 Description and Priority
	- This feature will generate a set of possible schedules based on a list of courses input by a given user
- ### 4.1.2 Stimuls/Response Sequences
	1) User inputs list of courses
	2) List is sent to project on AWS
	3) Courses' information is scraped from Fresno State website
	4) Compatible schedules are calculated from this information
	5) List of schedules is sent to client
	6) Schedules are rendered on user's interface
- ### 4.1.3 Functional Requirements
	- Internet access
	- Web browser
	- Input method for text (keyboard)
	- Error message will be printed for invalid inputs
	- Error message will be printed for "impossible" schedules

# Other Nonfunctional Requirements
## 5.1 Performance Requirements
TBD
## 5.2 Safety Requirements
TBD
## 5.3 Security Requirements
TBD
## 5.4 Software Quality Requirements
TBD
## 5.5 Business Rules
TBD

# Other Requirements
TBD
