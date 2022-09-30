## Air pollution Rest API.

## **Stack:**

*dependencies*
 - ***dotenv* v16.0.2** (loading environment variables)
 - ***express*** v4.18.1 (routing)
 - ***mysql*** v2.18.1 (database)
 - ***node-cron*** v3.0.2 (CRON jobs)
 - ***node-fetch*** v2.6.7 (fetching data)
 
 *dev dependencies*
 - ***jest*** v29.1.1 (testing)
 - ***nodemon*** v2.0.20 (hot reloading)

## ***Routes:***

*/info/ [latitude:float] & [longitude:float]* : GET
all other routes are responded: `{status:  "unsupported GET request"}`

## ***Utils:***

***fetching:* (./src/utils/fetch.util.js)**

 1. `getNearestCity()` param: `key: String` return air pollution data as `json` or `null` on error.
 2. `getNearestCityUsingLatAndLon()` params: `latitude: any` `longitude: any` `key: String`. wil convert `longitude` and `latitude` to String and format to `/-?\d+\.?\d+/g`. returns what ever data as `json`


***Database manipulation:* (./src/utils/db.util.js)**

 1. `setupDB()` setup database environment if not existant (executed on server start listenning)
 2. `addNewParisData()`: calls `getNearestCityUsingLatAndLon()`using Paris longitude and latitude and saves toDatabase

***cron jobs:* (./src/utils/cronjobs.util.js)**
 1. `cronJobSaveParisData()`calls `addNewParisData()` every minute (begins on server start listenning)

## ***Tests:*** (./tests/*)

 1. `should get nearest city` : testing the endpoint v2/nearest_city using IP geolocation
 2. `should get Paris data`: testing if remote server is returning data about Paris


## ***Scripts:***

 - `runProd`: will run server in a normal fashion
 - `runDev`: will run server using nodemon with this config: `"ignore": ["*.test.js","*.util.js"]`
 - `test`: will run tests
