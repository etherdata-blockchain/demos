import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskProvider } from "metamask-react";
import ETDProvider from "../models/etd_context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MetaMaskProvider>
      <Component {...pageProps} />
    </MetaMaskProvider>
  );
}

export default MyApp;
