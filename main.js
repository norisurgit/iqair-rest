require("dotenv").config()
const appPORT = process.env.PORT || 3000 // get port from .env or default to port 3000
const express = require("express")
const path = require("path")
const app = express()

/** local files */
const { setupDB, addNewParisData } = require(path.join(__dirname, "src", "utils", "db.util.js"))
const { cronJobSaveParisData } = require(path.join(__dirname, "src", "utils", "cronjobs.util.js"))
const { getNearestCityUsingLatAndLon } = require(path.join(__dirname, "src", "utils", "fetch.util.js"))

app.get("/info/:lat&:lon", (req, res) => { // main route
    // route example : /info/45.254&154.253
    getNearestCityUsingLatAndLon( // fetching function (takes lat, lon and api key)

        req.params.lat, // latitude gotten from link parameter 
        req.params.lon, // longitude gotten from link parameter
        process.env.IQAIR_API_KEY // API key (see .env)

    ).then(result => {
        if (result.status === "success") { // Promise resolved with data
            res.json({ // return data formatted
                Result: {
                    Pollution: result.data.current.pollution
                }
            })
        } else {
            res.json({ // Promise resolved with error, return
                status: "failed"
            })
            console.log(result, new Date()); // log result and time for later investigation
        }
        res.end()
    }).catch(e => console.error(e)) // Promise throws error
})


app.get("*", (req, res) => { // handle any other get request
    res.json({
        status: "unsupported GET request"
    })
    res.end()
})


app.listen(appPORT, () => {
    setupDB() // setup database if not already set
    cronJobSaveParisData() // start cron job (save paris data)
    console.log(`listening on port ${appPORT}`);
})
