export type Pick = "team1" | "team2" | "draw";
export interface Bet {
  id: number;
  matchId:number;
  userId:number;
  pick:Pick;
  amount:number;

}
