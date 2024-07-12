import { Table, Text, Checkbox, ScrollArea, rem } from "@mantine/core";
import cx from "clsx";

import classes from "./TableSelection.module.css";
import { MatchHistoryType, StatsType } from "@/types";
import { ChangeEvent } from "react";
import { STATS_TITLES } from "@/config/constants";

type TableSelectionProps = {
  matches: MatchHistoryType[];
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
  category: string | null;
};

export const TableSelection = ({
  matches,
  onChangeCheckbox,
  category,
}: TableSelectionProps) => {
  const rows = matches.map((match: MatchHistoryType, index: number) => {
    let values = category
      ? match.stats[category as keyof typeof match.stats]
      : [];
    return (
      <Table.Tr key={index} className={cx({ [classes.rowSelected]: match.ch })}>
        <Table.Td>
          <Checkbox
            checked={match.ch}
            onChange={(e) => onChangeCheckbox(e, index)}
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

  return (
    <ScrollArea>
      <Table w={650} verticalSpacing="2px" withColumnBorders fz="12px">
        <Table.Thead>
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
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};
