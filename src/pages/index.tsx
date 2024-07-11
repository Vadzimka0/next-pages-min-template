import { Fragment } from "react";
import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Table, Center, Box, Group, Button } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";

import { getFixtures } from "@/features/fixtures";
// import { DATES } from "@/config/constants";
import useLocalStorage from "@/hooks/useLS";
// import classes from "./../styles/index.module.css";

type PublicFixturesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const IndexPage = ({ fixtures }: PublicFixturesPageProps) => {
  // const [value, setValue] = useLocalStorage(
  //   "last-date",
  //   new Date().toLocaleDateString()
  // );

  //TODO: отфильтровать только будущие матчи
  const updatedList = fixtures?.data;
  // ?.map((match: any) => ({
  //   ...match,
  //   date: new Date(match.ts).toLocaleDateString(),
  // }));
  // ?.filter((match: any) => match.date === value);
  // ?.sort((a: any, b: any) => a.league - b.league);

  const rows = updatedList.map((row: any, index: number) => {
    return (
      <Fragment key={row.id}>
        {index === 0 ? (
          <Table.Tr>
            <Table.Td colSpan={4} tt="uppercase" fw="bold" pt={16}>
              <Group justify="center" gap={0} tt="uppercase">
                <Box tt="capitalize">{row.country}</Box>:&nbsp;
                <Box c="gray">{row.league}</Box>
              </Group>
            </Table.Td>
          </Table.Tr>
        ) : (
          index &&
          !(row.league === updatedList[index - 1]?.league) && (
            <Table.Tr>
              <Table.Td colSpan={4} fw="bold" pt={16}>
                <Group justify="center" gap={0} tt="uppercase">
                  <Box tt="capitalize">{row.country}</Box>:&nbsp;
                  <Box c="gray">{row.league}</Box>
                </Group>
              </Table.Td>
            </Table.Tr>
          )
        )}
        <Table.Tr key={row.id} fz={15}>
          <Table.Td ta="center" pb={1} pt={1} fz={12}>
            {/* {new Date(row.ts).toLocaleDateString()}&nbsp; */}
            {new Date(row.ts).toDateString().slice(4, 10)},&nbsp;
            {new Date(row.ts).toTimeString().slice(0, 5)}
          </Table.Td>
          <Table.Td ta="right" pb={1} pt={1}>
            {row.home}
          </Table.Td>
          <Table.Td ta="center" pb={1} pt={1}>
            <Button
              size="compact-xs"
              variant="subtle"
              component={Link}
              href={`/match/${row.id}`}
            >
              h2h
            </Button>
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
      {/* <Center>
        <Carousel
          maw={{ base: "360px", md: "767px" }}
          slideSize={{ base: "10%", sm: "10%" }}
          slideGap={{ base: "xs" }}
          align="start"
          slidesToScroll={2}
          classNames={classes}
        >
          {DATES.map((curDate: any) => {
            return (
              <Carousel.Slide key={curDate}>
                <Button
                  variant={value == curDate ? "filled" : "light"}
                  size="lg"
                  onClick={() => setValue(curDate)}
                >
                  {curDate === DATES[0]
                    ? "Today"
                    : new Date(curDate).toDateString().slice(4, 10)}
                </Button>
              </Carousel.Slide>
            );
          })}
        </Carousel>
      </Center> */}
      <Center>
        <Table.ScrollContainer minWidth="auto">
          <Table highlightOnHover>
            {/* <Table.Thead>
              <Table.Tr>
                <Table.Th ta="center">Time</Table.Th>
                <Table.Th ta="center">Home</Table.Th>
                <Table.Th ta="center">Away</Table.Th>
              </Table.Tr>
            </Table.Thead> */}
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
