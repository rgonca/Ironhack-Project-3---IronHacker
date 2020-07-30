# Ironhack-Project-3---IronHacker

Ironhack alumni directory and achievements they have accomplished.
The users can check where is each one of them and what companies, projects and what tasks are they developing. Giving more visibility to students who the user considers more interesting.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them:
On the server folder:

```
npm i 
```

AUTH & PROFILE ROUTES:

| Method   | #POST   |  #POST  | #POST  |  #GET     | #GET        | PATCH      |
| -------- | ------- | ------- | ------ | --------- | ------------| -----------|
| Endpoint | /signup |  /login | /logout| /loggedin | //users/:id | /users/:id |
| Action   | Sign up |  Log in | Log out| Check user| Get user    | Edit user  |

POSTS ROUTES:

| Method   | #GET               | #GET                  | #POST          | #DELETE          | #PATCH               | 
| -------- | ------------------ | --------------------- | -------------- | ---------------- | -------------------- |
| Endpoint | /getAllPosts       | /getOnePost/:post_id' | /newPost       | /:post_id        | /:post_id            |
| Action   | Gets lists of post | New registry          |Creates new post| Delete one post  | Edit one post        |

| Method   | #GET                | #POST                   | #DELETE                  | #GET                   | #GET                                | 
| -------- | ------------------  | ----------------------- | ------------------------ | ---------------------- | ----------------------------------- |
| Endpoint | /postByTags         | /commentToPost/:post_id | /comment/:comment_id     | /getAllUsers           | //getOneUser/:user_id'              |
| Action   | Filtes posts by tags| Comments one post       |Deletes one comment       | Deploys list of users  | Selects one user from the list      |
