
const express = require('express')
const app = express()
var server
const db = require('quick.db')

module.exports = class Server {
    constructor(port, login, password) {
        if (!port) return console.log(TypeError("Port is not defined"))
        if (!login) return console.log(TypeError("Login is not defined"))
        if (!password) return console.log(TypeError("Password is not defined"))
        this.password = password
        this.port = port
        this.login = login
    }
    async startServer() {
        app.get('/', async (req, res) => {
            if (!req.query.login)
            {
                return res.json({ 
                    status: 101,
                    message: "Login query not found"
                })
            }
            if (!req.query.password)
            {
                return res.json({ 
                    status: 102,
                    message: "Password query not found"
                })
            }
            if (req.query.login != this.login) 
            {
                return res.json({ 
                    status: 101,
                    message: "Incorrect login!"
                })
            }
            if (req.query.password != this.password) 
            {
                return res.json({ 
                    status: 101,
                    message: "Incorrect login!"
                })
            }
            if (req.query.set)
            {
                if (req.query.set == "true")
                {
                    if (req.query.database)
                    {
                        if (req.query.setData)
                        {
                            db.set(`${req.query.database}`, `${req.query.setData}`)
                            res.json({
                                status: 204,
                                message: "Value has set"
                            })
                        }
                        else {
                            return res.json({
                                status: 103,
                                message: "setData query not found"
                            })
                        }
                    }
                    else {
                        return res.json({
                            status: 103,
                            message: "database query not found"
                        })
                    }
                }
            }
            if (req.query.get)
            {
                if (req.query.get == "true")
                {
                    
                }
            }
            else {
                await res.json({
                    status: 202,
                    message: "Logged in!"
                })
            }
            
        })
        
        if (this.port == "")
        {
            server = app.listen(process.env.PORT , () => {
                console.log(`Database started! on port ` + process.env.PORT)
            })
        }
        else {
            server = app.listen(this.port , () => {
                console.log(`Database started! on port ` + this.port)
            })
        }
    }
    stopServer() {
        server.close()
        console.log("Database is close!")
        process.exit(0)
    }
}
