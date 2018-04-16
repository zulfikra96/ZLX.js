const { con } = require('./config/database')
const fs = require('fs')
var argv = require('yargs').argv


var name = `
const { con } = require('../config/database')
var argv = require('yargs').argv
var process = require('process')

var migration = {
    up:\`CREATE TABLE ${argv.name} (
        id INT AUTO_INCREMENT PRIMARY KEY,
    )\`,
    down:"DROP TABLE ${argv.name}"
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
`

if (argv.make) {
    switch (argv.make) {
        case 'migration':
            fs.writeFile(`database/${argv.name}_migration.js`,name,function(err){
                if (err) {
                    console.log(err);
                    return 
                }
                console.log(`success create migration ${argv.name}`);   
            })
            break;
        case 'migrate':
        
        default:
            break;
    }
}
