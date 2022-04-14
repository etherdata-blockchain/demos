import { ArrowCircleRight, CheckCircle } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Collapse,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useMetaMask } from "metamask-react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ETDContext } from "../models/etd_context";
import qs from "query-string";

const Home: NextPage = () => {
  const [showIndex, setShowIndex] = useState<number | undefined>(undefined);
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const [value, setValue] = useState("");
  const { setWalletAddress } = useContext(ETDContext);

  const router = useRouter();

  useEffect(() => {
    if (status === "connected") {
      setValue(account);
      setWalletAddress(account);
    }
  }, [status, account]);

  return (
    <Stack alignItems={"center"}>
      <Box mt={20} mb={5}>
        <Typography variant="h3" fontWeight={"bolder"}>
          File Upload Demo
        </Typography>
      </Box>
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
            onFocus={() => setShowIndex(1)}
            onBlur={() => setShowIndex(undefined)}
          />
        </Collapse>
      </Stack>

      <Collapse in={value.length > 0} style={{ marginTop: 20 }}>
        <Tooltip title="Next Page">
          <ArrowCircleRight
            fontSize="large"
            style={{ color: "green", cursor: "pointer" }}
            onClick={async () => {
              const query = qs.stringify({
                walletAddress: value,
              });
              await router.push("/upload" + "?" + query);
            }}
          />
        </Tooltip>
      </Collapse>
    </Stack>
  );
};

export default Home;
