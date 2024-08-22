import { ChevronDownIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import 'ag-grid-enterprise';
import { AgGridReact } from "ag-grid-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getApi } from "services/api";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
  DrawerTrigger,
} from "../drawer";
import {
  modalClosed,
  modalData,
} from "../../../redux/slices/editModalSlice/editModalSlice.js";
import { modalOpened } from "../../../redux/slices/editModalSlice/editModalSlice.js";
import { BiPlus } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import DealEdit from "./DealsEdit";
import { deleteApi } from "services/api";
import { setDealIds, getSelectedDealsId } from "features/deals/dealSlice";
import { selectDeals } from "features/deals/dealSlice";
import { IoDownload } from "react-icons/io5";
import { constant } from "constant";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

export const NoOfPayment = (props) => {
  const payments = props.valueFormatted ? props.valueFormatted : props.value;
  const total = props.data.total;
  console.log(props, "payments and total");
  return (
    <span className="total-value-renderer">
      {payments?.map((payment, index) => (
        <div key={index}>
          <span>{payment.id}</span>
          <span>{payment.amount}</span>
        </div>
      ))}
      <button onClick={() => alert(`${total} medals won!`)}>
        Push For Total
      </button>
    </span>
  );
};

var checkboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};

var headerCheckboxSelection = function (params) {
  // we put checkbox on the name if we are not doing grouping
  return params.api.getRowGroupColumns().length === 0;
};

