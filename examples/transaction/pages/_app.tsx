import { MetaMaskProvider } from "metamask-react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  );
}

export default MyApp;
