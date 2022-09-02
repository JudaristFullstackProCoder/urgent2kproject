import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";
import { ColorSchemeProvider } from "@mantine/core";
import usePersistentState from "../hooks/usePersistState";
import store from "store";
import { useEffect, useState } from "react";
import { NotificationsProvider } from "@mantine/notifications";

function MyApp({ Component, pageProps }) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);
  const [themeColor, setTheme] = usePersistentState(
    "theme",
    store.get("theme") ?? "light"
  );
  return (
    <ColorSchemeProvider>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: themeColor,
        }}
      >
        <NotificationsProvider>
          {pageLoaded ? (
            <Component
              {...pageProps}
              themeColor={themeColor}
              setTheme={setTheme}
            />
          ) : null}
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
