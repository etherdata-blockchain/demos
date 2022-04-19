import { AccountBalanceWallet, CheckCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Collapse,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import { GetServerSideProps } from "next";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import { Account } from "@etherdata-blockchain/etherdata-sdk-account";

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
      if (account) {
        const result = await axios.post("/api/request_money", {
          walletAddress: account,
        });
        await router.push("/tx/" + result.data.transactionId);
      }
    } catch (err) {
      window.alert(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  }, [account]);

  return (
    <Stack alignItems={"center"}>
      <Stack mt={20} mb={5} alignItems="center" justifyItems={"center"}>
        <Typography variant="h3" fontWeight={"bolder"}>
          Faucet
        </Typography>
        <Typography>
          This is a faucet for the Etherdata Testnet. It will send you 1 Ether
          each time.
        </Typography>
        <Typography variant="subtitle1" fontWeight={"bold"}>
          Total transaction count: {props.count}
        </Typography>
      </Stack>
      <Stack
        alignItems={"center"}
        justifyContent="center"
        spacing={2}
        width="100vw"
      >
        <Collapse in={showIndex === undefined || showIndex === 0}>
          <Stack direction={"row"} alignItems="center" spacing={1}>
            <LoadingButton
              loading={status === "connecting"}
              onMouseEnter={() => setShowIndex(0)}
              onMouseOut={() => setShowIndex(undefined)}
              onClick={async () => await connect()}
              variant="outlined"
            >
              {status === "connected"
                ? "Connected to metamask"
                : "Connect to metamask"}
            </LoadingButton>
            {status === "connected" && (
              <CheckCircle style={{ color: "green" }} />
            )}
          </Stack>
        </Collapse>
        <Collapse in={showIndex === undefined}>
          <Divider style={{ width: "50vw" }}>OR</Divider>
        </Collapse>
        <Collapse in={showIndex === undefined || showIndex === 1}>
          <TextField
            fullWidth
            value={value}
            style={{ width: 500 }}
            label="Enter your wallet address here"
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setShowIndex(1)}
            onBlur={() => setShowIndex(undefined)}
          />
        </Collapse>
      </Stack>

      <Collapse in={value.length > 0} style={{ marginTop: 20 }}>
        <Tooltip title="Accept payment">
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            size="large"
            startIcon={
              <AccountBalanceWallet
                fontSize="large"
                style={{ color: "green" }}
              />
            }
            onClick={async () => {
              await requestMoney();
            }}
          />
        </Tooltip>
      </Collapse>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const method = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const account = new Account(process.env.PK!);
  const count = await method.getTransactionCount(account.address, "latest");
  return {
    props: {
      count: parseInt(count as any, 16),
    },
  };
};
