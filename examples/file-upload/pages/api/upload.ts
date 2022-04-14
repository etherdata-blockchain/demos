// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { nodeFile } from "@etherdata-blockchain/etherdata-sdk";
import formidable, { File } from "formidable";

type Data = {
  fileId?: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  /// get upload form data
  const form = formidable({uploadDir: "files"});
  const fileAPI = new nodeFile.NodeFile(process.env.FILE_URL!);

  const parse = () => new Promise<string>((resolve,  reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err)
        return;
      }
      const fileObject: File = (files.file as any)[0];
      resolve(fileObject.newFilename)
    });
  })

  const fileName = await parse()

  try{
    const uploadFile = new nodeFile.NodeFileObject({
      filePath: `files/${fileName}`,
      days: 2,
    });
    const fileId = await fileAPI.uploadFile(uploadFile);
    console.log("get file id", fileId);
    res.status(200).json({ fileId  });
  } catch (err){
    res.status(500).json({   });
  }
}
