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
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [loading, setLoading] = useState(false);
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
        isLoading={loading}
        walletAddress={value}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<ArrowCircleRight fontSize="large" />}
        actionText={"Next Page"}
        onClickAction={async () => {
          setLoading(true);
          const query = qs.stringify({
            walletAddress: value,
          });
          await router.push("/upload" + "?" + query);
          setLoading(false);
        }}
        onConnectMetaMaskClick={async () => await connect()}
        onTextEnter={(v) => setValue(v)}
      />
    </Stack>
  );
};

export default Home;
