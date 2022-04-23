import { BrowserFile } from "@etherdata-blockchain/etherdata-sdk-file-browser";
import React from "react";

export  function useDownload() {
  const download = React.useCallback(
    async (fileId: string, fileName: string) => {
      try {
        const file = new BrowserFile(process.env.NEXT_PUBLIC_FILE_URL!);
        await file.downloadFile({ fileId, downloadPath: fileName });
      } catch (err: any) {
        console.log(err);
        window.alert(`"Error downloading file: ${err}"`);
      }
    },
    []
  );
  return { download };
}
