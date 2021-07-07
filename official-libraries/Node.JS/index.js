const pholos = require('./main')
const db = new pholos({
    host: 'localhost',
    port: 3000,
    login: 'solindek',
    password: '123'
})

db.connect()

db.setValue('server_id_123', 'true')

db.getValue(`server_id_123`).then((out) => {
    console.log(out)
})