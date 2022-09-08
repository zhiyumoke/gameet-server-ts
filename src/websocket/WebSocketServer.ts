import {WebSocketServer} from 'ws';
import {Rooms} from "../Room";
import {Client} from "./Client";

const wss = new WebSocketServer({port: 8080});

var rooms: Rooms=new Rooms();

wss.on('connection', function connection(ws) {
    console.log("connection");
    let client = new Client(ws);
    //寻找一个房间
    rooms.getNewClient(client);
    console.log(rooms);

    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });

    ws.send('something');
});