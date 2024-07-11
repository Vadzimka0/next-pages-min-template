// import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Container } from "@mantine/core";

// import { getMatch } from "@/features/match";
import { MatchInfo } from "@/components/match-info";
// import { NotFound } from "@/components/not-found";
// import { Seo } from "@/components/seo";

// type MatchPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const MatchTempPage = () => {
  //{ match }: MatchPageProps
  // if (!match) {
  //   return <>404</>;
  // }

  // const {
  //   matchInfo,
  //   home: homeHistoryMatches,
  //   away: awayHistoryMatches,
  // } = match;

  return (
    <>
      temp
      {/* <Container size="xl"> */}
      {/* <MatchInfo info={matchInfo} /> */}
      {/* //TODO: table */}
      {/* //TODO: graph */}
      {/* </Container> */}
    </>
  );
};

// PublicJobPage.getLayout = function getLayout(page: ReactElement) {
//   return <PublicLayout>{page}</PublicLayout>;
// };

export default MatchTempPage;

// export const getServerSideProps = async ({
//   params,
// }: GetServerSidePropsContext) => {
//   const matchId = params?.matchId as string;

//   const match = await getMatch({ matchId }).catch(() => null);

//   return {
//     props: {
//       match,
//     },
//   };
// };
