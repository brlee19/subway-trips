## FYI

This was a take-home project which consumed an API the company set up with NYC subway trip information. The company seems to have taken down their API, which is why it now has an infinite spinner instead of loading any subway trips.

## Running in dev mode
Run `npm install` and `npm start` from both of the `client` and `server` folders.
Alternatively, you can run `npm run preinstall` and `npm run dev` from the top level folder.

## Deployed version
Available at https://subway-trips.herokuapp.com/

## Key technologies used
React, Redux, Node, Express, Postgres, Heroku

## Note about the database
The database is configured to be able to support multiple users. In React, the user id is hardcoded to '1' for simplicity. User 1 already has some train lines and trips favorited in the database already but of course, all of those favorites can easily be removed.
