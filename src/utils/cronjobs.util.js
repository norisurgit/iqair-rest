// UTILS : CRON JOBS
const cron = require("node-cron")
const path = require("path")
const { addNewParisData } = require(path.join(__dirname, "db.util.js"))

const cronJobSaveParisData = () => { // fetch and save Paris data to DB every minute
    cron.schedule("59 * * * * *", () => {
        addNewParisData()
    })
}

module.exports = {
    cronJobSaveParisData
}