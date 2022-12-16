# dataBASE - `README.md` Example



# Quick Compo

<img src="/Users/enriquecoscarelli/Downloads/minilogo.png" alt="minilogo" style="zoom:75%;" />

## Description

***dataBASE*** is the resource for all BASE jumpers around the world to check the weather conditions of different jumps and cross referencing latitude and longitude of exit points with Windy API and map box topographyc features.

## User Stories

- **Admin sign up:** As an admin I can sign up in the platform.
- **Admin log in:** As an admin I can login to the platform.
- **Admin log out:** As an admin I can logout from the platform so no one else can use it.
- **User sign up:** As a user I can sign up in the platform.
- **User Log in:** As a user I can login to the platform.
- **User log out:** As a user I can logout from the platform so no one else can use it.
- **Add Exit Points** As a user I can add an exit point.
- **Edit Exit Points** As a user I can edit an exit point
- **Read Exit Points** As a user I can read an exit point.
- **Delete Exit Points** As a user I can delete an exit point.
- **Add Pre Operations Checklist** As a user I can add players to a tournament
- **Edit PreOpp Checklist** As a user I can edit a player profile to fit into the tournament view
- **View Tournament Table** As a user I want to see the tournament table
- **Edit User** As a user I can edit my profile, add or substract exit points
- **Chat** As an anon I can chat with other people in the platform.

## Backlog

User profile:

- see my profile
- see exit point
- Add weather widget
- Create events



# Client / Frontend

## React Router Routes

| Path             | Component            | Permissions                | Behavior                                                     |
| ---------------- | -------------------- | -------------------------- | ------------------------------------------------------------ |
| `/`              | Home                 | Public `<Route>`           | Home page                                                    |
| `/signup`        | SignupPage           | Public `<Route>`           | Sign up form, link to login, navigate to homepage after signup |
| `/login`         | LoginPage            | anon only `<AnonRoute>`    | Login form, link to signup, navigate to homepage after login |
| `/exitpoint`     | TournamentListPage   | user only `<PrivateRoute>` | Shows all exit points in a list                              |
| `/exitpoint/add` | TournamentListPage   | user only `<PrivateRoute>` | Edits a exit points                                          |
| `/exitpoint/:id` | TournamentDetailPage | user only `<PrivateRoute>` | Details of a exit points to edit                             |
| `/exitpoint/:id` | n/a                  | user only `<PrivateRoute>` | Delete exit points                                           |
|                  |                      |                            |                                                              |
|                  |                      |                            |                                                              |
|                  |                      |                            |                                                              |
|                  |                      |                            |                                                              |
|                  |                      |                            |                                                              |
|                  |                      |                            |                                                              |

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

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous
- Exit Point Service
  - exitPoint.list()
  - exitPoint.detail(id)
  - exitPoint.add(id)
  - exitPoint.delete(id)
- User Service
  - user.detail(id)



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

| HTTP Method | URL            | Request Body                                                 | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ------------------------------------------------------------ | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | `/auth/me`     |                                                              | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | `/auth/signup` | {name, email, password}                                      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | `/auth/login`  | {username, password}                                         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | `/auth/logout` | (empty)                                                      | 204            | 400          | Logs out the user                                            |
| POST        | /api/exit      | {name, img, aproachLat, aproachLong, aproachDescription, exitLat, exitLong, exitDescription, landingZoneLat, landingZoneLong, landingZoneDescription, altitude} |                |              | Used to create one exit point document, using current logged in user id as a creator. |
| PUT         | /api/exit/:id  | {name, img, aproachLat, aproachLong, aproachDescription, exitLat, exitLong, exitDescription, landingZoneLat, landingZoneLong, landingZoneDescription, altitude} |                |              | Used to update one exit point document by id                 |
| GET         | /api/exit/:id  |                                                              |                |              | Used to get one exit point document by id                    |
| DELETE      | /api/exit/:id  |                                                              |                |              | Used to delete one exit point document by id                 |
| GET         | /api/user      |                                                              |                |              | Used to get current user's profile. Id of the user is coming form the req.session.currentUser |
| PUT         | /api/user      | {username, email, password}                                  |                |              | Used to update current user's profile. Id of the user is coming form the req.session.currentUser |

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

https://www.figma.com/file/GNvDVBD1NPTydU2PJy4DDM/dataBASE?node-id=0%3A88