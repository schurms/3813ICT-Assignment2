# MyChat - 3813ICT Assignment 1

Student Name: Jordan Schurmann

Student Number: s5073958

Due: 5pm Mon 3 September 2018

### COMMANDS

- Start server - Terminal Window 1 (This starts the server with nodemon)
```javascript
npm run start:server
```
- Start client - Terminal Window 2
```javascript
ng server
```

### GIT Structure

The approach to utilising GIT and version control was to commit after each complete build.  Whilst development was undertaken on a local machine, the version control solution was stored in a local GIT repository and then pushed to GITHUB.

Branches were taken where appropriate and data merged in.  However, this was generally performed locally and only the final merged versions were pushed to GITHUB.  This approach reduced complexity and allowed work to continue in GIT when offline.

### Data Structures

Core data structures are:

Group: - This mnodel includes the channel Class.
```typescript
import { Channel } from './channel.model';

export class Group {
  id: number;
  name: string;
  channel: Channel;

  constructor( id: number, name: string, channel: Channel) {
    this.id = id;
    this.name = name;
    this.channel = channel;
  }
}
```

Channel: 
```typescript
export class Channel {
  id: number;
  name: string;

  constructor( id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
```

User:
```typescript
export class User {
  id: number;
  name: string;
  email: string;
  role: string;

  constructor( id: number, name: string, email: string, role: string ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
  }
}
```

### REST API
This section defines the REST APIs implemented within Node.js.
##### route/Auth.js** - REST APIs within the route are:
```javascript
app.post('api/login', function (req,res)
```
- POST endpoint API for validating if a User is in the system to allow / deny access - Retrieves data from user.json.
  - Input Parameter: User Name:
  - Returns: True (Found) or False (not found)
```javascript
app.post('api/login', function (req,res)
```
- POST endpoint API for retrieving a Users credentials to validate authority to access page - Retrieves data from user.json.
	- Input Parameter: User Name:
	- Returns: User record containing role.  Role of "Group" or Name = "super" allows access to admin function
##### route/user.js - REST APIs within the route are:
```javascript
app.get('/api/users', function(req,res)
```
- GET endpoint API for retrieving all users in the system. Retrieves data from user.json.
	- Input Parameter: None
	- Returns: Array of Users
```javascript
app.post('/api/user', function(req,res)
```
- POST endpoint API for creating a new user. Updates data into user.json.
	- Input Parameter: User details - Name, Email, Role etc
	- Returns: New user details
```javascript
app.put('/api/user/:id', function(req,res)
```
- PUT endpoint API for editing user details. Updates data into user.json.
	- Input Parameter: User details - id, Name, Email, Role etc
	- Returns: edit user details
```javascript
app.delete('/api/user/:id', function(req,res)
```
- DELETE endpoint API for deleting a user.  Updates data into user.json.
	- Input Parameter: User id
	- Returns: Deleted user details
##### route/group.js - REST APIs within the route are:
```javascript
app.get('/api/groups', function(req,res)
```
- GET endpoint API for retrieving all groups in the system. Retrieves data from group.json.
	- Input Parameter: None
	- Returns: Array of Groups
```javascript
app.post('/api/group', function(req,res)
```
- POST endpoint API for creating a new group. Updates data into group.json.
  - Input Parameter: Group details - Name
  - Returns: New group details
```javascript
app.put('/api/group/:id', function(req,res)
```
- PUT endpoint API for editing group details. Updates data into group.json.
	- Input Parameter: Group details - id, Name, Channel = ""
	- Returns: edit group details
```javascript
app.delete('/api/group/:id', function(req,res)
```
- DELETE endpoint API for deleting a group.  Updates data into group.json.
  - Input Parameter: Group id
  - Returns: Deleted group details
##### route/channel.js - REST APIs within the route are:  
  > Not sure if this is required.
```javascript
app.get('/api/channels', function(req,res)
```
- GET endpoint API for retrieving all channels in the system. Retrieves data from channel.json.
  - Input Parameter: None
  - Returns: Array of Channels
```javascript
app.post('/api/channel', function(req,res)
```
- POST endpoint API for creating a new channel. Updates data into channel.json.
	- Input Parameter: new channel details - Name
	- Returns: New channel details
```javascript
app.put('/api/channel/:id', function(req,res)
```
- PUT endpoint API for editing channel details. Updates data into channel.json.
  - Input Parameter: Channel details - id, Name
  - Returns: edit channel details
```javascript
app.delete('/api/channel/:id', function(req,res)
```
- DELETE endpoint API for deleting a channel.  Updates data into channel.json.
  - Input Parameter: Channel id
  - Returns: Deleted channel details
### Angular Architecture
This section defines the Angular Architecture used.  It discusses the components, services and models used.
- **Components** - Components can be found within the PAGES folder. The following Angular components are implemented:
  - *Login* - This component is displayed on user page opening.  Its purpose is to manage login.  It performs validation to ensure only registered users can login.  It validates (i) that the user name exists in the database, (ii) that a user name is input, (iii) that an email is input, and (iv) that the email is in correct email format.
  - *Admin* - This is a high level collection of functions to manage Groups/Channels/Users
    - Group - This component is displayed on user being successfully authorised to access the page. It provides the mechanism to add/update/delete groups.  It also provides a link to add users to groups.
    - Channel - This component is displayed on user being successfully authorised to access the page.  It provides the mechanism to add/update/delete channels.  It also provides a link to add users to channels.
    - User - This component is displayed on user being successfully authorised to access the page.  It provides the mechanism to add/update/delete users.
  - *Chat* - This component is displayed on successful user login.  It is the default landing page.  The page can not be opened unless a user is logged in. Whilst basic chat functionality works, this is not a requirement at this stage.
  - *Navbar* - This component displays the navbar at the top of pages.  This component is inserted via the <app-navbar> selector. Options on the Navbar are:
    - Admin - Clicking on this menu item opens a dropdown to allow the user to navigate to the appropriate administration page.  Dropdown options are (i) Groups (to manage Groups), (2) Users (to manage Users), and (3) Channels (to manage Channels). These features are discussed in the "Admin" component discussion.
	- My Chat - Clicking on this menu item returns the user to the Chat page.  This feature is discussed in the "Chat" component discussion.
	- Logout - Clicking on this item logs the user out of the system and removes there session storage data.
  - *NotFound* - This component is displayed when a defined page can not be found. As a default the user is returned to the login page.
- **Services** - Services can be found within the SERVICES folder.  The following Angular servicers are implemented:
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
- **Models** - Models can be found within the MODELS folder.  The following Angular models are implemented:
  - *Group* - Model defining the structure of a Group Class.  A group has channels and user imports.
  - *Channel* - Model defining the structure of a Channel Class. A channel has user imports.
  - *User* - Model defining the structure of a User Class.  A User has Group and Channel
