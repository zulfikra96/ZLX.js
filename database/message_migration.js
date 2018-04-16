
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:`CREATE TABLE message 
        (id INT AUTO_INCREMENT PRIMARY KEY, user_id INT(50) UNSIGNED,
            group_id INT(50) UNSIGNED,
            text_message TEXT,
            created_at TIMESTAMP, 
            is_topic BOOLEAN
        )`,
    down:"DROP TABLE message"
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
