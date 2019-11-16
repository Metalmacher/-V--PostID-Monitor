# /v/ Current Post ID monitor

Simple Vue client + Express API to monitor current post ID on 4chan's /v/, and calculate the chance of 5's.

When launched, client will begin performing periodic API requests to fetch /v/'s catalog. 
The largest post ID will be collected, and by comparing ID from previous request an estimate of
getting a 5 is roughly calculated, assuming a post is submitted immediately after the percentage is displayed.

Does it work? eh... relying on 4chan's API for this type of deduction is like shorting a stock from a bank with dialup. 4chan API caches requests for about 30 seconds, and there's no real way of knowing if the data received is even realtime. I pretty much had to make a rough assumption based on just my own observations and testings, that given 1 posts-per-second 10 new posts will be added between the time when displaying the percentage and submitting a new post. It would be easier to just wget scan /v/ instead of fetching the catalog since it updates much faster.  

**Since 4chan API caches requests for about 30 seconds, you must at least wait that set amount of time to get (semi?)accurate information.**

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
