# SECONDTIMERS

<br>

## Description

This is an app that allows travellers to share not so typical places.

## User Stories

- **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
- **Signup:** As an anon I can sign up in the platform so that I can start creating and managing my backlog
- **Login:** As a user I can login to the platform so that I can start creating and managing my backlog
- **Logout:** As a user I can logout from the platform so no one else can modify my information
- **Add posts** As a user I can add posts with information and images
- **Delete posts** As a user I can delete my own posts
- **Edit posts** As a user I can edit my own posts
- **Save as favorite** As a user I can save posts as favorites
- **Delete from favorites** As a user I can remove posts from my favorites
- **Edit profile** As a user I can edit my own profile
- **Check profiles** As a user I can check other people's profiles

## Backlog

- Friends list
- Filter by country
- Search bar
- Add more continents
- Search by continent
- Reply to comments

<br>

# Client / Frontend

## React Router Routes (React App)

`/api/` => Home => public => Home page
`/api/auth/signup` => Signup => public => Signup form, navigate to login
`/api/auth/login` => Login => public => Login form, navigate to destinations

`/api/profile` => MyProfile => private => Private profile
`/api/user/:id` => AthorProfile => public => Author's profile
`/api/profile/edit-form` => EditProfile => private => Edit your own profile
`/api/profile/favourites` => MyFavourites => private => Save your favourite posts

`/api/destinations` => Destinations => public => List of all posts
`/api/destinations/create-form` => CreateForm => private => Create form, navigate to post details
`/api/destinations/:postId` => PostDetails => public => Post details
`/api/destinations/edit/:postId` => EditForm => private => Edit your own post

`/api/error` => Error => public => Display an error message
`api/*` => NotFound => public => Display an error message

## Components

- Login

- Signup

- EditProfile

- MyFavourites

- MyProfile

- AuthorProfile

- Destinations

- CreateForm

- PostDetails

- EditForm

- Error

- NotFound

- NavBar

## Services

- Auth Service
  signupService,
  loginService,
  verifyService,
  myProfileService,
  updatedProfileService,
  myFavouritesService,
  addFavouriteService,
  deleteFavouriteService,

- Post Service
  newPostService,
  destinationsService,
  updatedPostService,
  getPostService,
  deletePostService,
  getCountriesService,
  getCategoriesService,
  getCommentsService,
  newCommentService,
  editCommentService,
  deleteCommentService,
  authorProfileService,

- Upload Service
  UploadImageService

<br>

# Server / Backend

## Models

User Model

```javascript
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    profilePicture: String,
    location: String,
    age: Number,
    favouritePosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  }

```

Post Model

```javascript
 {
     title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    // required: true,
    enum: countries,
  },
  description: {
    type: String,
    required: true,
  },
  image: [
    {
      type: String,
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
    enum: categories,
  },
 }
```

Post Model

```javascript
 {
    creator: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comment: String,
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },

 }
```

<br>

## Links


### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/cristinachaparro/secondtimers-client)

[Server repository Link](https://github.com/cristinachaparro/secondtimers-server)

[Deployed App Link](https://secondtimers.netlify.app/)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/presentation/d/1F8bEBsuiDMFgtozrt8sJmX-3uq9XIlFZ/edit?usp=sharing&ouid=114060438171572716229&rtpof=true&sd=true)
