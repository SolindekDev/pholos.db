const StartJSON = require('./lib/JSON/index')
const db = require('quick.db')
const readline = require('readline')
const { start } = require('repl')
const JSON = new StartJSON({
    FilePath: "./config.json"
})
let firstStart = db.get('first_start') || "true"

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

if (firstStart == 'true')
{
    console.log("")
    console.log("")
    console.log("Hello it's your first start with Pholos.db")
    console.log("First let's give me some informations")
    console.log("")
    console.log("What's your port ( if you don't know or you don't have a port just leave it blank )")
    rl.question('Port: ', (port) => {
        db.set('database_port', port)
        console.clear()
        console.log('Great! Port has set.')
        console.log("")
        console.log("Set a login, You will always log into your database with your login ( if you leave ith blank it will be set to 'root' )")
        rl.question('Login: ', (login) => {
            console.clear()
            db.set('database_login', login)
            console.log('Great!!! Login has set! now last step')
            console.log("")
            console.log("Set a password ( if you leave it blank it will be set to '123' )")
            rl.question('Password: ', (password) => {
                console.clear()
                db.set('database_password', password)
                console.log("Great everything has set")
                console.log("this window will never show again, unless you reset the base")
                console.log("")
                console.log("App will be close in 3 second, then open it again")
                db.set('first_start', 'false')
                setTimeout(() => {
                    process.exit(0)
                }, 4000)
            })
        })
    })
} else {
    start()
    function start()
    {
        rl.question('/> ', (command) => {
            commandGet(command)
        })
    }

    function commandGet(command) {
        if (command == "help")
        {
            console.log("")
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
            console.log("start - Start a database")
            console.log("stop - Stop a database")
            console.log("options - Current settings of database")
            console.log("resetdatabase - !!Warning!! This command will reset all database")
            console.log("change - Change some variables")
            console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-")
            start()
        }
        if (command == "stop")
        {
            console.clear()
            console.log("Process will be killed in 3 seconds")
            setTimeout(() => {
                process.exit(0)
            }, 3000)
        }
        if (command == "options") {
            console.log('')
        }
        else {
            console.log("")
            console.log("Command not found, use command 'help'")
            start()
        }
    }
}