const DealsGridTable = () => {
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const gridRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const selectedDealsId = useSelector(getSelectedDealsId);
  const deals = useSelector(selectDeals);

  const handleCheckboxSelection = (params) => {
    const selectedIds = params.api.getSelectedRows().map((row) => row._id);
    dispatch(setDealIds(selectedIds));
  };

  const handleFileClick = (files) => {
    setSelectedFiles(files);
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const containerStyle = useMemo(() => ({ width: "100%", height: "68vh" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const user = JSON.parse(localStorage.getItem("user"));

  const components = useMemo(
    () => ({
      noOfPayments: NoOfPayment,
      // reactComponent: ReactComponent,
    }),
    []
  );

  const onRowClicked = (event) => {
    setSelectedRowData(event.data); // Capture the clicked row's data
  };
  const handleOpenModal = (event) => {
    setSelectedRowData(event.data);
    setIsModalOpen(true);
    // dispatch(modalOpened())
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "_id",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      editable: false,
      onCellValueChanged: (event) => {
        console.log(event, "event");
        setSelectedRowData(event.data);
        setDealIds(event.data);
      },
      minWidth: 300,
    },
    {
      field: "",
      editable: false,
      cellRenderer: (params) => {
        console.log(params, "params");
        return (
          // <div onClick={onRowClicked}>
          <Button onClick={() => handleOpenModal(params)}>Edit</Button>
          // </div>
        );
      },
    },
    {
      field: "id",
      headerName: "ID",
      editable: false,
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      field: "type",
      headerName: "Type",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "tenancyContract",
      headerName: "Image",
      editable: false,
      cellRenderer: (params) => {
        const allImage = params?.data?.tenancyContract?.map((item) => {
          return `${constant.baseUrl}api/deal/deal-documents/${
            typeof item.path === "string" ? item?.path.split("/")[3] : ""
          }`;
        });
        console.log(params, allImage, "params");
        return (
          // <div onClick={onRowClicked}>
          <>
            {allImage?.map((item, index) => {
              const fileName = item.split("/");
              return item.includes("pdf") ? (
                <a href={item} download={fileName[fileName.length - 1]}>
                  Download
                </a>
              ) : (
                <img
                  onClick={() => handleFileClick(allImage)}
                  className="hover:scale-[20rem]"
                  src={item}
                  alt=""
                  srcset=" "
                />
              );
            })}
          </>
          // <Button onClick={()=>handleOpenModal(params)}>Edit</Button>
          // </div>
        );
      },
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "price",
      headerName: "Price",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "userid",
      headerName: "User ID",
      editable: false,
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      field: "ownerid",
      headerName: "Owner ID",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "customerid",
      headerName: "Customer ID",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "propertyid",
      headerName: "Property ID",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "unitno",
      headerName: "Unit No",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "secruitydeposit",
      headerName: "Security Deposit",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },

    {
      field: "emiamount1",
      headerName: "EMI Amount 1",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "emiamount2",
      headerName: "EMI Amount 2",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "emidate1",
      headerName: "EMI Date 1",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },
    {
      field: "emidate2",
      headerName: "EMI Date 2",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },
    {
      field: "emirmdtstus1",
      headerName: "EMI Status 1",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "emirmdtstus2",
      headerName: "EMI Status 2",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "dealclourdate",
      headerName: "Deal Closure Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },
    {
      field: "commsntenant",
      headerName: "Commission Tenant",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "commsnowner",
      headerName: "Commission Owner",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    {
      field: "cmmsnpayment",
      headerName: "Commission Payment",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "ttenancystrtdate",
      headerName: "Tenancy Start Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },

    {
      minWidth: 170,
      field: "noOfPayment",
      editable: false,
      // cellEditor: "agSelectCellEditor",
      cellRenderer: (params) => (
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="overflow-scroll">
              <Button variant="default" className="h-8 overflow-scroll w-8 p-0">
                {/* <span className="sr-only overflow-scroll">Open menu</span> */}
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="max-h-[20rem] overscroll-y-scroll"
            >
              <DropdownMenuLabel>Payments</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {params?.value?.map((payment, index) => (
                <>
                  {/* <DropdownMenuItem
                    onClick={() => navigator.clipboard.writeText(payment.id)}
                  >
                    Copy payment ID
                  </DropdownMenuItem>
                  <DropdownMenuSeparator /> */}
                  <DropdownMenuItem>Amount: {payment.amount}</DropdownMenuItem>
                  <DropdownMenuItem>
                    Reminder: {payment.reminder ? "Yes" : "No"}
                  </DropdownMenuItem>
                  <DropdownMenuItem>View payment details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),

      // cellEditor: "agTextCellEditor",
      // filter: "agTextColumnFilter",
    },

    {
      field: "ttenancyenddate",
      headerName: "Tenancy End Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },
    {
      field: "setreminder",
      headerName: "Set Reminder",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },
    {
      field: "descr",
      headerName: "Description",
      editable: false,
      cellEditor: "agLargeTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 200,
    },
    {
      field: "date",
      headerName: "Date",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 150,
    },
    {
      headerName: "Created At",
      field: "createdAt",
      sortable: true,
      sort: "desc",
      editable: false,
      cellEditor: "agDateCellEditor",
      filter: "agDateColumnFilter",
      minWidth: 250,
    },
  ]);

  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName: "Group",
      minWidth: 170,
      field: "athlete",
      valueGetter: (params) => {
        if (params.node.group) {
          return params.node.key;
        } else {
          return params.data[params.colDef.field];
        }
      },
      headerCheckboxSelection: true,
      cellRenderer: "agGroupCellRenderer",
      cellRendererParams: {
        checkbox: true,
      },
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      enableRowGroup: true,
      enablePivot: true,
      enableValue: true,
      floatingFilter: true,
      sortable: true,
      filter: true,
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const fetchDeals = async () => {
    try {
      const response = await getApi(
       "api/deal/"
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch processed deals");
    }
  };

  const onGridReady = useCallback(async (params) => {
    // fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     console.log(data);
    await fetchDeals();
  }, []);

  const dispatch = useDispatch();
  const { isOpen } = useSelector(modalData);

  const handleClose = () => {
    setIsModalOpen(false);
    // dispatch(modalClosed());
  };
  const handleOpen = () => {
    // dispatch(modalOpened());
  };
  const exportAsExcel = () => {
    gridRef.current.api?.exportDataAsCsv();
  };

  return (
    <>
      <Dialog open={isModalVisible}>
        {/* <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger> */}
        <DrawerOverlay onClick={handleCancel} />
        <DialogContent className="sm:min-w-[80vw] min-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Deal Files</DialogTitle>
            <DialogDescription>
              Download and view the deal files.
            </DialogDescription>
          </DialogHeader>
          <div className="flex h-full flex-row flex-wrap overflow-y-scroll gap-6  w-full   items-center space-x-2">
            {selectedFiles?.map((item, index) => {
              const fileName = item.split("/");
              return item.includes("pdf") ? (
                <a href={item} download={fileName[fileName.length - 1]}>
                  Download
                </a>
              ) : (
                <img
                  // onClick={() => handleFileClick(fileName)}
                  className="w-[30rem] h-[20rem] object-cover"
                  src={item}
                  alt=""
                  srcset=" "
                />
              );
            })}
            {/* <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
            </Button> */}
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button onClick={handleCancel} type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="flex justify-end">
        <div className="flex text-center items-center px-2 m-2 mr-0 cursor-pointer group self-end rounded-sm bg-white w-fit shadow-md justify-end">
          <IoDownload
            className="text-3xl mb-2 mr-2 text-gray-900 group-hover:scale-110 cursor-pointer"
            onClick={exportAsExcel}
          />{" "}
          <p className="text-center">Export</p>
        </div>
      </div>

      <div style={containerStyle}>
        <div style={gridStyle} className={"ag-theme-quartz"}>
          <AgGridReact
            ref={gridRef}
            rowData={deals}
            columnDefs={columnDefs}
            // autoGroupColumnDef={autoGroupColumnDef}
            defaultColDef={defaultColDef}
            components={components}
            suppressRowClickSelection={true}
            groupSelectsChildren={true}
            rowSelection={"multiple"}
            editType={"fullRow"}
            rowGroupPanelShow={"always"}
            pivotPanelShow={"always"}
            pagination={true}
            onGridReady={onGridReady}
            alwaysShowHorizontalScroll={true}
            alwaysShowVerticalScroll={true}
            onRowClicked={onRowClicked}
            onSelectionChanged={handleCheckboxSelection}
          />
        </div>

        <Drawer
          open={isModalOpen}
          direction="right"
          className="overflow-scroll"
        >
          <DrawerOverlay onClick={handleClose} />
          {/* <DrawerTrigger asChild>
        <Button
          onClick={handleOpen}
          variant="outline"
          className="bg-blue-700 text-white"
        >
          <BiPlus /> Add Deal
        </Button>
      </DrawerTrigger> */}
          <DrawerContent className="right-0 z-50 left-auto h-full w-[45rem] overflow-auto">
            <div className="mx-auto w-full">
              <IconButton
                className="float-end"
                onClick={handleClose}
                icon={<CloseIcon />}
              />
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit Deal</DrawerTitle>
                <DrawerDescription>
                  Edit a deal. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <DealEdit
                className="px-4"
                dealRowData={selectedRowData}
                setIsModalOpen={setIsModalOpen}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default DealsGridTable;
