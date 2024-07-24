import { useState } from "react";
import { useRouter } from "next/router";
import { Center, Container, Select, Space, Tabs, Title } from "@mantine/core";

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
    onChangeCheckboxAway,
    firstSelect,
    setFirstSelect,
    secondSelect,
    setSecondSelect,
    filteredHomeMatches,
    filteredAwayMatches,
  } = useMatchData(matchId);

  const [firstCategory, setFirstCategory] = useState<string | null>("xg");
  const [secondCategory, setSecondCategory] = useState<string | null>("xg");

  //TODO: loading state
  if (!matchInfo || !homeMatches || !awayMatches) return <>404</>;

  return (
    <Container size="xl" bd="1px dotted grey">
      <MatchInfo info={matchInfo} />
      <Center fz="15px" mt="xs" mb="xs">
        <Title order={4}>{matchInfo.home}</Title>:&nbsp; last few&nbsp;
        <Select
          w="90px"
          data={["home", "away", "h&a"]}
          value={firstSelect}
          onChange={setFirstSelect}
          defaultValue="home"
          allowDeselect={false}
        />
        &nbsp;matches:
      </Center>
      <Tabs
        value={firstCategory}
        onChange={setFirstCategory}
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
          category={firstCategory}
          select={firstSelect}
        />
      </Tabs>
      <Space h={40} />
      <Center fz="15px" mt="xs" mb="xs">
        <Title order={4} bg="lightblue">
          {matchInfo.away}
        </Title>
        :&nbsp; last few&nbsp;
        <Select
          w="90px"
          data={["home", "away", "h&a"]}
          value={secondSelect}
          onChange={setSecondSelect}
          defaultValue="away"
          allowDeselect={false}
        />
        &nbsp;matches:
      </Center>
      <Tabs
        value={secondCategory}
        onChange={setSecondCategory}
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
          matches={filteredAwayMatches}
          onChangeCheckbox={onChangeCheckboxAway}
          category={secondCategory}
          select={secondSelect}
        />
      </Tabs>
      <hr />
    </Container>
  );
};

export default MatchPage;
