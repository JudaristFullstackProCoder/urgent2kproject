import { MantineProvider } from '@mantine/core';
import '../styles/globals.css';
import { ColorSchemeProvider } from '@mantine/core';
import usePersistentState from '../hooks/usePersistState';
import store from 'store';

function MyApp({ Component, pageProps }) {
  const [themeColor, setTheme] = usePersistentState(
    'theme',
    store.get('theme') ?? 'light',
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
        <Component {...pageProps} themeColor={themeColor} setTheme={setTheme} />
        ;
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
