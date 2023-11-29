//importando libraries
const {SerialPort, ReadlineParser} = require('serialport');
const { Server } = require("socket.io");
const http = require('node:http');
const express = require('express');

// Criar o Server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.sendFile(_dirname + '/public/index.html');

});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(999, () => {
    console.log('porta 10.24.19.139:', server.address().port);
});

// Configurações da porta serial
const myserial = new SerialPort({ path:'COM4', 
    baudRate: 9600, 
});

// decodificar o que vem da porta serial
const readline = require('node:readline/promises');
const { Socket } = require('dgram');
const paser = myserial.pipe(new ReadlineParser({delimiter: '\r\n'}));

// iniciando conexão 
myserial.on('open', function(){
    console.log("porta aberta!");
    paser.on('data', (data) => {
       //console.log(data);
        var dado = parseInt(((data*100)/1023));
       //console.log(dado);
        io.emit('serial:data',{
            Value: dado.toString()
        });
    });
});

//function ligaled(){
  //  myserial.write('A');
//}
//function desligaled(){
 //   myserial.write('B');
//}
//setTimeout(ligaled,2000);

// recebendo dados 
io.sockets.on('connection', function(socket){
    console.log('um novo nó foi conectado');

    socket.on('btnAction', function(btn){
        var dado_web = btn.value;
        console.log(dado_web);
        myserial.write(dado_web);
    });
    

});