import { Send } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useMetaMask } from "metamask-react";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import SenderReceiverField from "../components/sender_receiver_field";
import TransactionCard from "../components/transaction_card";

interface Props {}

export default function Index(props: Props) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [receiver, setReceiver] = useState("");
  const [value, setValue] = useState("");
  const [transactionId, setTransactionId] = useState<string>();

  const router = useRouter();

  const send = useCallback(async () => {
    const transactionParameters = {
      to: receiver,
      from: ethereum.selectedAddress,
      value: (parseInt(value) * 10 ** 18).toString(16),
    };
    try {
      const txId = await ethereum.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      });
      setTransactionId(txId);
    } catch (err) {
      window.alert(`${(err as any).message}`);
    }
  }, [receiver, ethereum, value]);

  return (
    <Stack pt={4} p={10} spacing={2}>
      <Typography variant="h4">Create a transaction</Typography>
      <Card variant="outlined">
        <CardContent>
          <Stack spacing={5}>
            <SenderReceiverField
              sender={account ?? ""}
              receiver={receiver}
              onReceiverChange={(v) => setReceiver(v)}
            />
            <TextField
              fullWidth
              label="value"
              value={value}
              onChange={(v) => setValue(v.target.value)}
            />
          </Stack>
        </CardContent>

        <Stack p={3} direction={"row"} alignItems={"end"} justifyContent="end">
          <Button onClick={() => send()}>
            Send
            <Send />
          </Button>
        </Stack>
      </Card>

      {transactionId && (
        <Card variant="outlined">
          <TransactionCard transactionId={transactionId} />
        </Card>
      )}
    </Stack>
  );
}
