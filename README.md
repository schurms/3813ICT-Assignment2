# MyChat2 - 3813ICT Assignment 2

Student Name: Jordan Schurmann

Student Number: s5073958

Due: 28 September 2018
___
## TABLE OF CONTENTS
1. Guide For How Application Works
2. Application Start Commands
3. Key Design Assumptions
4. Additional Features Implemented
5. Assignment Features Not Implemented
6. Test Data Provided
7. Test Scripts and Test Execution
8. GIT Structure
9. Data Structures
10. Rest APIs
11. Angular Architecture

---
### 1. Guide For How The Application Works
**1. Login**
  - The application authenticates valid users.  Valid users are listed in section 5.  The application only tests the username and the email is provided as a requirement.
  - Additional users can be added via the administration function.  Once added, you are able to login using that username.

**2. Dashboard**
  - Upon logging in the user is presented with a dashboard.
  - If the user has a SUPER or GROUP role they will see ADMIN | CHAT | PROFILE| LOGOUT options
  - If the user does not have a SUPER or GROUP role they will see CHAT | PROFILE | LOGOUT options

**3. Chat Page**
  - Options on the CHAT page are:
    - Groups the User is a member of
    - Channels the User is a member of
    - If the User has not selected a channel then a blank screen with a "Please Select a Channel" message Appearing
    - If the User has selected a channel then a message displaying the User name and Channel is displayed together with basic Chat Functionality.
    - Chat history is displayed and persisted

**4. Admin Page**
  - Options on the ADMIN dropdown are:
    - Group - This functionality is used to:
      - Add/Update/Delete Groups
      - Add/Delete Users to Groups
      - Add/Delete Channels to Groups
      - Add/Delete Users to Channels to Groups
        - To Add a User to a Group > Select User on the Group List Management Page for the required Group > Add User on the User List Management Page
        - To Delete a User from a Group > Select User on the Group List Management Page for the required Group > Delete on the User List Management Page for the required User
        - To Add a Channel to a Group > Select Channel on the Group List Management Page for the required Group > Add Channel on the Channel List Management Page
        - To Delete a Channel from a Group > Select Channel on the Group List Management Page for the required Group > Delete on the Channel List Management Page for the required Channel
        - To Add a User to a Channel > Select Channel on the Group List Management Page for the required Group > Select User on the Channel List Management Page for the required Channel > Add User on the User List Management Page
        - To Delete a User from a Channel > Select Channel on the Group List Management Page for the required Group > Select User on the Channel List Management Page for the required Channel > Delete User on the User List Management Page
     - Channel - This functionality is used to:
       - Add/Update/Delete Channels
     - User - This functionality is used to:
       - Add/Update/Delete Users

**5. Profile Page**

The profile page allows the logged in user to change their Profile Picture.  The user selects a picture for upload.  They then submit the picture to replace their profile image.

---
### 2. Application Start Commands
**Step 1** - Start Mongodb 
- Open Terminal Window 1 
- CD to mongodb bin directory
- Type the following command:
```
./mongod
```
**Step 2** - Start node.js server 
- Terminal Window 2
- Type the following command:
```
npm run server
```
**Step 3** - Start Angular client 
- Opern Terminal Window 3
- Type the following command:
```
ng serve
```
**Step 4**
- Upon start initial users/channels/groups are created.
- Initial data is created
- Open multiple chat applications on Port 4200
- Type the following command in different browser sessions
```javascript
http:\\localhost:4200
```
---
### 3. Key Design Assumptions
1. Data is loaded from Mongodb on the server on an as required basis.  
	- It was decided not to load all the data into the client as when multiple people were working on the data, then concurrent update issues can occur.  Thus the source of truth for all data is the server.


2. Security
	- A User with the super role can create super or group or normal users
	- A User with the group role can create other group or normal users
	- A User with the super role can delete users
	- A User with the group role can not delete users
---
### 4. Additional Features Implemented
1. User Authentication - The application tests for a valid user name before allowing access. Whilst an email address is required to be entered it is not authenticated.  New Users can only be created by users with the Super | Group Role.  Test users are:
	- super, jordan, fred, bill, sam, good
2. Navigation Menu Display - Navigation menu options vary depending upon whether a user is logged in, logged out, and their role when logged in.  Options are;
	- If not logged in - For all users display no navigation menu options.
	- If logged in and user does not have the Super | Group role - Display 'Chatroom' | 'Profile' | 'Logout' menu options
	- If logged in and user has the Super |Group role – Display 'Admin' | 'Chatroom' | 'Profile' | 'Logout' menu options.
