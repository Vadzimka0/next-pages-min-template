// import { Stack, Button } from "@chakra-ui/react";
import { getMatch } from "@/features/match/api/get-match";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";

// import { NotFound } from "@/components/not-found";
// import { Seo } from "@/components/seo";
// import { PublicLayout } from "@/layouts/public-layout";
// import { getJob, PublicJobInfo } from "@/features/jobs";
// import { getOrganization } from "@/features/organizations";

type MatchPageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const MatchPage = ({ match }: MatchPageProps) => {
  console.log(match);
  // const isInvalid =
  // !job || !organization || organization.id !== job.organizationId;

  // if (isInvalid) {
  //   return <NotFound />;
  // }

  return <>123</>;
};

// PublicJobPage.getLayout = function getLayout(page: ReactElement) {
//   return <PublicLayout>{page}</PublicLayout>;
// };

export default MatchPage;

export const getServerSideProps = async ({
  params,
}: GetServerSidePropsContext) => {
  const matchId = params?.matchId as string;

  const match = await getMatch({ matchId }).catch(() => null);

  return {
    props: {
      match,
    },
  };
};
