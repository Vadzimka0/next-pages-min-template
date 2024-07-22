import { useState } from "react";
import { useRouter } from "next/router";
import { Center, Container, Select, Tabs } from "@mantine/core";

import { MatchInfo } from "@/components/match-info";
import { STATS_TITLES, TABS_VALUES } from "@/config/constants";
import { TableSelection } from "@/components/table";
import { useMatchData } from "@/hooks/useMatchData";
import classes from "@/styles/index.module.css";

const MatchPage = () => {
  const router = useRouter();
  const matchId = router.query.matchId as string;

  const {
    homeMatches,
    awayMatches,
    matchInfo,
    onChangeCheckboxHome,
    firstSelect,
    setFirstSelect,
    secondSelect,
    setSecondSelect,
    filteredHomeMatches,
    filteredAwayMatches,
  } = useMatchData(matchId);

  const [category, setCategory] = useState<string | null>("xg");

  //TODO: loading state
  if (!matchInfo || !homeMatches || !awayMatches) return <>404</>;

  return (
    <Container size="xl" bd="1px dotted grey">
      <MatchInfo info={matchInfo} />
      <Center fz="15px" mt="md" mb="md">
        {matchInfo.home}:&nbsp; Last&nbsp;
        <Select
          w="90px"
          data={["home", "away", "all"]}
          value={firstSelect}
          onChange={setFirstSelect}
        />
        &nbsp;matches:
      </Center>
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
          matches={filteredHomeMatches}
          onChangeCheckbox={onChangeCheckboxHome}
          category={category}
          select={firstSelect}
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
  );
};

export default MatchPage;
