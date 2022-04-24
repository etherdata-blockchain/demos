import { Pagination, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import ActionMenu from "./action_menu";

interface Props {
  rows: Row[];
  width: string;
  pageSize: number;
  numPages: number;
  currentPage: number;
  onPageChange(page: number): void;
}

interface Row {
  name: string;
  size: number;
  date: string;
  type: string;
  id: string | number;
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
  },
  {
    field: "name",
    headerName: "Name",
    flex: 2,
  },
  {
    field: "size",
    headerName: "Size",
    flex: 1,
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
  },
  {
    field: "date",
    headerName: "Created At",
    flex: 2,
  },
  {
    field: "fid",
    headerName: "FID",
    renderCell: (row) => {
      return <ActionMenu row={row} />;
    },
  },
];

export function FileTable({
  rows,
  width,
  pageSize,
  numPages,
  currentPage,
  onPageChange,
}: Props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={numPages}
        page={currentPage}
        onChange={(e, page) => {
          onPageChange(page);
        }}
      />
      <DataGrid
        columns={columns}
        rows={rows}
        style={{ width, minHeight: 150 }}
        paginationMode={"server"}
        pageSize={pageSize}
        hideFooter={true}
        page={currentPage}
        autoHeight={true}
      />
    </Stack>
  );
}
