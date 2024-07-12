import { StatsType } from "@/types";

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

export const DATES: any = [];

for (let index = 0; index < 10; index++) {
  //let index = 0
  DATES.push(
    new Date(
      new Date().getTime() + index * 24 * 60 * 60 * 1000
    ).toLocaleDateString()
  );
}

export const STATS_TITLES: any = {
  xg: "xG",
  ballPoss: "Ball Possession",
  goalAtps: "Goal Attempts",
  shotsOn: "Shots on Target",
  shotsOff: "Shots off Target",
  corners: "Corners",
  totPass: "Total Passes",
  complPass: "Completed Passes",
  attacks: "Attacks",
  dangAtks: "Dangerous Attacks",
};

export const TABS_VALUES = Object.keys(STATS_TITLES);
