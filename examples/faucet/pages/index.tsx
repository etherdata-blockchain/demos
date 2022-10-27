import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import { Account } from "@etherdata-blockchain/etherdata-sdk-account";
import { AccountBalanceWallet } from "@mui/icons-material";
import { Stack } from "@mui/material";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AppTitle } from "ui";

interface Props {
  count: number;
}

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

  const requestMoney = useCallback(async () => {
    setIsLoading(true);
    try {
      // which account we want to send
      const requestAccount = account || value;
      if (requestAccount) {
        const result = await axios.post("/api/request_money", {
          walletAddress: requestAccount,
        });
        await router.push(
          "/tx/" + result.data.transactionId + "?sender=" + requestAccount
        );
      }
    } catch (err) {
      window.alert(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, [account, value]);

  return (
    <Stack alignItems={"center"}>
      <AppTitle
        title={"ETD Faucet"}
        descriptions={[
          "This is a faucet for the Etherdata Testnet. It will send you 1 Ether each time.",
          `Total transactions: ${props.count}`,
        ]}
        isLoading={isLoading}
        isConnectingMetaMask={status === "connecting"}
        isConnected={status === "connected"}
        actionIcon={<AccountBalanceWallet />}
        actionText={"Request money"}
        onClickAction={async () => await requestMoney()}
        onConnectMetaMaskClick={async () => await connect()}
        walletAddress={value}
        onTextEnter={(v) => setValue(v)}
      />
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const method = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const account = new Account(process.env.PK!);
  const count = await method.getTransactionCount(account.address, "pending");
  return {
    props: {
      count: parseInt(count as any, 16),
    },
  };
};
