# What is this?
This is an express.js app that can communicate with AWS Thing Shadows for our  in-house telemeatics units. There is also a front-end app that allows commands to be sent to these devices.
## To get started:
 1. Clone this repo
 2. Create a .env file with the following
 ```
aws_access_key_id = <aws_access_key_id>
aws_secret_access_key = <aws_secret_access_key>
region = <aws_region>
endpoint = <aws_thing_shadow_api_endpoint>
```
 3. Run `npm install`
 4. Run `npm start` to run the app or `npm run dev` to run it with nodemon which will start the server again when documents are saved
 5. To visitthe management console, visit http://127.0.0.1:2080/shadows/manage

## REST routes:

`GET: /shadows`: returns a list of Thing Shadows that can be accessed via the url in the .env file
`GET: /shadows/manage`: returns the web app for sending commands to shadows
`GET: /shadows/:thingName`: returns the current shadow of the Thing with the given name
`PUT: /shadows/:thingName/:action`: executes that given action on the given Thing. The list of actions can be found in the `telemActions.js` file.
