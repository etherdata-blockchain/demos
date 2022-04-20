import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import useSWR from "swr";

interface Props {
  sender: string;
  receiver: string;
  onReceiverChange: (v: string) => void;
}

export default function SenderReceiverField(props: Props) {
  const { sender, receiver, onReceiverChange } = props;
  const [showDialog, setShowDialog] = React.useState(false);
  const [value, setValue] = React.useState("");

  const { data: senderBalance, error: senderBalanceError } = useSWR(
    sender,
    async (sender) => {
      if (sender.length > 0) {
        const res = await fetch(`/api/balance/${sender}`);
        return res.json();
      }
    },
    { refreshInterval: 10000 }
  );

  const { data: recevierBalance, error: receiverBalanceError } = useSWR(
    receiver,
    async (receiver) => {
      if (receiver.length > 0) {
        const res = await fetch(`/api/balance/${receiver}`);
        return res.json();
      }
    },
    { refreshInterval: 10000 }
  );

  return (
    <Stack spacing={5} direction="row">
      <Box flex={5}>
        <Stack>
          <Typography color={"gray"} variant="h6" fontWeight={"bold"}>
            Sender
          </Typography>
          <Typography>{sender}</Typography>
          <Typography fontWeight={"bold"}>
            Balance: {senderBalance?.balance ?? "0"}
          </Typography>
        </Stack>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box flex={5}>
        <Stack>
          <Typography color={"gray"} variant="h6" fontWeight={"bold"}>
            Receiver
          </Typography>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Box>
              <Typography>{receiver}</Typography>
              <Typography fontWeight={"bold"}>
                Balance: {recevierBalance?.balance ?? "0"}
              </Typography>
            </Box>
            <Button onClick={() => setShowDialog(true)}>Edit</Button>
          </Stack>
        </Stack>
      </Box>

      <Dialog open={showDialog} onClose={() => setShowDialog(false)} fullWidth>
        <DialogTitle>Edit Receiver</DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            onChange={(v) => setValue(v.target.value)}
            fullWidth
            placeholder="Receiver address"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDialog(false)}>Close</Button>
          <Button
            onClick={async () => {
              setShowDialog(false);
              onReceiverChange(value);
            }}
          >
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
