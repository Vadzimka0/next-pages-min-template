import { Group, Title } from "@mantine/core";

import { MatchInfoType } from "@/types";

export const MatchInfo = ({ info }: { info: MatchInfoType }) => {
  return (
    <>
      <Group
        grow
        w={{ base: "100%", sm: "80%" }}
        my="xl"
        mx="auto"
        bd="1px solid green"
      >
        <Title order={2} ta="center" fz={{ base: "h3", sm: "h2" }}>
          {info.home}
        </Title>
        <Title order={2} ta="center" fz={{ base: "h3", sm: "h2" }}>
          {info.away}
        </Title>
      </Group>
      {/* //TODO: odds */}
    </>
  );
};
