import {Client} from "./websocket/Client";
import {nanoid} from "nanoid";

interface room {
    roomId: string;
    clients: Client[];
    _roomIdSize: number;
    _maxClientNumber: number;
    _clientsNumber: number;

    //room接口
    addClient: (client: Client) => void;//添加client
    removeClient: (client: Client) => void;//移除client
    broadcast: (message: string) => void;//广播消息
    isFull: () => boolean;//判断是否满员
    start: () => void;//开始
}

export class Room implements room {
    roomId: string;
    clients: Client[];
    _roomIdSize: number = 6;
    _maxClientNumber: number = 3;
    _clientsNumber: number = 0;

    constructor() {
        this.roomId = nanoid(this._roomIdSize);
        this.clients = [];
    }

    addClient(client: Client): void {
        this.clients.push(client);
        this._clientsNumber = this._clientsNumber + 1;
        console.log("client added,clients number:",this.clients.length);
    }

    removeClient(client: Client): void {
        this.clients = this.clients.filter(c => c.id !== client.id);
        this._clientsNumber = this._clientsNumber - 1;
    }

    broadcast(message: string): void {
        this.clients.forEach(client => {
            client.ws.send(message);
        });
    }

    isFull(): boolean {
        return this.clients.length === this._maxClientNumber;
    }

    //这个方法到时候需要重写
    start(): void {
        console.log("人到三人了")
    }

}

export class Rooms{
    rooms: Room[] = [];

    addRoom(room: Room): void{
        this.rooms.push(room);
    }
    searchAvailableRoom(): Room | undefined{
        return this.rooms.find(room => !room.isFull());
    }
    getNewClient(client:Client){
        let room = this.searchAvailableRoom();
        if(room){
            room.addClient(client);
            if(room.isFull()){
                room.start();
            }
        }else{
            room = new Room();
            room.addClient(client);
            this.addRoom(room);
        }
    }
}