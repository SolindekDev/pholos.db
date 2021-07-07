var resultsReturn
const axios = require('axios')

module.exports = class Connection {
    /**
     * Connect with database
     * @param {*} options 
     * @returns connect 
     */
    constructor(options) {
        // TypeErrors
        if (!options.host) return console.log(TypeError("Host is not defined in constructor"))
        if (!options.login) return console.log(TypeError("Host is not defined in login"))
        if (!options.password) return console.log(TypeError("Host is not defined in password"))

        // Add to object options
        this.host = options.host
        this.login = options.login
        this.password = options.password

        // Port define
        if (options.port) {
            this.port = ":" + options.port
        }
    }
    connect() {
                // Create a url
                let url = `http://${this.host}${this.port}/?login=${this.login}&password=${this.password}`
        
                // Connect with database
                axios.get(url).then((results) => {
                    if (results.data.status == 202) {
                        // We logged in the database with out any error!!1!1!1!1
                        // We connected
                        this.connect = 'true'
                    }
                    else if (results.data.status == 101) {
                        // Our login or password is incorrect
                        console.log(TypeError("Incorrect login or password!"))
                    } else {
                        console.log(TypeError('Update Pholos.db nodejs'))
                    }
                })
    }
    /**
     * You get a value from database
     * 
     * @param {*} databaseName 
     * @returns {*} Value from database
     */
    getValue(databaseName) {
        if (!databaseName) return console.log(TypeError("databaseName is not defined"))
        let url = `http://${this.host}${this.port || ""}/?login=${this.login}&password=${this.password}&get=true&getDatabaseValue=${databaseName}`

        return getValueFunction(url).then((out) => out.results)
    }
    setValue(databaseName, ValueToSet) {
        if (!databaseName) return console.log(TypeError("databaseName is not defined"))
        if (!ValueToSet) return console.log(TypeError("ValueToSet is not defined"))
        let url = `http://${this.host}${this.port || ""}/?login=${this.login}&password=${this.password}&set=true&database=${databaseName}&setData=${ValueToSet}`
        console.log(url)
    }
}

async function getValueFunction(url) {
    
    let req = await axios.get(url)
    let res = req.data

    return Promise.resolve(res)
}