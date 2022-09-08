import {nanoid} from "nanoid";
import WebSocket from 'ws';

interface socketClient extends WebSocket{
    id: string;
    ws: WebSocket;
    _idSize: number;
}

export class Client implements socketClient {
    id: string;
    ws: WebSocket;
    _idSize: number = 6;

    constructor(ws: WebSocket) {
        this.id = nanoid(this._idSize);
        this.ws = ws;
    }
}