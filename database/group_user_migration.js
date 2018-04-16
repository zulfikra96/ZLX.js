
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:`CREATE TABLE group_user (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT(20) UNSIGNED NULL,
        group_id INT(20) UNSIGNED NULL
    )`,
    down:"DROP TABLE group_user"
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
