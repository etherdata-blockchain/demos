import React, { createContext } from "react";

interface Props {
  walletAddress: string;
  setWalletAddress: (walletAddress: string) => void;
}

//@ts-ignore
export const ETDContext = createContext<Props>({});

export default function ETDProvider(props: any) {
  const [walletAddress, setWalletAddress] = React.useState("");

  const value: Props = {
    walletAddress,
    setWalletAddress,
  };

  return (
    <ETDContext.Provider value={value}>{props.children}</ETDContext.Provider>
  );
}
