# /v/ Current Post ID monitor

Simple Vue client + Express API to monitor current post ID on 4chan's /v/, and calculate the chance of 5's.

When launched, client will begin performing periodic API requests to fetch /v/'s catalog. 
The largest post ID will be collected, and by comparing ID from previous request the "posts-per-second"(pps) is calculated. Using that, a rough estimation of getting a 5 is presented on screen, which assumes the person submits a post immediately after being presented with the chance.

Does it work? eh... relying on 4chan's API for this type of deduction is like shorting a stock from a bank with dialup. 4chan API caches requests for about 30 seconds, which hampers my ability to accurately calculate the pps. Since it's based on samples every 30 seconds, it's very innaccurate. It would be easier to just wget scan /v/ instead of fetching the catalog since it updates much faster, which would provide a much more refined pps value.  

The API is realtime though, I'm pretty sure. Based on just my own observations and testings, it seems that a post submitted immediately after collecting a fresh(not cached) catalog response will have an ID that's greater by 10~15 than the largest post ID fetched from the response. Usually the pps is around 1.6-2, which usually means it takes about 5-8 seconds for 10 new posts to be added. Given the amount of time it takes to submit a post which is usually 2-3 seconds, and the time it takes for the response to return from the servers, it stands to reason that the catalog's response is more or less realtime. 

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
