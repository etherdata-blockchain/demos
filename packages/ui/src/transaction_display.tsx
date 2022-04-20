import React from "react";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import {
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";

interface Props {
  transaction?: json_rpc_methods.GetTransactionByHashResponseObj;
}

export function TransactionDisplay(props: Props) {
  return (
    <Stack>
      <Stepper activeStep={Boolean(props.transaction?.blockHash) ? 3 : 1}>
        <Step>
          <StepLabel>Sent</StepLabel>
        </Step>
        <Step>
          <StepLabel>Pending</StepLabel>
        </Step>
        <Step>
          <StepLabel>Confirmed</StepLabel>
        </Step>
      </Stepper>
      <Grid container spacing={2}>
        <Grid xs={8} p={2}>
          {props.transaction && (
            <List>
              {Object.entries(props.transaction).map(([key, value]) => (
                <ListItem key={key}>
                  <ListItemText primary={key} secondary={value} />
                </ListItem>
              ))}
            </List>
          )}
        </Grid>
      </Grid>
    </Stack>
  );
}
