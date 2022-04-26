import { MoreVert } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { GridRenderCellParams } from "@mui/x-data-grid";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import React, { useCallback } from "react";
import { useFileStorage } from "../hooks";
import { useDownload } from "../hooks/useDownload";
import { FileStoragePreviewImage } from "./file_storage_preview";

interface Props {
  row: GridRenderCellParams;
}

export default function ActionMenu({ row }: Props) {
  const popupState = usePopupState({
    variant: "popover",
    popupId: row.id.toString(),
  });

  const { download } = useDownload();
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = React.useState(false);
  const [fileDiloagOpen, setFileDiloagOpen] = React.useState(false);
  const [previewDialogOpen, setPreviewDialogOpen] = React.useState(false);
  const [fileId, setFileId] = React.useState<string | undefined>(undefined);
  const { provider } = useFileStorage({});
  const [copied, setCopied] = React.useState(false);

  const deleteFile = useCallback(async () => {
    if (provider) {
      try {
        setIsDeleting(true);
        const tx = await provider!.deleteFile(row.row.id);
        await tx.wait();
        setFileId(fileId);
      } catch (err) {
        window.alert(`"Error deleting file: ${err}"`);
      } finally {
        setIsDeleting(false);
      }
    }
  }, [provider, row.row.fid]);

  return (
    <React.Fragment>
      <IconButton {...bindTrigger(popupState)}>
        <MoreVert />
      </IconButton>
      <Menu {...bindMenu(popupState)}>
        <MenuItem
          onClick={() => {
            popupState.close();
            setFileDiloagOpen(true);
          }}
        >
          View FID
        </MenuItem>
        <MenuItem
          onClick={() => {
            popupState.close();
            setPreviewDialogOpen(true);
          }}
        >
          Preview
        </MenuItem>
        <MenuItem
          onClick={async () => {
            popupState.close();
            setConfirmDialogOpen(true);
          }}
        >
          Delete File
        </MenuItem>
        <MenuItem
          onClick={async () => {
            popupState.close();
            await download(row.row.fid.toString(), row.row.name);
          }}
        >
          Download File
        </MenuItem>
      </Menu>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this file?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <LoadingButton
            loading={isDeleting}
            onClick={async () => {
              await deleteFile();
              setConfirmDialogOpen(false);
            }}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>

      <Dialog
        open={fileDiloagOpen}
        onClose={() => setFileDiloagOpen(false)}
        fullWidth
      >
        <DialogTitle>File ID</DialogTitle>
        <DialogContent>
          <Tooltip
            title={copied ? "Copied" : "Copy to clipboard"}
            onClose={() => setCopied(false)}
          >
            <ListItemButton
              onClick={() => {
                navigator.clipboard.writeText(row.row.fid);
                setCopied(true);
              }}
            >
              <ListItemText
                primary={<Typography>File ID</Typography>}
                secondary={
                  <Typography noWrap textOverflow={"ellipsis"}>
                    {row.row.fid}
                  </Typography>
                }
              />
            </ListItemButton>
          </Tooltip>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFileDiloagOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={previewDialogOpen}
        onClose={() => setPreviewDialogOpen(false)}
        fullWidth
      >
        <DialogTitle>Preview</DialogTitle>
        <DialogContent>
          <FileStoragePreviewImage fileId={row.row.fid} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
