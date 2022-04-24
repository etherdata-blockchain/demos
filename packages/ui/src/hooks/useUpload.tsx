import {
  BrowserFile,
  BrowserFileObject,
} from "@etherdata-blockchain/etherdata-sdk-file-browser";
import { BigNumber } from "ethers";
import { StorageFile } from "file-storage-contract";
import moment from "moment";
import React, { useCallback, useEffect } from "react";

import { useFileStorage } from "./useFileStorage";

export function useUpload({ days }: { days: number }) {
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [fileId, setFileId] = React.useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = React.useState(false);
  const { provider } = useFileStorage({  });

  const upload = useCallback(async () => {
    if (file && provider) {
      setIsUploading(true);
      try {
        const browserFile = new BrowserFile(process.env.NEXT_PUBLIC_FILE_URL!);
        const fileObject = new BrowserFileObject({
          file: file,
          days: days,
        });
        const fileId = await browserFile.uploadFile(fileObject);
        const storageFile: StorageFile = {
          fileId: fileId,
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileOwner: provider.address,
          fileCreated: BigNumber.from(moment().valueOf()).toString(),
        };
        const tx = await provider.addFile(storageFile);
        await tx.wait();
        setFileId(fileId);
      } catch (err) {
        console.log(err);
        window.alert("Cannot upload file");
      } finally {
        setIsUploading(false);
        setFile(undefined);
      }
    }
  }, [file, provider]);

  return { file, setFile, upload, isUploading };
}
