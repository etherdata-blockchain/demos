import { Clear, Done } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Card,
  CardContent,
  Collapse,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import moment from "moment";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { FileTable, useVoting } from "ui";
import { Config } from "../configs/config";

interface Props {
  page: number;
}

const Input = styled("input")({
  display: "none",
});

const width = "80vw";

export default function Upload({ page }: Props) {
  
  const {  } = useVoting({
  });
  const [value, setValue] = React.useState<any>("");
  const router = useRouter();

  return (
    <Stack alignItems={"center"} width="100vw" spacing={2}>
      <div style={{ height: 120 }} />
      <Card variant="outlined" style={{ width }}>
        <CardContent>
          <Stack direction={"row"} justifyContent={"space-between"}>
            <Stack>
              <Typography>Upload</Typography>
              <Stack direction={"row"} alignItems="center">
                <Typography fontWeight={"bold"}>
                  {file?.name ?? "No file selected"}
                </Typography>
                <Collapse in={file !== undefined}>
                  <div>
                    <LoadingButton
                      loading={isUploading}
                      loadingPosition="start"
                      startIcon={<Done color="success" />}
                      onClick={async () => {
                        await upload();
                      }}
                    />

                    <LoadingButton
                      startIcon={<Clear color="error" />}
                      loadingPosition="start"
                      onClick={() => {
                        setFile(undefined);
                        setValue("");
                      }}
                    />
                  </div>
                </Collapse>
              </Stack>
            </Stack>
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (e.target.files) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
              <Button component="span">Upload</Button>
            </label>
          </Stack>
        </CardContent>
      </Card>
      <FileTable
        rows={
          files?.files.map((f: any, index: number) => ({
            id: (page - 1) * Config.defaultNumberPerPage + index,
            fid: f.fileId,
            type: f.fileType,
            name: f.fileName,
            date: `${moment(f.fileCreated.toNumber())}`,
            size: f.fileSize,
          })) ?? []
        }
        width={width}
        pageSize={Config.defaultNumberPerPage}
        numPages={Math.ceil(
          ((files?.count as number) ?? 1) / Config.defaultNumberPerPage
        )}
        currentPage={page}
        onPageChange={(page: number) => {
          router.push(`/upload?page=${page}`);
        }}
      />
    </Stack>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const page = parseInt((ctx.query.page as string) || "1");

  return {
    props: {
      page,
    },
  };
};
