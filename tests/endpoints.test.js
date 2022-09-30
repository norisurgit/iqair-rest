// TEST

require("dotenv").config()
const path = require("path")
const {
    getNearestCity,
    getNearestCityUsingLatAndLon
} = require(path.join(__dirname, "..", "src", "utils", "fetch.util.js"))

test('should get nearest city', async () => {
    const data = await getNearestCity(process.env.IQAIR_API_KEY)
    expect(data.status).toBe("success")
}) // testing the endpoint v2/nearest_city using IP geolocation

test('should get Paris data', async () => {
    const data = await getNearestCityUsingLatAndLon(
        process.env.PARIS_LATITUDE,
        process.env.PARIS_LONGITUDE,
        process.env.IQAIR_API_KEY
    )
    expect(data.status).toBe("success")
})// testing if remote server is returning data about Paris