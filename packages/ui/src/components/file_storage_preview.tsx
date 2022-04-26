import { BrowserFile } from "@etherdata-blockchain/etherdata-sdk-file-browser";
import React, { useMemo } from "react";

interface PreviewImageProps {
  fileId: string;
}

export function FileStoragePreviewImage({ fileId }: PreviewImageProps) {
  const [image, setImage] = React.useState<any>(undefined);

  React.useEffect(() => {
    async function getImage() {
      const file = new BrowserFile(process.env.NEXT_PUBLIC_FILE_URL!);
      const fileContent = await file.getFileContent({ fileId });
      setImage(fileContent);
    }

    getImage();
  }, [fileId]);

  return (
    <div>
      {image && (
        <img
          src={`data:image/png;base64,${image}`}
          alt="preview"
          style={{ width: "100%" }}
        />
      )}
    </div>
  );
}
