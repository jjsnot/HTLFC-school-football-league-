
export interface Match {
  id: number;
  round: number;
  team1Id: number;
  team2Id: number;
  status: "live" | "scheduled" | "finished"
  duration: number;
  endTime?: number;

  firstTeamScore?:number
  secondTeamScore?:number
}
