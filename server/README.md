### this is the backend server with JWT authentication

# project setup

In order to spin up the project, in the server create .env with these three variables, with your own values.

MONGO_URI, JWT_SECRET and TOKEN_LIFETIME,

After that run this command:

npm install and npm start

## For User

- to register user {route:/register}

- to login and generate jwt token and place it in the headers of other routes ex:{authorization:token} {route:/login}

## For Posts CRUD

- to create and get all posts {route:/api/v1/posts}

```sh
http://localhost:{port}/api/v1/posts
```

- to update , delete and get post by id {route:/api/v1/posts/:id}

## For Products

- to get all products from db {route:/api/v1/products}

- to get and add the products in cart {route:api/v1/products/cart}

- to delete the cart products {route:/api/v1/products/cart/:id}

## Functionalities pending

- Refresh token after the expiration and logout.
