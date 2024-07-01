import { Button, Group } from "@mantine/core";
import { useEffect } from "react";

const IndexPage = () => {
  useEffect(() => {
    throw new Error("asd");
  }, []);

  return (
    <Group mt={50} justify="center">
      <Button size="xl">Welcome to Mantine!</Button>
    </Group>
  );
};

export default IndexPage;
