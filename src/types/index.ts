export type MatchInfoType = {
  id: string;
  ts: number;
  league: string;
  country?: string;
  odds: { first: OddsType; final: OddsType };
  home: string;
  away: string;
  preXg: [number, number];
};

type OddsType = {
  "1x2": [number, number, number];
  ou25: [number, number];
};

export type MatchHistoryType = MatchInfoType & {
  score: [number, number];
  stats: StatsType;
  ch?: boolean;
};

export type MatchType = {
  home: MatchHistoryType[];
  away: MatchHistoryType[];
  matchInfo: MatchInfoType;
};

export type StatsType = {
  xg: [number, number] | null;
  ballPoss: [`${number}%`, `${number}%`] | null;
  goalAtps: [number, number] | null;
  shotsOn: [number, number] | null;
  shotsOff: [number, number] | null;
  corners: [number, number] | null;
  totPass: [number, number] | null;
  complPass: [number, number] | null;
  attacks: [number, number] | null;
  dangAtks: [number, number] | null;
};

export type TeamSelectHost = "home" | "away" | "all";
