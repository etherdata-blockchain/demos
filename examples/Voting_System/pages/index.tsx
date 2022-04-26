import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AppTitle } from "ui";
import { ArrowCircleRight, ArrowRight } from "@mui/icons-material";
import qs from "query-string";

const Home: NextPage = () => {
  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [value, setValue] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (status === "connected") {
      setValue(account);
    }
  }, [status, account]);

  return (
    <Stack alignItems={"center"}>
      <AppTitle
        title={"Voting System Demo"}
        descriptions={[
          "This is a demo of a voting system, you can use this system to propose a candidate and vote for her/him.",
        ]}
        isLoading={false}
        walletAddress={value}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<ArrowCircleRight fontSize="large" />}
        actionText={"Next Page"}
        onClickAction={async () => {
          await router.push("/upload");
        }}
        onConnectMetaMaskClick={async () => await connect()}
        onTextEnter={(v) => setValue(v)}
        metamaskOnly={true}
      />
    </Stack>
  );
};

export default Home;
