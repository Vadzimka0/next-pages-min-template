import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import Head from "next/head";

import { AppProvider } from "@/providers/appProvider";

const App = ({ Component, pageProps }: any) => {
  return (
    <AppProvider>
      <Head>
        <title>Mantine Template</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </AppProvider>
  );
};

export default App;
