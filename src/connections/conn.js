const mySql =require('mysql')
var conn = mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'school'
})



module.exports =conn