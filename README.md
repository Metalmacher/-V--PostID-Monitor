# /v/ Current Post ID monitor

Simple Vue client + Express API to monitor current post ID on 4chan's /v/, and calculate the chance of 5's.

## Project setup
In root:
```Shell
npm i
npm run serve
```
In backend folder:
```Javascript
node ./server.js
```



To add more API routes:
- chanAPI.js for the actual requests to 4chan's JSON API
- routes.js for Express routes
- api.js for Client-side requests to the backend
