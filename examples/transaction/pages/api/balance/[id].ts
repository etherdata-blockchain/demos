// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Account } from "@etherdata-blockchain/etherdata-sdk-account";
import {
  ChainId,
  Transaction,
} from "@etherdata-blockchain/etherdata-sdk-common";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";

type Data = {
  balance: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const walletAddress = req.query.id;
  const method = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const balanceResp = await method.getBalance(
    walletAddress as string,
    "latest"
  );
  const balance = parseInt(balanceResp as any, 16) / 10 ** 18;
  res.status(200).json({ balance });
}
