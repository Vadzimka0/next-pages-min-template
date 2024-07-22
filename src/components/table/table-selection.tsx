import { ChangeEvent } from "react";
import {
  Table,
  Text,
  Checkbox,
  ScrollArea,
  rem,
  Paper,
  Stack,
  Group,
} from "@mantine/core";
import {
  AreaChart,
  ChartTooltipProps,
  getFilteredChartTooltipPayload,
} from "@mantine/charts";
import cx from "clsx";

import { MatchHistoryType, StatsType } from "@/types";
import { STATS_TITLES } from "@/config/constants";
import { calculateMatchesAverages } from "@/utils/calculate-matches-averages";
import classes from "./TableSelection.module.css";
import { data } from "./../../pages/match/data";

type TableSelectionProps = {
  matches: MatchHistoryType[];
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  category: string | null;
  select: string | null;
};

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

export const TableSelection = ({
  matches,
  onChangeCheckbox,
  category,
  select,
}: TableSelectionProps) => {
  const { firstAvg, secondAvg } = calculateMatchesAverages(matches, category);

  const rows = matches.map((match: MatchHistoryType) => {
    let values = category
      ? match.stats[category as keyof typeof match.stats]
      : [];
    return (
      <Table.Tr
        key={match.id}
        className={cx(
          { [classes.rowSelected]: match.ch },
          { [classes.rowNotSelected]: !match.ch }
        )}
      >
        <Table.Td>
          <Checkbox
            checked={match.ch}
            onChange={(e) => onChangeCheckbox(e, match.id)}
          />
        </Table.Td>
        <Table.Td>{match.home}</Table.Td>
        <Table.Td>
          <Text size="xs" fw="bold" ta="center">
            {values ? `${values[0]} - ${values[1]}` : "-"}
          </Text>
        </Table.Td>
        <Table.Td>{match.away}</Table.Td>

        <Table.Td fz="11px">{match.odds.final["1x2"][0].toFixed(2)}</Table.Td>
        <Table.Td fz="11px">{match.odds.final["1x2"][1].toFixed(2)}</Table.Td>
        <Table.Td fz="11px">{match.odds.final["1x2"][2].toFixed(2)}</Table.Td>
        <Table.Td>
          <Text size="xs" fw="bold">
            {match.score[0]}-{match.score[1]}
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  });

  const ths = (
    <Table.Tr>
      <Table.Th style={{ width: rem(40) }}></Table.Th>
      <Table.Th>Home</Table.Th>
      <Table.Th ta="center">
        {STATS_TITLES[category as keyof StatsType]}
      </Table.Th>
      <Table.Th>Away</Table.Th>
      <Table.Th style={{ width: rem(42) }}>1</Table.Th>
      <Table.Th style={{ width: rem(42) }}>X</Table.Th>
      <Table.Th style={{ width: rem(42) }}>2</Table.Th>
      <Table.Th style={{ width: rem(60) }}>Score</Table.Th>
    </Table.Tr>
  );
  const fhs = (
    <Table.Tr>
      <Table.Th style={{ width: rem(40) }}></Table.Th>
      {select === "all" ? (
        <>
          <Table.Th></Table.Th>
          <Table.Th></Table.Th>
        </>
      ) : (
        <>
          <Table.Th ta="end" fs="italic">
            Average
          </Table.Th>
          <Table.Th ta="center" fs="italic" fz="13px">
            {firstAvg.toFixed(2)} - {secondAvg.toFixed(2)}
          </Table.Th>
        </>
      )}
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
      <Table.Th></Table.Th>
    </Table.Tr>
  );

  return (
    <ScrollArea>
      <Stack align="stretch" justify="center" gap="30px">
        <Table w={650} verticalSpacing="2px" withTableBorder fz="12px">
          <Table.Thead>{ths}</Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
          <Table.Tfoot>{fhs}</Table.Tfoot>
        </Table>
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
      </Stack>
    </ScrollArea>
  );
};
