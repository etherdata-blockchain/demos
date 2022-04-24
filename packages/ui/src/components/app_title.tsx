import { CheckCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Collapse,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  title: string;
  descriptions?: string[];
  walletAddress?: string;
  isLoading: boolean;
  isConnectingMetaMask: boolean;
  isConnected: boolean;
  actionIcon: React.ReactNode;
  actionText: string;
  onClickAction(): void;
  onConnectMetaMaskClick(): void;
  onTextEnter(content: string): void;
  metamaskOnly?: boolean;
}

/**
 * Common App title for demos
 * @returns {JSX.Element}
 */
export function AppTitle(props: Props): JSX.Element {
  const {
    title,
    descriptions,
    walletAddress,
    isConnected,
    isLoading,
    actionIcon,
    actionText,
    isConnectingMetaMask,
    onClickAction,
    onConnectMetaMaskClick,
    onTextEnter,
  } = props;

  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);

  return (
    <Stack alignItems={"center"}>
      <Stack mt={20} mb={5} alignItems="center" justifyItems={"center"}>
        <Typography variant="h3" fontWeight={"bolder"}>
          {title}
        </Typography>
        {descriptions?.map((description, index) => (
          <Typography key={index}>{description}</Typography>
        ))}
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
              loading={isConnectingMetaMask}
              onMouseEnter={() => setShowIndex(0)}
              onMouseOut={() => setShowIndex(undefined)}
              onClick={() => onConnectMetaMaskClick()}
              variant="outlined"
            >
              {isConnected ? "Connected to metamask" : "Connect to metamask"}
            </LoadingButton>
            {isConnected && <CheckCircle style={{ color: "green" }} />}
          </Stack>
        </Collapse>
        {!props.metamaskOnly && (
          <Stack spacing={2} alignItems={"center"}>
            <Collapse in={showIndex === undefined}>
              <Divider style={{ width: "50vw" }}>OR</Divider>
            </Collapse>
            <Collapse in={showIndex === undefined || showIndex === 1}>
              <TextField
                fullWidth
                value={walletAddress}
                style={{ width: 500 }}
                label="Enter your wallet address here"
                onChange={(e) => onTextEnter(e.target.value)}
                onFocus={() => setShowIndex(1)}
                onBlur={() => setShowIndex(undefined)}
              />
            </Collapse>
          </Stack>
        )}
      </Stack>

      <Collapse in={Boolean(walletAddress?.length)} style={{ marginTop: 20 }}>
        <Tooltip title={actionText}>
          <LoadingButton
            loading={isLoading}
            loadingPosition="start"
            size="large"
            startIcon={actionIcon}
            onClick={async () => onClickAction()}
          />
        </Tooltip>
      </Collapse>
    </Stack>
  );
}
