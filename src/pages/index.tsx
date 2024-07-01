import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { Button, Group } from "@mantine/core";
import { getFixtures } from "@/features/fixtures";

type PublicFixturesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const IndexPage = ({ fixtures }: PublicFixturesPageProps) => {
  // const fixtures = useFixtures();

  console.log(fixtures);

  return (
    <Group mt={50} justify="center">
      <Button component={Link} href="/" size="compact-xs">
        xg
      </Button>
    </Group>
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
