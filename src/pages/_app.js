import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "src/contexts/auth-context";
import { useNProgress } from "src/hooks/use-nprogress";
import { createTheme } from "src/theme";
import { createEmotionCache } from "src/utils/create-emotion-cache";
import "simplebar-react/dist/simplebar.min.css";
import { useState } from "react";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { config } from "@/libs/react-query-config";
import Devtools from "@/components/Devtools";
import { appWithTranslation } from "next-i18next";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/global.scss";
import "leaflet/dist/leaflet.css";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  // This ensures that data is not shared
  // between different users and requests
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>RTS</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MantineProvider>
          <ModalsProvider>
            <Notifications position="top-center" zIndex={9999} />
            <QueryClientProvider client={queryClient}>
              <Hydrate state={pageProps.dehydratedState}>
                <AuthProvider>
                  <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {getLayout(<Component {...pageProps} />)}
                  </ThemeProvider>
                </AuthProvider>
                <Devtools />
              </Hydrate>
            </QueryClientProvider>
          </ModalsProvider>
        </MantineProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default appWithTranslation(App);
