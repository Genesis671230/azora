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
import { deleteApi } from "services/api";
import { setUserIds, getSelectedUsersId } from "features/users/userSlice";
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
import { selectUsers } from "features/users/userSlice";
import UsersEdit from "./UsersEdit";
import { useNavigate } from "react-router-dom";

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

const UsersGridTable = ({ userlist }) => {
  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const gridRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const selectedDealsId = useSelector(getSelectedUsersId);
  const users = useSelector(selectUsers);
  console.log(users);
  const handleCheckboxSelection = (params) => {
    const selectedIds = params.api.getSelectedRows().map((row) => row._id);
    dispatch(setUserIds(selectedIds));
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

  const navigate = useNavigate();
  const onRowClicked = (event) => {
    console.log(event.data, "event");
    navigate(`/admin/userView/${event.data._id}`);
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
        setUserIds(event.data);
      },
      minWidth: 300,
    },

    {
      field: "firstName",
      headerName: "firstName",
      editable: false,
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agTextColumnFilter",
      minWidth: 150,
    },

    {
      field: "email",
      headerName: "Email",
      editable: false,
      cellEditor: "agTextCellEditor",
      filter: "agNumberColumnFilter",
      minWidth: 150,
    },
    
    {
      field: "password",
      headerName: "Password",
      editable: false,
      filter: "agNumberColumnFilter",
      minWidth: 100,
    },
    {
      field: "profilePicture",
      headerName: "Image",
      editable: false,
      cellRenderer: (params) => {
        console.log(params, "params");
        const allImage = params?.data?.profilePicture?.map((item) => {
          return `${constant.baseUrl}api/user/user-documents/${
            item?.split("/")[2]
          }`;
        });
        if(!allImage) return null;  
        console.log(allImage, "allImage");
        return (
          // <div onClick={onRowClicked}>
          <>
            {allImage?.map((item, index) => {
              <img
                onClick={() => handleFileClick(allImage)}
                className="hover:scale-[20rem]"
                src={item}
                alt=""
                srcset=" "
              />;
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
      field: "",
      editable: false,
      cellRenderer: (params) => {
        console.log(params, "params");
        return (
          // <div onClick={onRowClicked}>
            <Button onClick={()=>handleOpenModal(params)}>Edit</Button>
          // </div>
        );
      }
    },
    // {
    //   field: "role",
    //   headerName: "role",
    //   editable: false,
    //   cellEditor: "agTextCellEditor",
    //   filter: "agNumberColumnFilter",
    //   minWidth: 150,
    // },
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

  const onGridReady = useCallback(async (params) => {
    console.log("AGGrid React is ready", params);
  }, []);

  const dispatch = useDispatch();
  const { isOpen } = useSelector(modalData);

  const handleClose = () => {
    setIsModalOpen(false);
    // dispatch(modalClosed());
  };
  const handleOpen = () => {
    dispatch(modalOpened());
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
      <div className="flex justify-start">
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
            rowData={users}
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
              <BiPlus /> Add User
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
                <DrawerTitle>Edit User</DrawerTitle>
                <DrawerDescription>
                  Edit a User. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <UsersEdit
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

export default UsersGridTable;
