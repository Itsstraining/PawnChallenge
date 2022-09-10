import { Timer } from "./timer"


export class UserGame {
    uid: string
    roomId: string //roomId == '' => chưa tham gia phòng
    socketId: string
    name: string
    inGame: boolean
    chessControl: ChessControl
    img: string
    constructor(uid: string, name: string, socketId, roomId: string, inGame: boolean, chessControl: ChessControl, img: string) {
        this.uid = uid
        this.socketId = socketId
        this.name = name
        this.roomId = roomId
        this.inGame = inGame
        this.chessControl = chessControl
        this.img = img
    }
}

export class ChessControl {
    controlChess: string // W || B
    tableStr: string
    timer: Timer
    constructor(controlChess: string, tableStr: string, timer: Timer,) {
        this.controlChess = controlChess
        this.tableStr = tableStr
        this.timer = timer
    }
}

export class Room {
    roomID: string
    socketID1: string
    socketID2: string
    ffishID: string
    board: ''
    timer: Timer

    constructor() {
        this.roomID = ''
        this.socketID1 = ''
        this.socketID2 = ''
        this.board = ''
        this.ffishID = ''
        this.timer = new Timer()
    }
}