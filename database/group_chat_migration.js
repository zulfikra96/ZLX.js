
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:`CREATE TABLE group_chat (
            id INT AUTO_INCREMENT PRIMARY KEY, 
            user_id INT(20)  UNSIGNED NOT NULL,
            group_id INT(20) UNSIGNED,
            group_name VARCHAR(50),
            group_type BOOLEAN 
        )`,
    down:"DROP TABLE group_chat"
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
