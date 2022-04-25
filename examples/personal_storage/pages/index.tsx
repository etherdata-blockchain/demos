import { useContext, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { AppTitle } from "ui";
import { ArrowCircleRight, ArrowRight } from "@mui/icons-material";
import qs from "query-string";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
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
        title={"Cloud Storage Demo"}
        descriptions={[
          "This is a demo of a cloud storage service, you can use it to store files and download them at any time.",
        ]}
        isLoading={loading}
        walletAddress={value}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<ArrowCircleRight fontSize="large" />}
        actionText={"Next Page"}
        onClickAction={async () => {
          setLoading(true);
          await router.push("/upload");
          setLoading(false);
        }}
        onConnectMetaMaskClick={async () => await connect()}
        onTextEnter={(v) => setValue(v)}
        metamaskOnly={true}
      />
    </Stack>
  );
};

export default Home;
