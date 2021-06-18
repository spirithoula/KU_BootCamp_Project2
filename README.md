# KU_BootCamp_Project2

## Your Task

## User Story

```md
AS A family member (a parent or guardian)
I WANT to keep track of my loved one's events/daily activities/ medical information
SO THAT we have instant connection and communication with each other, as well as 911/EMT's/Fire services
```

## Acceptance Criteria

```md
GIVEN a functional Express.js API
WHEN I add my database name, MySQL username, and MySQL password to an environment variable file
THEN I am able to connect to a database using Sequelize
WHEN I enter schema and seed commands
THEN a development database is created and is seeded with test data
WHEN I enter the command to invoke the application
THEN my server is started and the Sequelize models are synced to the MySQL database
WHEN I open the page that is deployed to heroku
THEN I am presented with a login page with the option to create a new user
WHEN I am successfully authenticated
THEN I am brought to the profile page where I can add new users to my family
WHEN I add new users to my family
THEN I can enter my new users basic info, medical info, & emergency contacts
WHEN I am done entering the user's information
THEN I can upload an image or document to the user's profile
WHEN I want to see my family's event's that they have scheduled
THEN I am given an option to look at the calender with all the event's listed
WHEN I want to schedule an event
THEN I can click on the calendar and it will route me to the "Create New Event" page with a google map
WHEN I click on each family member's event that is scheduled
THEN I am routed to the event with a chat box functionality to communicate with that user
WHEN I click on my profile page
THEN I am given a drop down menu that lists all of my own event's that are scheduled
```

MVP:

1.Authentication/Login (Passport/Bcrypt)
1a.Polished UI
2.Individual user accounts with the family users associated
3.Calendar show currently booked events from family members or other users
4.-Specific Times/ Specific Days/ Selected Place
5.Chat Messaging
6.using .env file for sensitive info 7.

//node mailer
//firebase
//web sockets
//twilio-TTS

//custom roles-permissions according to that role
