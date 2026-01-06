export type MatchStatus = "scheduled" | "live" | "finished";
export type MatchPatch = Partial<{
  status: MatchStatus;
  endTime: string | null;
  firstTeamScore: number | null;
  secondTeamScore: number | null;
}>;
