
Client code is in `client` directory.

Environment variable `MONGO_URI` should be set to MongoDB instance URI with specified database.

#### Development

```
yarn run start:dev
```

It will start node dev server running on port 5000.

In another terminal:

```
cd client
yarn run start
```

It will start react dev server running on port 3000. Go to http://localhost:3000 to view the app.

#### Production 

```
yarn run build
yarn run start
```

It will build client and server code and install it in `dist` directory. Access app at http://localhost:8081

#### Testing

For now, only tests for the client are available.
 
```
cd client
yarn run test
```
