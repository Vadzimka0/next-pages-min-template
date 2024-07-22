import { ChangeEvent, useEffect, useState } from "react";

import { MatchHistoryType, MatchInfoType } from "@/types";
import { API_URL } from "@/config/constants";

export const useMatchData = (matchId: string) => {
  const [homeMatches, setHomeMatches] = useState<MatchHistoryType[]>([]);
  const [awayMatches, setAwayMatches] = useState<MatchHistoryType[]>([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfoType | null>(null);
  const [firstSelect, setFirstSelect] = useState<string | null>("home");
  const [secondSelect, setSecondSelect] = useState<string | null>("away");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/match/${matchId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setMatchInfo(result.matchInfo);
      const homes = result.home.map((match: any) => ({
        ...match,
        ch: true,
      }));
      const aways = result.away.map((match: any) => ({
        ...match,
        ch: true,
      }));
      setHomeMatches(homes);
      setAwayMatches(aways);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [matchId]);

  const onChangeCheckboxHome = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const index = homeMatches.findIndex((match) => match.id === id);
    homeMatches[index] = { ...homeMatches[index], ch: e.target.checked };
    setHomeMatches([...homeMatches]);
  };

  const onChangeCheckboxAway = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const index = awayMatches.findIndex((match) => match.id === id);
    awayMatches[index] = { ...awayMatches[index], ch: e.target.checked };
    setAwayMatches([...awayMatches]);
  };

  let filteredHomeMatches: MatchHistoryType[] = homeMatches;
  switch (firstSelect) {
    case "home":
      filteredHomeMatches = homeMatches.filter(
        (match) => matchInfo?.home === match.home
      );
      break;
    case "away":
      filteredHomeMatches = homeMatches.filter(
        (match) => matchInfo?.home === match.away
      );
      break;
    case "all":
      filteredHomeMatches = homeMatches;
      break;
    default:
      break;
  }

  let filteredAwayMatches: MatchHistoryType[] = awayMatches;
  switch (secondSelect) {
    case "home":
      filteredAwayMatches = awayMatches.filter(
        (match) => matchInfo?.home === match.away
      );
      break;
    case "away":
      filteredAwayMatches = awayMatches.filter(
        (match) => matchInfo?.away === match.away
      );
      break;
    case "all":
      filteredAwayMatches = awayMatches;
      break;
    default:
      break;
  }

  return {
    homeMatches,
    awayMatches,
    matchInfo,
    onChangeCheckboxHome,
    onChangeCheckboxAway,
    firstSelect,
    setFirstSelect,
    secondSelect,
    setSecondSelect,
    filteredHomeMatches,
    filteredAwayMatches,
  };
};
