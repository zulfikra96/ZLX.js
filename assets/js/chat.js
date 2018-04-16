"use strict"

var socket = io.connect("http://localhost:5000")

var send = function(){ 

    var val_1 = document.getElementById('input').value
    
    socket.emit('message',{message:val_1})
}

socket.on('receiver',function(data){
    console.log(data);
    document.getElementById('chat-box').innerHTML += `
        <div class="card"
            style="display:block;background-color:;"
        >
            ${data.message}
        </div>
    `
})

socket.on('message',function(data){
    console.log(data)
})


