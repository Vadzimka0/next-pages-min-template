import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Center,
  Container,
  Paper,
  ScrollArea,
  Select,
  Space,
  Stack,
  Tabs,
  Title,
  Text,
} from "@mantine/core";
import {
  AreaChart,
  ChartTooltipProps,
  getFilteredChartTooltipPayload,
} from "@mantine/charts";

import { MatchInfo } from "@/components/match-info";
import { STATS_TITLES, TABS_VALUES } from "@/config/constants";
import { TableSelection } from "@/components/table";
import { useMatchData } from "@/hooks/useMatchData";
import classes from "@/styles/index.module.css";
import { data } from "./data";
import { MatchHistoryType, StatsType } from "@/types";

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {getFilteredChartTooltipPayload(payload).map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name === "opponent" ? item.payload.opponentTeam : item.name}:{" "}
          {item.value}
          {item.payload.isHome ? "" : "*"}
        </Text>
      ))}
    </Paper>
  );
}

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

  function buildRequiredStats(
    matches: MatchHistoryType[],
    currentTeam: string | undefined,
    stats: string
  ) {
    if (!matches.length) return [];
    return matches
      ?.map((match: MatchHistoryType) => {
        const currentTeamStatsIndex = currentTeam === match.home ? 0 : 1;
        const opponentStatsIndex = currentTeam === match.home ? 1 : 0;

        let newObj = {
          date: new Date(match.ts).toDateString(), //.slice(4, 10),
          [`${currentTeam}`]:
            match.stats[stats as keyof StatsType] !== null
              ? match.stats[stats as keyof StatsType]![currentTeamStatsIndex]
              : 0,
          opponent:
            match.stats[stats as keyof StatsType] !== null
              ? match.stats[stats as keyof StatsType]![opponentStatsIndex]
              : 0,
          opponentTeam: match.home === currentTeam ? match.away : match.home,
          isHome: Boolean(opponentStatsIndex),
        };
        return newObj;
      })
      .filter(
        (match) => Boolean(match[currentTeam!]) || Boolean(match.opponent)
      );
  }

  const graphHomeMatches = buildRequiredStats(
    filteredHomeMatches.filter((match: MatchHistoryType) => match.ch),
    matchInfo?.home,
    firstCategory!
  ).reverse();

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
        <ScrollArea scrollbars="x">
          <Stack align="stretch" justify="center" gap="10px">
            <TableSelection
              matches={filteredHomeMatches}
              onChangeCheckbox={onChangeCheckboxHome}
              category={firstCategory}
              select={firstSelect}
            />
            <Box bd="1px solid lightgrey">
              <AreaChart
                bg={"blue.0"}
                h={200}
                data={graphHomeMatches}
                dataKey="date"
                tooltipProps={{
                  content: ({ label, payload }) => (
                    <ChartTooltip label={label} payload={payload} />
                  ),
                }}
                series={[
                  { name: `${matchInfo.home}`, color: "indigo.8" },
                  { name: "opponent", color: "orange.4" },
                ]}
                curveType="bump"
                // yAxisProps={{ domain: [0, 120] }}
                referenceLines={[{ y: 3, label: "Avg 3", color: "indigo.2" }]}
                xAxisProps={{ angle: -23 }}
                fillOpacity={0.33}
                connectNulls
              />
            </Box>
          </Stack>
        </ScrollArea>
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
        <ScrollArea scrollbars="x">
          <Stack align="stretch" justify="center" gap="10px">
            <TableSelection
              matches={filteredAwayMatches}
              onChangeCheckbox={onChangeCheckboxAway}
              category={secondCategory}
              select={secondSelect}
            />
            <Box bd="1px solid lightgrey">
              <AreaChart
                bg={"blue.0"}
                h={200}
                data={data}
                dataKey="date"
                tooltipProps={{
                  content: ({ label, payload }) => (
                    <ChartTooltip label={label} payload={payload} />
                  ),
                }}
                series={[
                  { name: "Bayern Munich", color: "indigo.8" },
                  { name: "opponent", color: "orange.4" },
                ]}
                curveType="bump"
                // yAxisProps={{ domain: [0, 120] }}
                referenceLines={[{ y: 3, label: "Avg 3", color: "indigo.2" }]}
                xAxisProps={{ angle: -23 }}
                fillOpacity={0.33}
                connectNulls
              />
            </Box>
          </Stack>
        </ScrollArea>
      </Tabs>
      <hr />
    </Container>
  );
};

export default MatchPage;
