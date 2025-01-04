import { CacheProvider } from '@emotion/react';
import { CssBaseline, GlobalStyles, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { emotionCache, theme } from './const';

type Props = {
  children: React.ReactNode;
};
function Theme({ children }: Props) {
  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <GlobalStyles
            styles={{
              scrollbarWidth: 'thin',
              '::-webkit-scrollbar': {},
              '::-webkit-scrollbar-thumb': {
                borderRadius: '3px',
              },
            }}
          />

          <CssBaseline />
          {children}
        </ThemeProvider>
      </StyledEngineProvider>
    </CacheProvider>
  );
}

export default Theme;
