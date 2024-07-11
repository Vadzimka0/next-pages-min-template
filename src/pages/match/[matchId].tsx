import { useRouter } from "next/router";
import { Container } from "@mantine/core";

import { useMatch } from "@/features/match";
import { MatchInfo } from "@/components/match-info";
import { ChangeEvent, useEffect, useState } from "react";
import { API_URL } from "@/config/constants";
import { Table } from "@/components/table";
import { MatchType } from "@/types";

const MatchPage = () => {
  const router = useRouter();
  const matchId = router.query.matchId as string;
  // const matchData = useMatch({ matchId });

  // const initHomes = matchData.data?.home.map((match: any) => ({
  //   ...match,
  //   ch: true,
  // }));
  // const initAways = matchData.data?.home.map((match: any) => ({
  //   ...match,
  //   ch: true,
  // }));
  // const [homeMatches, setHomeMatches] = useState(initHomes || []);
  // const [awayMatches, setAwayMatches] = useState(initAways || []);

  // if (matchData.isLoading) <>..loading..</>;
  // if (!matchData.data) return <>404</>;

  // const matchInfo = matchData.data.matchInfo;

  const [data, setData] = useState<MatchType | null | undefined>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_URL}/match/${matchId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    };

    fetchData().catch((e) => {
      // handle the error as needed
      console.error("An error occurred while fetching the data: ", e);
    });
  }, []);

  // const onChangeCheckboxHome = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   homeMatches[index] = { ...homeMatches[index], ch: e.target.checked };
  //   setHomeMatches([...homeMatches]);
  // };

  // const onChangeCheckboxAway = (
  //   e: ChangeEvent<HTMLInputElement>,
  //   index: number
  // ) => {
  //   awayMatches[index] = { ...awayMatches[index], ch: e.target.checked };
  //   setAwayMatches([...awayMatches]);
  // };
  console.log(data);
  return (
    <>
      <Container size="xl">
        {data?.matchInfo && <MatchInfo info={data?.matchInfo} />}
        {/* //TODO: table */}
        {/* <Table matches={} onChangeCheckbox={} /> */}
        {/* //TODO: graph */}
      </Container>
    </>
  );
};

export default MatchPage;
