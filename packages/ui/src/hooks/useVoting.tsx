import { useMetaMask } from "metamask-react";
import React, { useMemo } from "react";
import { ethers } from "ethers";
import { Votes__factory } from "VotingDapp";
import useSWR from "swr";
import { count } from "console";

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

  const { data, error} = useSWR(
    { status, start, end },
    async ({ start, status, end }) => {
      if (status === "connected") {
        return {
          count: (await provider?.getTotalProposals()) ?? 0,
          proposals:
            (await provider?.getProposalIds()) ??
            [],
          proposalName1: (await provider?.getProposalNameById(1).then()),
          voteName1: (await provider?.totalVotes(1).then()),
          proposalName2: (await provider?.getProposalNameById(2).then()),
          voteName2: (await provider?.totalVotes(2).then()),
          proposalName3: (await provider?.getProposalNameById(3).then()),
          voteName3: (await provider?.totalVotes(3).then()),
          proposalName4: (await provider?.getProposalNameById(4).then()),
          voteName4: (await provider?.totalVotes(4).then()),
          proposalName5: (await provider?.getProposalNameById(5).then()),
          voteName5: (await provider?.totalVotes(5).then()),
        };
      }

      return undefined;
    },
    { refreshInterval: 5000 }
  );

  return {
    proposals: data?.count.toString(),
    name1: data?.proposalName1?.toString(),
    name2: data?.proposalName2?.toString(),
    name3: data?.proposalName3?.toString(),
    name4: data?.proposalName4?.toString(),
    name5: data?.proposalName5?.toString(),
    vote1: data?.voteName1?.toString(),
    vote2: data?.voteName2?.toString(),
    vote3: data?.voteName3?.toString(),
    vote4: data?.voteName4?.toString(),
    vote5: data?.voteName5?.toString(),
    error: error,
    provider: provider,
  };
}
