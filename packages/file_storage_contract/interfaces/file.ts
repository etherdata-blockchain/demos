import { BigNumberish } from "ethers";

export interface StorageFile {
  fileId: string;
  fileName: string;
  fileType: string;
  fileSize: BigNumberish;
  fileOwner: string;
  fileCreated: BigNumberish;
}
