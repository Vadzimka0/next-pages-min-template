import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Tabs, Text } from "@mantine/core";

import { MatchInfo } from "@/components/match-info";
import { API_URL, STATS_TITLES, TABS_VALUES } from "@/config/constants";
import { MatchHistoryType, MatchInfoType, StatsType } from "@/types";
import { TableSelection } from "@/components/table";
import classes from "@/styles/index.module.css";

const MatchPage = () => {
  const router = useRouter();
  const matchId = router.query.matchId as string;

  const [category, setCategory] = useState<string | null>("xg");
  const [homeMatches, setHomeMatches] = useState<MatchHistoryType[]>([]);
  const [awayMatches, setAwayMatches] = useState<MatchHistoryType[]>([]);
  const [matchInfo, setMatchInfo] = useState<MatchInfoType | null>(null);

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
      // .filter((match: any) => match.home === data.matchInfo.home);
      const aways = result.away.map((match: any) => ({
        ...match,
        ch: true,
      }));
      // .filter((match: any) => match.away === data.matchInfo.away);
      setHomeMatches(homes);
      setAwayMatches(aways);
    };

    fetchData().catch((e) => {
      console.error("An error occurred while fetching the data: ", e);
    });
  }, [matchId]);

  const onChangeCheckboxHome = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    homeMatches[index] = { ...homeMatches[index], ch: e.target.checked };
    setHomeMatches([...homeMatches]);
  };

  const onChangeCheckboxAway = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    awayMatches[index] = { ...awayMatches[index], ch: e.target.checked };
    setAwayMatches([...awayMatches]);
  };

  //TODO: loading state
  if (!matchInfo || !homeMatches || !awayMatches) return <>404</>;

  return (
    <>
      <Container size="xl" bd="1px dotted grey">
        <MatchInfo info={matchInfo} />
        {/* //TODO: table */}
        <Tabs
          value={category}
          onChange={setCategory}
          orientation="vertical"
          className={classes.tabs}
          classNames={classes}
        >
          <Tabs.List>
            {TABS_VALUES.map((value: string) => (
              <Tabs.Tab key={value} value={value} fz={12}>
                {STATS_TITLES[value]}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <TableSelection
            matches={homeMatches}
            onChangeCheckbox={onChangeCheckboxHome}
            category={category}
          />
        </Tabs>
        <hr />
        {/* <TableSelection
          matches={awayMatches}
          onChangeCheckbox={onChangeCheckboxAway}
          category={category}
        /> */}
        {/* //TODO: graph */}
      </Container>
    </>
  );
};

export default MatchPage;
