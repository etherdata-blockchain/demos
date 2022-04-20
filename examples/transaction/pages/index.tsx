import { ArrowCircleRight } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AppTitle } from "ui";

interface Props {}

export default function Index(props: Props) {
  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (status === "connected") {
      setValue(account);
    }
  }, [status, account]);

  return (
    <Stack alignItems={"center"}>
      <AppTitle
        title={"Send Transaction Demo"}
        descriptions={["Send transaction and sign it using MetaMask."]}
        isLoading={isLoading}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<ArrowCircleRight />}
        actionText={"Send money"}
        onClickAction={async () => await router.push("/tx")}
        onConnectMetaMaskClick={async () => await connect()}
        walletAddress={value}
        onTextEnter={(v) => setValue(v)}
      />
    </Stack>
  );
}
