// UTILS : Fetch
const fetch = require("node-fetch")

const requestOptions = {
    method: 'GET',
    redirect: 'follow'
} // general parameters

const getNearestCity = async (key) => { // call this to retrieve data of nearest city. will use IP geolocation
    try {
        // return data as JSON or null
        const data = await fetch(`http://api.airvisual.com/v2/nearest_city?key=${key}`, requestOptions)
        const result = await data.json()
        return result
    } catch (e) {
        console.log(e);
        return null
    }
}


const getNearestCityUsingLatAndLon = async (latitude, longitude, key) => { // call this to retrieve data of nearest city. requires longitude and latitude
    // will match latitude and longitude to regex: (-)[0-9](.)[0-9] and neglect rest (-4225.1262 for example)
    // return what ever response
    const data = await fetch(`http://api.airvisual.com/v2/nearest_city?lat=${String(latitude).match(/-?\d+\.?\d+/g)}&lon=${String(longitude).match(/-?\d+\.?\d+/g)}&key=${key}`, requestOptions)
    const result = await data.json()
    return result
}
module.exports = {
    getNearestCity,
    getNearestCityUsingLatAndLon
}