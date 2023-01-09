# PlaceholderNameBackend - `README.md` Example

# Quick Compo

<img src="/Users/enriquecoscarelli/Downloads/minilogo.png" alt="minilogo" style="zoom:75%;" />

## Description

***PlaceholderNameBackend*** is the Backend for out App to filter and request Information, Authenticate a User and Create Entries in our Database.

## Options

- **User sign up:** As a user I can sign up in the platform.
- **User Log in:** As a user I can login to the platform.
- **User log out:** As a user I can logout from the platform so no one else can use it.
- **Edit User** As a user I can edit my profile
-**Create Task** As a user I can Create an Offer of my Service
-**Create Request** As a user I can send a Request to all those Offering my Desired Language

## Backlog

User profile:

- see my profile

# Client / Frontend

## React Router Routes

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | Home                 | Public `<Route>`           | Home page                                                    |
| `/signup`        | SignupPage           | Public `<Route>`           | Sign up form, link to login, navigate to homepage after signup |
| `/signup`        | LoginPage            | anon only `<AnonRoute>`   | Login form, link to signup, navigate to homepage after login  |
|`/Task/`|
|`/Task/all`|

## Components

- LoginPage
- SplashPage
- ProfilePage
- SignupPage
- EditProfilePage
- EditExitPointPage
- ExitPointPage
- EditProfilePage
- Navbar
- Footer

## Services

# Server / Backend

## Models

User model

```
{
  user: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  favorites: [{type: Schema.Types.ObjectId,ref:'Exit'}]
  userAgreement: {type: boolean, required: true, default: false}
}
```

Exit model

```
 {
   name: {type: String, required: true},
   img: {type: String},
   aproachLat: {type: Number, required: true}
   aproachLong: {type: Number, required: true}
   aproachDescription: {type: String}
   exitLat: {type: Number, required: true}
   exitLong: {type: Number, required: true}
   exitDescription: {type: String}
   landiZoneLat: {type: Number, required: true}
   landingZoneLong: {type: Number, required: true}
   landingZoneDescription: {type: String}
   creator: {type: Schema.Types.ObjectId,ref:'User'}
   altitud: {type: number}
   
 }
```

## Backend routes

|    URL     | HTTP Method            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ |

------------------------------------------------------------ |
|`/login`     | POST |{ email, password}| 200 | 400 | Checks if User Provided valid[email,password]contacts the DB and return User info on success & JWTToken

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/PBqtkUFX/curasan) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com/)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com/)

Wireframe

The url to your presentation slides

[Figma Link](http://www.figma.com/file/GNvDVBD1NPTydU2PJy4DDM/dataBASE?node-id=0%3A88)

<https://www.figma.com/file/GNvDVBD1NPTydU2PJy4DDM/dataBASE?node-id=0%3A88>
