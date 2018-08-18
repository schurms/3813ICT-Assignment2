# MyChat - 3813ICT Assignment 1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

Individual Assignment

Due: 5pm Mon 3 September 2018

## Introduction
You are required to build the server and front end for a chat system. For assignment 1, chat
functionality is not required, you will be building the dashboard for the chat system, and in
assignment 2 you will add the chat functionality along with other features. The chat system will
allow users to communicate with each other in realtime in different groups and channels. Some
users will have admin permission to add users to channels and groups, whilst a super admin
has access to the entire site. The solution must be implemented using Node.js, Angular, and
sockets. No persistent data storage or user authentication is required for assignment 1.

## Architecture

The system will have users which can have the following additional roles:
* Group Admin
* Super Admin

A Group Admin has the ability to create groups. A Group Admin also has the ability to create
channels within groups. A Group Admin has the ability to create/invite users to a channel (if the
user has already been created they will simply be added to the channel). A Group Admin can
remove groups, channels, and users from channels. A Group Admin can also allow a user to
become a Group Admin of the group.

A Super Admin can create users with Group Admin role. A Super Admin can also remove users.
A Super Admin can also provide another user with Super Admin role. A Super Admin also has
Group Admin role.

A user is identified by their username. Initially there is one user called 'super' who is also a
Super Admin. A user also has an email address (no emails are sent to the email address).
The first page of the website requires a user to enter their username, which is remembered in
local storage. A user may 'logout' which also clears the username out of local storage. Once a
user enters their username the page should display the groups they have been added to and
the channels for each group.

Selecting a channel should display the channel history (which will be empty in assignment 1).A text box should allow for new messages to be sent to the channel. New messages are
broadcast to all users currently viewing the channel and added to the history (not required in
assignment 1).
Data is stored by serialising JavaScript objects into JSON strings and stored in the file system.

## Git
Git must be used during the development of the chat system. We recommend that you use
Github and share the repository with your marker. You will be marked on frequent updates to
the repository and the usage of git features.

## Documentation
Documentation of your implementation is required. You will need to provide the following:
* Describe the organisation of your Git repository and how you used it during the
development of your solution
* Description of data structures used in the client and server to represent the various
entities, e.g.: users, groups, channels, etc.
* A description of how you divided the responsibilities between client and server (you are
encouraged to have the server provide a REST API which returns JSON in addition to a
static directory)
* A list of routes, parameters, return values, and purpose
* Angular architecture: components, services, models, routes




## Development server

Run `ng serve` for a dev Angular server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start:server` to start the node server.  The app server has nodemon installed and will automatically reload.

With the


## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
