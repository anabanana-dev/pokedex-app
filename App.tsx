
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import Routes from './src/routes';
import theme from './styles/theme';
import ReactQueryProvider from './src/services/react-query';

export default function App() {
  return (
    <ReactQueryProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </ReactQueryProvider>
  );
}