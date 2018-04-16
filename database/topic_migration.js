
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:`CREATE TABLE topic (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description text,
    )`,
    down:"DROP TABLE topic"
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
