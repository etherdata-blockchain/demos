import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import { Alert, LinearProgress, Stack } from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import { TransactionDisplay } from "ui";

interface Props {
  transactionId: string;
}

export default function TransactionCard(props: Props) {
  const router = useRouter();
  const { transactionId } = props;
  const { data, error } =
    useSWR<json_rpc_methods.GetTransactionByHashResponseObj>(
      `/api/tx/${transactionId}`,
      async (url) => {
        const res = await fetch(url);
        return res.json();
      },
      { refreshInterval: 2000 }
    );

  return (
    <Stack p={5} direction="column" spacing={2}>
      {data === undefined && <LinearProgress />}{" "}
      {error && <Alert severity="error">{JSON.stringify(error)}</Alert>}
      <TransactionDisplay transaction={data} />
    </Stack>
  );
}
