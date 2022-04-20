import { Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ETDContext } from "../models/etd_context";
import { AppTitle } from "ui";
import { ArrowCircleRight, ArrowRight } from "@mui/icons-material";
import qs from "query-string";

const Home: NextPage = () => {
  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [value, setValue] = useState("");
  const { setWalletAddress } = useContext(ETDContext);

  const router = useRouter();

  useEffect(() => {
    if (status === "connected") {
      setValue(account);
      setWalletAddress(account);
    }
  }, [status, account]);

  return (
    <Stack alignItems={"center"}>
      <AppTitle
        title={"File Upload Demo"}
        isLoading={false}
        walletAddress={value}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<ArrowCircleRight fontSize="large" />}
        actionText={"Next Page"}
        onClickAction={async () => {
          const query = qs.stringify({
            walletAddress: value,
          });
          await router.push("/upload" + "?" + query);
        }}
        onConnectMetaMaskClick={async () => await connect()}
        onTextEnter={(v) => setValue(v)}
      />
    </Stack>
  );
};

export default Home;
