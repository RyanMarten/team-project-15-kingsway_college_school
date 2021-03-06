# Amazon Web Services Overview

Our backend infrastructure consists of several services within the Amazon Web Services suite. 

- We use DynamoDB, a NoSQL database to store data on posts, hashtags, users and locations.
- We use API Gateway to host REST API endpoints that our client side code for the website and the mobile app can access easily to retrieve data for display in the front end.
- We use Lambda functions to do the processing and returning of data from the DynamoDB database when an API Gateway REST API endpoint is called. We use S3, a simple storage service, to store the images associated with posts, keep a list of the current most popular hashtags that is updated periodically, and to host the website. 
- We use Cloudfront to provide an encrypted https connection to the website hosted on S3, and to provide custom domain name support if Kingsway would ever like to change the URL of the website, for example to something like, kingswaysharing.com.
- We use Cognito to store a user pool of allowed credentials, which are currently only developer credentials. We have not integrated Google authentication currently. 

Please refer to the [API_GUIDE.md](API_GUIDE.md) to see the specifications of the API that we have created. 
