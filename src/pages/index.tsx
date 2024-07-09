import { Fragment, useState } from "react";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Table, Center, Box, Group, Stack, Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";

import { getFixtures } from "@/features/fixtures";
import { DATES } from "@/config/constants";

type PublicFixturesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const IndexPage = ({ fixtures }: PublicFixturesPageProps) => {
  const [value, setValue] = useLocalStorage<string>({
    key: "last-date",
    defaultValue: new Date().toLocaleDateString(),
  });

  // c useLocalStorage надо переделать ибо в ЛокалСторэдж может сохранить вчерашняя или более поздняя дата, надо тут написать custom hook,
  // который будет проверять на дату, если старая, то возвращаем value - сегодняшнюю

  const rows = fixtures.data.map((row: any, index: number) => {
    return (
      <Fragment key={row.id}>
        {index === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={3} tt="uppercase" fw="bold" pt={16}>
              <Group justify="center" gap={0} tt="uppercase">
                <Box tt="capitalize">{row.country}</Box>:&nbsp;
                <Box c="gray">{row.league}</Box>
              </Group>
            </Table.Td>
          </Table.Tr>
        ) : (
          index &&
          !(row.league === fixtures?.data[index - 1]?.league) && (
            <Table.Tr>
              <Table.Td colSpan={3} fw="bold" pt={16}>
                <Group justify="center" gap={0} tt="uppercase">
                  <Box tt="capitalize">{row.country}</Box>:&nbsp;
                  <Box c="gray">{row.league}</Box>
                </Group>
              </Table.Td>
            </Table.Tr>
          )
        )}
        <Table.Tr key={row.id} fz={15}>
          <Table.Td ta="center" pb={1} pt={1}>
            {new Date(row.ts).toLocaleDateString()}
            {new Date(row.ts).toTimeString().slice(0, 5)}
          </Table.Td>
          <Table.Td ta="right" pb={1} pt={1}>
            {row.home}
          </Table.Td>
          <Table.Td ta="left" pb={1} pt={1}>
            {row.away}
          </Table.Td>
        </Table.Tr>
      </Fragment>
    );
  });

  return (
    <>
      <Group>
        {DATES.map((curDate: any) => (
          <Button
            variant={value === curDate ? "filled" : "light"}
            size="sm"
            key={curDate}
            onClick={() => setValue(curDate)}
          >
            {curDate === DATES[0]
              ? "Today"
              : new Date(curDate).toDateString().slice(4, 10)}
          </Button>
        ))}
      </Group>
      <Center style={{ border: "1px solid green" }}>
        <Table.ScrollContainer
          minWidth={540}
          style={{ border: "1px solid red" }}
        >
          <Table highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">Year</Table.Th>
                <Table.Th ta="center">Home</Table.Th>
                <Table.Th ta="center">Away</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Center>
    </>
  );
};

export default IndexPage;

export const getServerSideProps = async () => {
  const fixtures = await getFixtures().catch(() => null);

  return {
    props: {
      fixtures,
    },
  };
};
