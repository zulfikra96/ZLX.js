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


route("/home/delete",function (req,res) {
    if (req.methods == 'POST') {
        req.on('data',function(data){
            let json = qs.parse(data.toString())
            let sql = `DELETE FROM users WHERE id=${json.id}`
            con.query(sql,function(err,result){
                if(err) console.log();
                
                res.writeHead(302,{'Location':'/home'})
                return res.end()
            })
        
        })
    }
})


route("/home/:id",function(req,res){
    var id = req.params.id 
    if (req.methods == 'GET') {
        let sql = `SELECT * FROM users WHERE id=${id}`

        con.query(sql,function(err,result){
            if(err) console.log(err);
            return view(req,res,"./views/home/update.html",{
                result:result[0]
            })
        })
    }

   else if (req.methods == 'POST') {
        req.on('data',function(data){
            console.log(data.toString());
            
            let json_data = JSON.parse(data.toString())
            let sql = `UPDATE users SET nama = '${json_data.nama}', username = '${json_data.username}',password = '${json_data.password}' WHERE id = ${id}`

            con.query(sql,function(err,result){
                if(err) console.log(err);
                res.writeHead(302,{'Location':'/home'})
                return res.end()
            })
        })
    }
    
})

route("/home",function(req,res){
    if (req.methods == 'POST') {
        req.on('data',function (data) {
            let json = qs.parse(data.toString())
            let sql = `INSERT INTO users (nama,username,password) 
                        VALUE('${json.nama}','${json.username}','${json.password}')`

            con.query(sql,function (err,result) {
                if(err) console.log(err);

                res.writeHead(302,{'Location':'/home'})
                res.end()                  
            })
        })
    }

    if (req.methods == 'GET') {
        let sql = `SELECT * FROM users`
        con.query(sql,function(err,result){
            if (err) {
                console.log(err);      
            }
            console.log(result);
            view(req,res,"./views/home/index.html",{
                data:result
            })
        })  
    }
    
})

api("/home",function (req,res) {
    res.json(200,{
        "test":"hello world"
    })
})

route("/users",function (req,res) {
    if (Method == 'GET') {
        let sql = `SELECT * FROM users`
        con.query(sql,function(err,result){
            if (err) {
                console.log(err);      
            }
            console.log(result);
            res.writeHead(200,{
                'Content-Type':'application/json'
            })
            res.end(JSON.stringify(result))
        }) 
    }
     
})







// listen
var server =  run(8000, function () {
    console.log('run 8000')
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