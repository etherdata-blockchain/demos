import { useMetaMask } from "metamask-react";
import React, { useMemo } from "react";
import { ethers } from "ethers";
import { FileStorage__factory } from "file-storage-contract";
import useSWR from "swr";

interface Props {
  start?: number;
  end?: number;
}

export function useFileStorage({ start, end }: Props) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const provider = useMemo(() => {
    if (status === "connected") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner(account);
      return FileStorage__factory.connect(
        process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
        signer
      );
    }
  }, [ethereum, status]);

  const { data, error } = useSWR(
    { status, start, end },
    async ({ start, status, end }) => {
      if (status === "connected") {
        return {
          count: (await provider?.getFileSize()) ?? 0,
          files:
            (await provider?.getFilesInRange(start as number, end as number)) ??
            [],
        };
      }

      return undefined;
    },
    { refreshInterval: 5000 }
  );

  return {
    files: data,
    error: error,
    provider: provider,
  };
}
