import { InferGetServerSidePropsType } from "next";
import Link from "next/link";
import {
  Button,
  Group,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";

import { getFixtures } from "@/features/fixtures";

type PublicFixturesPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

const IndexPage = ({ fixtures }: PublicFixturesPageProps) => {
  const duels = fixtures.data;
  // console.log(duels);

  const { colorScheme, setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* <Group mt={50} justify="center"> */}
      <div>
        <Button onClick={toggleColorScheme}>
          switch to {computedColorScheme === "light" ? "dark" : "light"}
        </Button>
        {/* <Switch onChange={toggleColorScheme} /> */}
      </div>
      {duels?.map((duel: { ts: number; id: string }) => (
        <Button
          key={duel.id}
          component={Link}
          href="/"
          size="compact-xs"
          // style={{ backgroundColor: "var(--mantine-color-red-8)" }}
        >
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
