import { useMetaMask } from "metamask-react";
import React, { useMemo } from "react";
import { ethers } from "ethers";
import { Votes__factory } from "VotingDapp";
import useSWR from "swr";

interface Props {
  start?: number;
  end?: number;
}

export function useVoting({ start, end }: Props) {
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  const provider = useMemo(() => {
    if (status === "connected") {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner(account);
      return Votes__factory.connect(
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
          count: (await provider?.getTotalProposals()) ?? 0,
          proposals:
            (await provider?.getProposalIds()) ??
            [],
        };
      }

      return undefined;
    },
    { refreshInterval: 5000 }
  );

  return {
    proposals: data,
    error: error,
    provider: provider,
  };
}