3. Data persistence – All data (User/Group/Channel/Messages) is persisted within Mongodb.  Data can be modified, and it is retained from session to session.
4. If a user attempts to access an unknown page, a 404 page is displayed.  They can return to the home page by clicking a button which also logs them out.
5. Implemented CORS (Cross-Origin Resource Sharing) to allow cross origin HTTP requests between the angular client running on port 4200 and the node server running on port 3000.  The advantage of this is that development can still occur.  Alternative is to action ng build and run all from port 3000 – however this approach does not allow for refreshing of changes on rebuilds.
6. Display a cumulative history of messages over the entire session.  So when a user joins they see not only their chats but a full history of chats for the session.
---
### 5. Assignment Features Not Implemented
1. Broadcast a Message when a user leaves the channel
2. Ability to send images in chat message
___
### 6. Test Data Provided
Test data is automatically loaded into the system on server start.  When the server starts it (i) drops all existing collections if they exist, (ii) creates new collections, and (iii) loads in the data.  This feature can be disabled by commenting out the LOADTESTDATA() function in the server.js file.  If this commented out then you must uncomment the LOADONEUSER() function to load a single "super" user.




The following test data is provided within the system:

#### Group Data
| Group Name | Group Channels | Group Users | 
| ------ | ------ | ------ |
| Overseas Travel | Shopping | super | 
| | Travel | jordan | 
| | | fred |  
| Computers | Notebooks | bill | 
| | Monitors/videos | super | 
| | Windows | | 
| | Peripherals | |  
| | Apple | | 
| | Desktops | |
| Entertainment | Home Theatre | | 
| | TV Shows | 
| Lounges | Automative | |
| | Photography | | 

#### User Data
| User Name | User Email | User Role |
| ------ | ------ | ------ |
| super | super@gmail.com | super |
| jordan | jordan@gmail.com	| |
| fred | fred@gmail.com	| |
| bill | bill@gmail.com|group |
| sam | sam@gmail.com | |
| good | good@gmail.com | super |

#### Channel Data
| Channel Name | User Name |
| ------ | ------ |
| Shopping | super |
| | fred |
| Travel | super |
| | jordan |
| | fred |
| Notebooks | |
| Monitors/Videos | |
| Windows | bill |
| Peripherals | bill |
| Apple | |
| Desktops | |
| Home Theatre | |
| TV Shows | |
| Automative | |
| Photography | |

---
### 7. Test Scripts and Test Execution

Basic test scripts to test the node.js routes have been provided. To run the scripts

1. Ensure Mongodb is started
2. Stop the current node.js Server instance by pressing CTRL-C
3. At the terminal type the following command to execute the test script:
```
npm test
```

---
### 8. GIT Structure
The approach to utilising GIT and version control was to commit after each complete build.  Whilst development was undertaken on a local machine, the version control solution was stored in a local GIT repository and then pushed to GITHUB.

Branches were taken where appropriate and data merged in.  However, this was generally performed locally and only the final merged versions were pushed to GITHUB.  This approach reduced complexity and allowed work to continue in GIT when offline.

For this project a clone copy was made of Assignment 1.  Changes were then pushed to the new version.  This approach was used as Assignment one was still to be marked and I wanted to preserve assignment 1 as it was submitted.  The clone version allowed me to build on the base Assignment 1.

A branch was not taken of Assignment 1, for Assignment 2, as this would have resulted in Assignment 1 being overwritten.  I did not want this to occur.

---
### 9. Data Structures

Data structures were modelled within the angular side as this is where the data is represented.  The structures implemented are complex and used to retrieve and display the results in the client side.  No data structures are defined in the server side.  

Core data structures are:

Group: - This model includes the Channel and User Class to allow Users and Channels to be added to Groups.
```typescript
import { Channel } from './channel.model';
import { User } from './user.model';

export class Group {
  _id: any;
  id: number;
  name: string;
  channel: Channel[];
  user: User[];

  constructor( _id: any, id: number, name: string, channel: Channel[], user: User[] ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.channel = channel;
    this.user = user;
  }
}
```

Channel: - This model includes the User Class to allow Users to be added to Channels
```typescript
import { User } from './user.model';

export class Channel {
  _id: any;
  id: number;
  name: string;
  user: User[];

  constructor( _id: any, id: number, name: string, user: User[] ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.user = user;
  }
}
```

User:
```typescript
export class User {
  _id: any;
  id: number;
  name: string;
  password: string;
  email: string;
  role: string;
  userimage: string;

  constructor( _id: any, id: number, name: string, password: string, email: string, role: string, userimage: string ) {
    this._id = _id;
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.role = role;
    this.userimage = userimage;
  }
}
```

