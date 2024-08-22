import { EditIcon } from "@chakra-ui/icons";
import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { Checkbox } from "@chakra-ui/react";
import { Button } from "../button.jsx";
import { Input } from "../input.jsx";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table.jsx";

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};

export const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table?.getIsAllPageRowsSelected() ||
          (table?.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table?.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row?.getIsSelected()}
          onCheckedChange={(value) => row?.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "tenancyContract",
  //   header: "Tenancy Contract",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("tenancyContract")}</div>,
  // },
  // {
  //   accessorKey: "ownerID",
  //   header: "Owner ID",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("ownerID")}</div>,
  // },
  // {
  //   accessorKey: "tenantID",
  //   header: "Tenant ID",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("tenantID")}</div>,
  // },
  // {
  //   accessorKey: "addcClosing",
  //   header: "Addc Closing",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("addcClosing")}</div>,
  // },
  // {
  //   accessorKey: "coolingNoc",
  //   header: "Cooling Noc",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("coolingNoc")}</div>,
  // },
  // {
  //   accessorKey: "mou",
  //   header: "MOU",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("mou")}</div>,
  // },
  // {
  //   accessorKey: "offerLetter",
  //   header: "Offer Letter",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("offerLetter")}</div>,
  // },
  // {
  //   accessorKey: "applicationForm",
  //   header: "Application Form",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("applicationForm")}</div>,
  // },
  // {
  //   accessorKey: "developerConfirmation",
  //   header: "Developer Confirmation",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("developerConfirmation")}</div>,
  // },
  // {
  //   accessorKey: "ownerORDeveloperPaymentProof",
  //   header: "Owner/Developer Payment Proof",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("ownerORDeveloperPaymentProof")}</div>,
  // },
  // {
  //   accessorKey: "agencyFeePaymentProof",
  //   header: "Agency Fee Payment Proof",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("agencyFeePaymentProof")}</div>,
  // },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("type")}</div>,
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("userId")}</div>,
  },
  {
    accessorKey: "assignTo",
    header: "Assign To",
    cell: ({ row }) => {
      console.log(row.getValue("assignTo")  );
    return <div className="whitespace-nowrap">{row?.getValue("assignTo")?.name}</div>},
  },
  {
    accessorKey: "ownerId",
    header: "Owner ID",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("ownerId")}</div>,
  },
  {
    accessorKey: "buyerId",
    header: "Buyer ID",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("buyerId")}</div>,
  },
  {
    accessorKey: "propertyId",
    header: "Property ID",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("propertyId")}</div>,
  },
  {
    accessorKey: "dealPrice",
    header: "Deal Price",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("dealPrice")}</div>,
  },
  {
    accessorKey: "securityDeposit",
    header: "Security Deposit",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("securityDeposit")}</div>,
  },
  // {
  //   accessorKey: "noOfPayment",
  //   header: "No. of Payment",
  //   cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("noOfPayment")}</div>,
  // },
  {
    accessorKey: "dealClosureDate",
    header: "Deal Closure Date",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("dealClosureDate")}</div>,
  },
  {
    accessorKey: "agencyFee",
    header: "Agency Fee",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("agencyFee")}</div>,
  },
  {
    accessorKey: "vat",
    header: "VAT",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("vat")}</div>,
  },
  {
    accessorKey: "agencyFeePaid",
    header: "Agency Fee Paid",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("agencyFeePaid")}</div>,
  },
  {
    accessorKey: "agencyFeePaymentMode",
    header: "Agency Fee Payment Mode",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("agencyFeePaymentMode")}</div>,
  },
  {
    accessorKey: "agencyPaymentFeeDate",
    header: "Agency Payment Fee Date",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("agencyPaymentFeeDate")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("status")}</div>,
  },
  {
    accessorKey: "setReminder",
    header: "Set Reminder",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("setReminder")}</div>,
  },
  {
    accessorKey: "tenancyContractStartDate",
    header: "Tenancy Contract Start Date",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("tenancyContractStartDate")}</div>,
  },
  {
    accessorKey: "tenancyEndDate",
    header: "Tenancy End Date",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("tenancyEndDate")}</div>,
  },
  {
    accessorKey: "remark",
    header: "Remark",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("remark")}</div>,
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("createdBy")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => <div className="whitespace-nowrap">{row?.getValue("createdAt")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row?.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "edit",
    header: "Edit",
    enableHiding: false,
    header: ({ table }) => {
      return (
        <EditIcon
          onClick={() => {
            return;
          }}
        />
      );
    },
    cell: ({ row }) => {
      return (
        <EditIcon
          onClick={() => {
            return;
          }}
        />
      );
    },
  },
];

export function DealsTable({ dealsList }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  const [data, setData] = useState(dealsList || []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  console.log(table?.getFilteredSelectedRowModel());
  return (
    <div className="w-full ">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={table?.getColumn("email")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table?.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              ?.getAllColumns()
              .filter((column) => column?.getCanHide())
              ?.map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <TableRow key={headerGroup?.id}>
                {headerGroup?.headers?.map((header) => {
                  return (
                    <TableHead className="whitespace-nowrap" key={header?.id}>
                      {header?.isPlaceholder
                        ? null
                        : flexRender(
                            header?.column?.columnDef?.header,
                            header?.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel().rows?.length ? (
              table?.getRowModel()?.rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table?.getFilteredSelectedRowModel()?.rows?.length > 0 &&
            table?.getFilteredSelectedRowModel()?.rows?.length !== undefined &&
            table?.getFilteredSelectedRowModel()?.rows?.length}{" "}
          of{" "}
          {table?.getFilteredRowModel()?.rows?.length > 0 &&
            table?.getFilteredSelectedRowModel()?.rows?.length !== undefined &&
            table?.getFilteredRowModel()?.rows?.length}{" "}
          row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table?.previousPage()}
            disabled={!table?.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table?.nextPage()}
            disabled={!table?.getCanNextPage()}
          >
            Next
          </Button>

          <div className="h-2" />
          <div className="flex items-center gap-2">
            <button
              className="border rounded p-1"
              onClick={() => table?.setPageIndex(0)}
              disabled={!table?.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table?.previousPage()}
              disabled={!table?.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table?.nextPage()}
              disabled={!table?.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border rounded p-1"
              onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
              disabled={!table?.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table?.getState().pagination.pageIndex + 1} of{" "}
                {table?.getPageCount()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              | Go to page:
              <input
                type="number"
                defaultValue={table?.getState()?.pagination?.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div>{table?.getRowModel()?.rows?.length} Rows</div>
        </div>
      </div>
    </div>
  );
}
