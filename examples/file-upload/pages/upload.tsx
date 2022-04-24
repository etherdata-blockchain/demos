import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";
import {
  BrowserFile,
  BrowserFileObject,
} from "@etherdata-blockchain/etherdata-sdk-file-browser";
import { Clear, Done } from "@mui/icons-material";
import {
  Alert,
  Button,
  CardMedia,
  Collapse,
  Divider,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { GetServerSideProps } from "next";
import React, { useCallback } from "react";

interface Props {
  balance: number;
  walletAddress: string;
}

const Input = styled("input")({
  display: "none",
});

export default function Upload({ balance, walletAddress }: Props) {
  // uploaded file state
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [fileId, setFileId] = React.useState<string>();

  // upload user seleted file
  const upload = useCallback(async () => {
    if (file) {
      try {
        const browserFile = new BrowserFile(process.env.NEXT_PUBLIC_FILE_URL!);
        const fileObject = new BrowserFileObject({ file: file, days: 2 });

        const fileId = await browserFile.uploadFile(fileObject);
        setFileId(fileId);
      } catch (err) {
        window.alert("Cannot upload file");
      }
    }
  }, [file]);

  return (
    <Stack alignItems={"center"} width="100vw" spacing={1}>
      <Box mt={10} mb={5} />
      <Typography variant="h5" fontWeight={"bolder"}>
        Wallet Address: {walletAddress}
      </Typography>
      <Typography variant="h6">
        Balance: {balance / 1000000000000000000} ETD
      </Typography>
      <Divider style={{ width: "50vw" }}>UPLOAD YOUR ART WORK</Divider>
      <Collapse in={file === undefined}>
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
          />
          <Button variant="contained" component="span">
            Upload
          </Button>
        </label>
      </Collapse>

      <Collapse in={fileId !== undefined}>
        <Alert severity={"success"}>FileID: {fileId}</Alert>
      </Collapse>
      <Stack mt={5} alignItems="center">
        <Typography variant="h6">{file?.name}</Typography>
        {/** Preview */}
        <CardMedia
          image={file ? URL.createObjectURL(file) : undefined}
          component={"div"}
          style={{ width: 500, height: 500 }}
        />
      </Stack>

      <Collapse in={file !== undefined}>
        <Stack direction={"row"}>
          <IconButton>
            <Done color="success" onClick={() => upload()} />
          </IconButton>
          <IconButton
            onClick={() => {
              setFile(undefined);
              setFileId(undefined);
            }}
          >
            <Clear color="error" />
          </IconButton>
        </Stack>
      </Collapse>
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { walletAddress } = ctx.query;
  const jsonRPC = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const balanceInHex = (await jsonRPC.getBalance(
    walletAddress as string,
    "latest"
  )) as any;
  const balance = parseInt(balanceInHex, 16);

  return {
    props: {
      balance,
      walletAddress: walletAddress as string,
    },
  };
};