Message:
```typescript
export class Message {
  id: number;
  message: string;
  messagedate: Date;
  userid: number;
  username: string;
  channelid: number;
  channelname: string;
  userimage: string;

  constructor( id: number, message: string, messagedate: Date, userid: number, username: string, channelid: number, channelname: string, userimage: string ) {
    this.id = id;
    this.message = message;
    this.messagedate = messagedate;
    this.userid = userid;
    this.username = username;
    this.channelid = channelid;
    this.channelname = channelname;
    this.userimage = userimage;
  }
}
```
---
### 10. REST API's
This section defines the REST APIs implemented within Node.js.
#### route/Auth.js - REST APIs within the route are:
```javascript
app.post('api/login', function (req,res)
```
- POST endpoint API for validating if a User is in the system to allow / deny access - Retrieves data from user collection.
  - Input Parameter: User Name:
  - Returns: True (Found) or False (not found)
```javascript
app.post('api/authuser', function (req,res)
```
- POST endpoint API for retrieving a Users credentials to validate authority to access page - Retrieves data from user collection.
	- Input Parameter: User Name:
	- Returns: User record containing role.  Role of "Group" or Name = "super" allows access to admin function
#### route/user.js - REST APIs within the route are:
```javascript
app.get('/api/users', function(req,res)
```
- GET endpoint API for retrieving all users in the system. Retrieves data from user collection.
	- Input Parameter: None
	- Returns: Array of Users
```javascript
app.post('/api/user', function(req,res)
```
- POST endpoint API for creating a new user. Updates data into user collection.
	- Input Parameter: User details - Name, Email, Role etc
	- Returns: New user details
```javascript
app.put('/api/user/:id', function(req,res)
```
- PUT endpoint API for editing user details. Updates data into user collection.
	- Input Parameter: User details - id, Name, Email, Role etc
	- Returns: edit user details
```javascript
app.delete('/api/user/:id', function(req,res)
```
- DELETE endpoint API for deleting a user.  Updates data into user collection.
	- Input Parameter: User id
	- Returns: Deleted user details
#### route/group.js - REST APIs within the route are:
```javascript
app.get('/api/group', function(req,res)
```
- GET endpoint API for retrieving all groups in the system. Retrieves data from group collection.
	- Input Parameter: None
	- Returns: Array of Groups
```javascript
app.get('/api/group/:id', function(req,res)
```
- GET endpoint API for retrieving a specific group in the system. Retrieves data from group collection.
	- Input Parameter: Group id
	- Returns: Single Group
```javascript
app.post('/api/group', function(req,res)
```
- POST endpoint API for creating a new group. Updates data into group collection.
  - Input Parameter: Group details - Name
  - Returns: New group details
```javascript
app.put('/api/group/:id', function(req,res)
```
- PUT endpoint API for editing group details. Updates data into group collection.
	- Input Parameter: Group details - id, Name, Channel = ""
	- Returns: edit group details
```javascript
app.delete('/api/group/:id', function(req,res)
```
- DELETE endpoint API for deleting a group.  Updates data into group collection.
  - Input Parameter: Group id
  - Returns: Deleted group details
#### route/channel.js - REST APIs within the route are:  
```javascript
app.get('/api/channel', function(req,res)
```
- GET endpoint API for retrieving all channels in the system. Retrieves data from channel collection.
  - Input Parameter: None
  - Returns: Array of Channels
```javascript
app.get('/api/channel/:id', function(req,res)
```
  - GET endpoint API for retrieving a specific channel in the system. Retrieves data from channel collection.
  	- Input Parameter: Channel id
  	- Returns: Single Channel
```javascript
app.post('/api/channel', function(req,res)
```
- POST endpoint API for creating a new channel. Updates data into channel collection.
	- Input Parameter: new channel details - Name
	- Returns: New channel details
```javascript
app.put('/api/channel/:id', function(req,res)
```
- PUT endpoint API for editing channel details. Updates data into channel collection.
  - Input Parameter: Channel details - id, Name
  - Returns: edit channel details
```javascript
app.delete('/api/channel/:id', function(req,res)
```
- DELETE endpoint API for deleting a channel.  Updates data into channel collection.
  - Input Parameter: Channel id
  - Returns: Deleted channel details
#### route/messages.js - REST APIs within the route are:  
```javascript
app.post('/api/message', function(req,res)
```
- GET endpoint API for creating a message in history. Updates data into message collection.
  - Input Parameter: Message details
  - Returns: Details of message created
