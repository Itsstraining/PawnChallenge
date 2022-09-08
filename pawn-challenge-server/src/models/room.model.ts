import { User } from "./user.model";

export interface Room{
    roomId: string,
    players: User[],
    isPlaying: boolean,
    playerFirstStart: boolean,
    chessOut: Chess,
}

export interface Chess {
    isPawnUp: boolean
    id: string;
    name: string;
    img: string;
    icon: string;
    firstStep: boolean;
    position: Position;
  }
  
  export interface Position {
    x: number;
    y: number;
  }