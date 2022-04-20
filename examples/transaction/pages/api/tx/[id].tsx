// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { json_rpc_methods } from "@etherdata-blockchain/etherdata-sdk";

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const method = new json_rpc_methods.JsonRpcMethods(process.env.RPC_URL!);
  const result = await method.getTransactionByHash(id as string);
  res.status(200).json(result);
}