```javascript
app.post('/api/messages', function(req,res)
```
  - POST endpoint API for retrieving all messages for a channel. Retrieves data from message collection.
  	- Input Parameter: Channel id
  	- Returns: Array of messages for the channel
---
### 11. Angular Architecture
This section defines the Angular Architecture used.  It discusses the components, services and models used.

**1. Components** - Components can be found within the PAGES folder. The following Angular components are implemented:
  - *Login* - This component is displayed on user page opening.  Its purpose is to manage login.  It performs validation to ensure only registered users can login.  It validates (i) that the user name exists in the database, (ii) that a user name is input, (iii) that an email is input, and (iv) that the email is in correct email format.
  - *Admin* - This is a high level collection of functions to manage Groups/Channels/Users
    - Group - This component is displayed on user being successfully authorised to access the page. It provides the mechanism to add/update/delete groups.  It also provides a link to add users to groups and channels to groups.
      * GroupUser - This component is used to add/remove users to groups
      * GroupChannel - This component is used to add/remove channels to groups
      * ChannelUser - This component is used to add/remove users to channels     
    - Channel - This component is displayed on user being successfully authorised to access the page.  It provides the mechanism to add/update/delete channels. 
    - User - This component is displayed on user being successfully authorised to access the page.  It provides the mechanism to add/update/delete users.
  - *Chat* - This component is displayed on successful user login.  It is the default landing page.  The page can not be opened unless a user is logged in. The following sub-components exist.
    - Chatroom-window - This component is a container for other chat components in addition to showing the message functionality.
    - Chatroom-group - This component displays groups the user belongs to.
    - Chatroom-channel - This component displays channels the user belongs to.
    - Chatroom-history - This component displays links to history messages.
  - *Navbar* - This component displays the navbar at the top of pages.  This component is inserted via the <app-navbar> selector. Options on the Navbar are:
    - Admin - Clicking on this menu item opens a dropdown to allow the user to navigate to the appropriate administration page.  Dropdown options are (i) Groups (to manage Groups), (2) Users (to manage Users), and (3) Channels (to manage Channels). These features are discussed in the "Admin" component discussion.
	- My Chat - Clicking on this menu item returns the user to the Chat page.  This feature is discussed in the "Chat" component discussion.
	- Logout - Clicking on this item logs the user out of the system and removes there session storage data.
  - *Profile* - Page to add new profile images
  - *NotFound* - This component is displayed when a defined page can not be found. As a default the user is returned to the login page.

**2. Services** - Services can be found within the SERVICES folder.  The following Angular servicers are implemented:
  - *AuthService* - The purpose of this service is to manage actions for user validation. Functions within the service are:
    - getAuthUser - Function to obtain User credentials to determine if have access to system.
    - readUser - Function to read user name from session storage
    - writeUser - Function to write user name to session storage upon validation
    - deleteUser - Function to delete user from session storage.
  - *GroupService* - The purpose of this service is to manage actions for group management. Functions within the service are:
    - getGroups - Function to get all groups
    - createGroup - Function to create a new group
    - updateGroup - Function to update group details
    - deleteGroup - Function to delete a group
  - *ChannelService* - The purpose of this service is to manage actions for channel management.  Functions within the service are:
    - getChannels - Function to get all channels
    - createChannel - Function to create channel details
    - updateChannel - Function to update channel details
    - deleteChannel - Function to delete channel details
  - *UserService* - The purpose of this service is to manage actions for user management.  Functions within the service are:
    - getUsers - Function to get all users
    - createUser - Function to create a new user
    - updateUser - Function to update user details
    - deleteUser - Function to delete a user
  - *ImgUploadService* - The purpose of this service is to manage image uploads.  Functions within the service are:
      - imgupload - Function to upload images
  - *SocketService* - The purpose of this service is to manage actions for socket communication.  Functions within the service are:
    - sendMessage - Function to send message to all users in channel
    - getMessage - Function to get messages
    - joinChannel - Function to Join a Channel.
    - writeMessage - Function to write a message to message History
    - getChannelMessages - Function to get messages for a specific channel
    - leaveChannel - Not Working

**3. Models** - Models can be found within the MODELS folder.  The following Angular models are implemented:
  - *Group* - Model defining the structure of a Group Class.  A group has channels and user imports.
  - *Channel* - Model defining the structure of a Channel Class. A channel has user imports.
  - *User* - Model defining the structure of a User Class.
  - *Message* - Model defining the structure of a Message Class.
