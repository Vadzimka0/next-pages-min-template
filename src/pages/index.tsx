import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Button, Group } from "@mantine/core";

import { getFixtures } from "@/features/fixtures";

type PublicFixturesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const IndexPage = ({ fixtures }: PublicFixturesPageProps) => {
  const duels = fixtures.data;
  console.log(duels);

  return (
    <>
      {/* <Group mt={50} justify="center"> */}
      {duels?.map((duel: { ts: number; id: string }) => (
        <Button key={duel.id} component={Link} href="/" size="compact-xs">
          {duel.id}
        </Button>
      ))}
      {/* </Group> */}
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
