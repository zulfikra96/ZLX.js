"use strict";
const socket = require('socket.io')
const { route, view, run,api,verifyToken } = require('./config/server')
const jwt = require('jsonwebtoken')
const {  con } = require('./config/database')
const formidable = require('formidable')
var LocalStorage = require('node-localstorage').LocalStorage
var localStorage = new LocalStorage('./scratch')


// route
route("/index",function(req,res){
   view(req,res,"./views/index.html")
})

// listen
var server =  run(5000, function () {
    console.log('run 5000')
})
Io.on('connection',function(socket){
    console.log('made socket connection')

    socket.on('message',function(data){
       
        let sql = `INSERT INTO message (user_id,group_id,text_message) VALUES(${parseInt(data.user_id)},${parseInt(data.user_id)},'${data.text_message}')`
        con.query(sql,function (err,result) {
            if (err) {
                console.log(err);
            }
            console.log(data);
            
            Io.sockets.emit('receiver',data) 
        })
    })
    
    socket.on('message',function(data){
        // if (Method == 'POST') {
        //         let decode = jwt.verify(token,'secreet')
        //         let json = JSON.parse(data.toString())

        //         let sql = `INSERT INTO message (user_id,group_id,text_message) VALUES(${decode.user.id},${json.group_id},'${json.text_message}')`
        //         let sql_select = `SELECT * FROM  message WHERE group_id=${json.group_id}`
        //         con.query(sql,function(err,result){
        //             if(err) console.log(err);
        //         })
        //          function messageList() {
        //             let message = new Promise(function(resolve,reject) {
        //                return con.query(sql_select,function (err,result) {
        //                     if(err) console.log(err);
                            
        //                     resolve(result)
        //                 })
        //             })

        //             return message
        //         }

        //         function listUser() {
        //             let sql = `SELECT users.id,group_chat.id as group_id, users.username FROM group_chat INNER JOIN group_user ON group_chat.id = group_user.group_id INNER JOIN users on group_user.user_id = users.id WHERE group_chat.id = ${json.group_id}`
        //             let message = new Promise(function(resolve,reject) {
        //                return con.query(sql,function (err,result) {
        //                     if(err) console.log(err);
                            
        //                     resolve(result)
        //                 })
        //             })

        //             return message
        //         }

        //         async function jsonData(){
        //              var message_list = await messageList()
        //              var list_user = await listUser()
        //              let json = {}
        //              json['message_list'] = message_list
        //              json['list_user'] = list_user
        //              return json
        //         }

        //         jsonData().then(function (response) {
                    
        //             Io.sockets.emit('receiver',response)
        //         }).catch(function (err) {
        //             console.log(err);
                    
        //         })
         
        // }
        console.log('has ben connected');
        
    })

    setTimeout(function(){
        socket.send("pesan ini akan terkirim selama 2 menit")
    },2000)
})


var validation = function(value){

}