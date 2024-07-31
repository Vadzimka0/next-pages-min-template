import { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { ErrorBoundary } from "react-error-boundary";

// import { theme } from "../../theme";
// import { queryClient } from "@/lib/react-query";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <MantineProvider>
      {/* <Notifications /> */}
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      <ErrorBoundary
        fallback={<div>Something went wrong!</div>}
        onError={console.error}
      >
        {children}
      </ErrorBoundary>
      {/* </QueryClientProvider> */}
    </MantineProvider>
  );
};
