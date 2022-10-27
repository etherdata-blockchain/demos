// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Account } from "@etherdata-blockchain/etherdata-sdk-account";
import {
  ChainId,
  Transaction,
} from "@etherdata-blockchain/etherdata-sdk-common";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";

type Data = {
  error?: string;
  transactionId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { walletAddress } = req.body;

  if (typeof walletAddress !== "string") {
    res.status(400).json({
      error: "walletAddress is required",
    });
    return;
  }
  const method = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const account = new Account(process.env.PK as string);

  const transactionCount = await method.getTransactionCount(
    account.address,
    "pending"
  );
  const gasPrice = await method.gasPrice();

  const tx: Transaction = {
    gas: 210000,
    to: walletAddress as string,
    gasLimit: 2100000,
    value: 10 ** 18,
    nonce: transactionCount,
    chainId: ChainId.TestNet,
    gasPrice: gasPrice,
  };

  const signedTx = account.signTransaction(tx);
  try {
    const txId = await method.sendRawTransaction(signedTx.rawTransaction);
    res.status(200).json({ transactionId: txId });
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}
