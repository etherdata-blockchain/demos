import { MoreVert } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
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
  const [fileId, setFileId] = React.useState<string | undefined>(undefined);
  const { provider } = useFileStorage({});

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
            window.alert(row.row.fid);
          }}
        >
          View FID
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
    </React.Fragment>
  );
}
