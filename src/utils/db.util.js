// UTILS: Database
require("dotenv").config()
const mysql = require("mysql")
const path = require("path")
const { getNearestCityUsingLatAndLon } = require(path.join(__dirname, "fetch.util.js"))

const setupDB = () => {
    /**
     * SETUP DATABASE: 
     * 1- connect to mysql
     * 2- create database if not existant
     * 3- create table if not existant
     */
    const connection = mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DP_PASSWORD
    })

    connection.connect()

    connection.query(`set SQL_SAFE_UPDATES = 0`, (error, results, fields) => {
        if (error) console.error("error 0")
    })

    connection.query(`create database ${process.env.DB_NAME_LEGACY}`, (error, results, fields) => {
        if (error) console.error("error 1", error.sqlMessage)
    })

    connection.query(`use ${process.env.DB_NAME_LEGACY}`, (error, results, fields) => {
        if (error) console.error("error 2", error.sqlMessage)
    })

    connection.query(`create table ${process.env.TABLE_NAME_LEGACY} (dataID int not null auto_increment, aqius int, mainus tinytext, aqicn int, maincn tinytext, ts datetime, primary key(dataID) )`, (error, results, fields) => {
        if (error) console.error("error 4", error.sqlMessage);
    })

    connection.end((error) => {
        if (error) console.error("error 3", error.sqlMessage)
    })
}


const addNewParisData = () => {
    /**
     * Call to retrieve Paris data - will save to database
     */
    const connection = mysql.createConnection({
        user: process.env.DB_USER,
        password: process.env.DP_PASSWORD
    })

    connection.connect()

    connection.query(`use ${process.env.DB_NAME_LEGACY}`, (error, results, fields) => {
        if (error) console.error("error 2", error.sqlMessage)
    })

    getNearestCityUsingLatAndLon( // fetch Paris data from remote server using LAT and LON
        process.env.PARIS_LATITUDE,
        process.env.PARIS_LONGITUDE,
        process.env.IQAIR_API_KEY

    ).then(result => {
        if (result.status === "success") { // Promise resolved with data
            const parisData = result.data.current.pollution // copy pollution data from fetch result
            parisData.ts = new Date() // add timestamp to copied data
            connection.query(`insert into ${process.env.TABLE_NAME_LEGACY} set ?`, // save copied data to DB
                parisData,
                (error, results, fields) => {
                    if (error) console.error(error)
                })
            connection.end()
        }
        // will not save data to DB if not .status: "success"

    }).catch(e => { // Promise throws error
        console.error(e)
        connection.end()
    })

} // calling this function wherever will fetch data from remote server and save to DB if .status: "success"

module.exports = {
    setupDB,
    addNewParisData
}