
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:`CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE,
        level_id INT(10) ,
        no_hp VARCHAR(12) UNIQUE,
        email VARCHAR(100) UNIQUE,
        password VARCHAR(100) 
    )`,
    down:"DROP TABLE users"
}
if (argv.migration == 'create') {
   
    con.query(migration.up,function(err,result){
        if(err){
            console.log(err); 
        }
        console.log("table success");
        process.exit()
        
    })
}

if (argv.migration == 'drop') {
    con.query(migration.down,function(err,result){
        if(err) throw err
        console.log("table drop");
        process.exit()        
    })
}
