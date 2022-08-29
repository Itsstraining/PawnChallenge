import { Chess } from "./chess.model"
import { Timer } from "./timer"

export interface Player{
  id: string
  name: string
  elo: number
  img: string
  isBase: boolean
  chessControl: ChessControl,
}

export interface ChessControl{
  chessID: string
  time: Timer
  chessSDie: String[]
  threatChess: Chess[]
  isCheckmat: boolean
}

