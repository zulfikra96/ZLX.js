"use strict"

const http      = require('http')
const NodeSession  =  require("node-session")
const url       = require('url')
const routes    = require('routes')()
global.qs        = require('querystring')
const datetime  = require('node-datetime')
const views      = require('swig')
global.crypt     = require('crypto-js')
const fs        = require('fs')
const socket_server  = require('socket.io')
global.secret    = 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
global.session   = new NodeSession({secret:secret})
const ip = require('ip')





// asset
function view(req,res,arg,params){
     res.end(views.renderFile(arg,params))
    
}

global.redirect = function(req,res,location){
    res.writeHead(302,{'Location' : `/${location}`});
    res.end()
}


var route = function(url,callback){
    routes.addRoute(url,function(req,res){
        req['params'] = this.params
        return callback(req,res)
    })
}

var api = function(route,callback){
    
    routes.addRoute(`/api${route}`,function(req,res){
        
        res.json = function (status,json){
            if (status === null) {
                status = 200
            }
            
            res.writeHead(status,{'Content-Type':'text/json'},{'Access-Control-Allow-Origin':'*'})
            return res.end(JSON.stringify(json))
        }
        req['params'] = this.params
        callback(req,res)
        
    })
}


var verifyToken = function (req,res,callback) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        
        const bearer = bearerHeader.split(" ")
        if(bearer[1] === undefined || typeof bearer[1] === -1){
            return res.json(403,{
                authorization:"forbiden",
                status:403,
                success:false
            })
        }
        const bearerToken = bearer[1]
        var token = bearerToken

        try {
            var decode = jwt.verify(token,'secreet')
        } catch (error) {
            return res.json(403,{
                authorization:"forbiden",
                status:403,
                success:false,
                message:'token invalid'
            }) 
        }
        
        
        
        if (localStorage.getItem(decode.user.username) !== token) {
            return res.json(403,{
                authorization:"forbiden",
                status:403,
                success:false,
                message:'token invalid'
            })     
        }
        return callback(token)

    }else{
        res.json(403,{
            authorization:"forbiden",
            status:403,
            success:false
        })
    }   
}



function run(listen,callback){

        routes.addRoute('/assets/*?',function(req,res){
            let url         = 'assets/' + this.splats.toString()
            let str_array   = url.split(".")
            let end_array   = str_array[str_array.length-1]
            
            fs.readFile(url,function(err,data){
                
                if(end_array == "png" || end_array == "jpeg" || end_array == "jpg"){
                    res.writeHead(200,{'Content-Type':`image/${end_array}`})
                    return res.end(data)
                }else if(end_array == "mpeg" || end_array == "ogg" || end_array == "mp4"){
                    res.writeHead(200,{'Content-Type':`video/${end_array}`})
                    return res.end(data)
                }else{
                     res.writeHead(200,{'Content-Type':`text/${end_array};charset=utf-8`})
                     return res.end(data)
                }
            })

        })

        routes.addRoute('/node_modules/*?',function(req,res){
            let url         = 'node_modules/' + this.splats.toString()
            let str_array   = url.split(".")
            let end_array   = str_array[str_array.length-1]
            fs.readFile(url,function(err,data){
                
                if(end_array == "png" || end_array == "jpeg" || end_array == "jpg"){
                    res.writeHead(200,{'Content-Type':`image/${end_array}`})
                    return res.end(data)
                }else if(end_array == "mpeg" || end_array == "ogg" || end_array == "mp4"){
                    res.writeHead(200,{'Content-Type':`video/${end_array}`})
                    return res.end(data)
                }else if(end_array == "map"){
                    res.writeHead(200,{'Content-Type':`application/octet-stream`})
                    return res.end(data)
                }
                else{
                     res.writeHead(200,{'Content-Type':`text/${end_array};charset=utf-8`})
                     return res.end(data)
                }
            })

        })


     var server =   http.createServer(function(req,res){
            let path = url.parse(req.url).pathname
            let match = routes.match(path)
            
         
            if (req.method.toUpperCase() === "OPTIONS"){


                // Echo back the Origin (calling domain) so that the
                // client is granted access to make subsequent requests
                // to the API.
                res.writeHead(
                    "204",
                    "No Content",
                    {
                        "access-control-allow-origin": '*',
                        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                        "access-control-allow-headers": "Content-Type, accept,access-control-allow-origin, Authorization",
                        "access-control-max-age": 10, // Seconds.
                        "content-length": 0,
                        'Access-Control-Allow-Credentials' : true
                    }
                );
    
                // End the response - we're not sending back any content.
                return( res.end() );
    
    
            }
            
            global.url = function(url){
                let host = 'http://'+req.headers.host + '/' + url
                return host
            }

            global.Auth = {
                user:function(arg){
                    return req.session.get('users',arg)
                }
            }
            
            global.Method = req.method.toString().toUpperCase()
            global.DateTime = datetime
            global.View     = view

            if(match){
                match.fn(req,res)
            }else{
                res.writeHead(404,{
                    'Content-Type': 'text/html'
                })
                res.end("No found")
            }
        }).listen(listen, function(){
           
            callback(listen)
        })
    global.Io = socket_server(server)
}


module.exports = { run, route, view,api, verifyToken}
