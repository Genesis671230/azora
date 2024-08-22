import React, { useEffect, useState } from "react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { CalendarIcon, Cross1Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useFormik } from "formik";
import { cn } from "lib/utils.ts";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getApi, putApi } from "services/api";
import * as Yup from "yup";
import { modalClosed } from "../../../redux/slices/editModalSlice/editModalSlice.js";
import { Button } from "../button";
import { Calendar } from "../calendar";
import { DrawerClose, DrawerFooter } from "../drawer";
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Switch } from "../switch";
import Dropzone from "components/Dropzone.js";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CrossIcon, UploadCloudIcon } from "lucide-react";
import { constant } from "constant.js";

const revenueSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const DatePicker = React.memo((props) => {
  const { name, value, onDateChange } = props;
  const [currentDate, setCurrentDate] = useState(value);

  const handleDateChange = React.useCallback(
    (date) => {
      onDateChange(format(date, "PP"));
      setCurrentDate(date);
    },
    [onDateChange]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !currentDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {currentDate ? format(currentDate, "PP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="whitespace-nowrap "
          fromYear={2015}
          toYear={2025}
          name={name}
          mode="single"
          selected={currentDate}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
});

function DealEdit({ className, dealRowData, setIsModalOpen }) {
  const [isLoding, setIsLoding] = React.useState(false);
  const dispatch = useDispatch();

  const initialValues = {
    type: dealRowData?.type ?? "",
    userid: dealRowData?.useid ?? JSON.parse(localStorage.getItem("user"))._id, // Assuming this is the current user ID
    ownerid: dealRowData?.ownerid ?? "",
    customerid: dealRowData?.customerid ?? "",
    propertyid: dealRowData?.propertyid ?? "",
    unitno: dealRowData?.unitno ?? "",
    prptytype: dealRowData?.prptytype ?? "",
    prptyview: dealRowData?.prptyview ?? "",
    address: dealRowData?.address ?? "",
    noofpayment: dealRowData?.noofpayment ?? "",
    secruitydeposit: dealRowData?.secruitydeposit ?? "",
    name: dealRowData?.name ?? "",
    price: dealRowData?.price ?? "",
    emiamount1: dealRowData?.emiamount1 ?? "",
    emiamount2: dealRowData?.emiamount2 ?? "",
    emiamount3: dealRowData?.emiamount3 ?? "",
    emiamount4: dealRowData?.emiamount4 ?? "",
    emiamount5: dealRowData?.emiamount5 ?? "",
    emiamount6: dealRowData?.emiamount6 ?? "",
    emiamount7: dealRowData?.emiamount7 ?? "",
    emiamount8: dealRowData?.emiamount8 ?? "",
    emiamount9: dealRowData?.emiamount9 ?? "",
    emiamount10: dealRowData?.emiamount10 ?? "",
    emiamount11: dealRowData?.emiamount11 ?? "",
    emiamount12: dealRowData?.emiamount12 ?? "",
    emidate1: dealRowData?.emidate1 ?? "",
    emidate2: dealRowData?.emidate2 ?? "",
    emidate3: dealRowData?.emidate3 ?? "",
    emidate4: dealRowData?.emidate4 ?? "",
    emidate5: dealRowData?.emidate5 ?? "",
    emidate6: dealRowData?.emidate6 ?? "",
    emidate7: dealRowData?.emidate7 ?? "",
    emidate8: dealRowData?.emidate8 ?? "",
    emidate9: dealRowData?.emidate9 ?? "",
    emidate10: dealRowData?.emidate10 ?? "",
    emidate11: dealRowData?.emidate11 ?? "",
    emidate12: dealRowData?.emidate12 ?? "",
    emirmdtstus1: dealRowData?.emirmdtstus1 ?? "",
    emirmdtstus2: dealRowData?.emirmdtstus2 ?? "",
    emirmdtstus3: dealRowData?.emirmdtstus3 ?? "",
    emirmdtstus4: dealRowData?.emirmdtstus4 ?? "",
    emirmdtstus5: dealRowData?.emirmdtstus5 ?? "",
    emirmdtstus6: dealRowData?.emirmdtstus6 ?? "",
    emirmdtstus7: dealRowData?.emirmdtstus7 ?? "",
    emirmdtstus8: dealRowData?.emirmdtstus8 ?? "",
    emirmdtstus9: dealRowData?.emirmdtstus9 ?? "",
    emirmdtstus10: dealRowData?.emirmdtstus10 ?? "",
    emirmdtstus11: dealRowData?.emirmdtstus11 ?? "",
    emirmdtstus12: dealRowData?.emirmdtstus12 ?? "",
    dealclourdate: dealRowData?.dealclourdate ?? "",
    commsntenant: dealRowData?.commsntenant ?? "",
    commsnowner: dealRowData?.commsnowner ?? "",
    cmmsnpayment: dealRowData?.cmmsnpayment ?? "",
    ttenancystrtdate: dealRowData?.ttenancystrtdate ?? "",
    ttenancyenddate: dealRowData?.ttenancyenddate ?? "",
    setreminder: dealRowData?.setreminder ?? "",
    img1: dealRowData?.img1 ?? "",
    img2: dealRowData?.img2 ?? "",
    img3: dealRowData?.img3 ?? "",
    img4: dealRowData?.img4 ?? "",
    img5: dealRowData?.img5 ?? "",
    img6: dealRowData?.img6 ?? "",
    img7: dealRowData?.img7 ?? "",
    img8: dealRowData?.img8 ?? "",
    img9: dealRowData?.img9 ?? "",
    img10: dealRowData?.img10 ?? "",
    imgtitle1: dealRowData?.imgtitle1 ?? "",
    imgtitle2: dealRowData?.imgtitle2 ?? "",
    imgtitle3: dealRowData?.imgtitle3 ?? "",
    imgtitle4: dealRowData?.imgtitle4 ?? "",
    imgtitle5: dealRowData?.imgtitle5 ?? "",
    imgtitle6: dealRowData?.imgtitle6 ?? "",
    imgtitle7: dealRowData?.imgtitle7 ?? "",
    imgtitle8: dealRowData?.imgtitle8 ?? "",
    imgtitle9: dealRowData?.imgtitle9 ?? "",
    imgtitle10: dealRowData?.imgtitle10 ?? "",
    descr: dealRowData?.descr ?? "",
    map: dealRowData?.map ?? "",
    date: dealRowData?.date ?? "",
    dealPrice: dealRowData?.dealPrice ?? "",
    agencyFee: dealRowData?.agencyFee ?? "",
    vat: 0,
    agencyFeePaymentMode: dealRowData?.agencyFeePaymentMode ?? "",
    agencyPaymentFeeDate: dealRowData?.agencyPaymentFeeDate ?? "",
    status: dealRowData?.status ?? "",
    tenancyContract: dealRowData?.tenancyContract ?? [],
    tenancyContractStartDate: dealRowData?.tenancyContractStartDate ?? "",
    tenancyEndDate: dealRowData?.tenancyEndDate ?? "",
    remark: dealRowData?.remark ?? "",
    createdBy:
      dealRowData?.createdBy ?? JSON.parse(localStorage.getItem("user"))._id,
    createdAt: dealRowData?.createdAt,
    deleted: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      EditData();
      resetForm();
    },
  });

  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  console.log(values);

  const EditData = async () => {
    try {
      setIsLoding(true);
      let response = await putApi(`api/deal/edit/${dealRowData._id}`, values);
      if (response.status === 200) {
        toast.success("Data Edited Successfully");
        handleCancel();
      }
    } catch (e) {
      console.log(e);
      toast.warning("Data not added ");
    } finally {
      setIsLoding(false);
    }
  };


  const handleUnselectImage = (pathToRemove) => {
      //   console.log(formik.initialValues.tenancyContract, "this is picture")

    const updatedContract = formik.values.tenancyContract.filter(
      (item) => item.path !== pathToRemove
    );
  
    formik.setFieldValue("tenancyContract", updatedContract);
  };


  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/api/user/agents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setAgents(data);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
      });
  }, []);

  const handleCancel = () => {
    formik.resetForm();
    setIsModalOpen(false);
    dispatch(modalClosed());
  };

  const [dropdownData, setDropdownData] = useState({
    owners: [],
    locations: [],
    subLocations: [],
    projects: [],
  });
  const fetchDropdownData = async () => {
    //create a function to fetch owners data from the backend
    const result = await getApi("api/dropdowns/propertyForm/");
    console.log(result.data);
    setDropdownData(result.data);
  };
  useEffect(() => {
    fetchDropdownData();
  }, []);

  return (
    <form
      className={cn("grid  items-start gap-4 overflow-auto", className)}
      onSubmit={handleSubmit}
    >
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="type">
          {errors.type && touched.type ? errors.type : "Type"}
        </Label>
        <Select onValueChange={(value) => setFieldValue("type", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Type</SelectLabel>
              <SelectItem value="lease">Lease</SelectItem>
              <SelectItem value="sale">Sale</SelectItem>
              <SelectItem value="renewal">Renewal</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.type}
          type="text"
          name="type"
          id="type"
          placeholder="Enter type"
          className={cn(errors.type && touched.type ? "border-red-300" : null)}
        />
      </div>

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="userid">
          {errors.userid && touched.userid ? errors.userid : "Coordinator"}
        </Label>
        <Select
          value={values?.userid}
          onValueChange={(value) => setFieldValue("userid", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Coordinator" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Coordinator</SelectLabel>
              {dropdownData?.owners?.map((owner) => (
                <SelectItem key={owner?._id} value={owner?._id}>
                  {owner.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

   

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="name">
          {errors.name && touched.name ? errors.name : "Name"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
          type="text"
          name="name"
          id="name"
          placeholder="Enter buyer ID"
          className={cn(errors.name && touched.name ? "border-red-300" : null)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="price">
          {errors.price && touched.price ? errors.price : "Price"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.price}
          type="text"
          price="price"
          id="price"
          placeholder="Enter buyer ID"
          classprice={cn(
            errors.price && touched.price ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="buyerid">
          {errors.buyerid && touched.buyerid ? errors.buyerid : "Buyer ID"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.buyerid}
          type="text"
          name="buyerid"
          id="buyerid"
          placeholder="Enter buyer ID"
          className={cn(
            errors.buyerid && touched.buyerid ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="propertyid">
          {errors.propertyid && touched.propertyid
            ? errors.propertyid
            : "Property ID"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.propertyid}
          type="text"
          name="propertyid"
          id="propertyid"
          placeholder="Enter property ID"
          className={cn(
            errors.propertyid && touched.propertyid ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="prptytype">
          {errors.prptytype && touched.prptytype
            ? errors.prptytype
            : "Property Type"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.prptytype}
          type="text"
          name="prptytype"
          id="prptytype"
          placeholder="Enter property ID"
          className={cn(
            errors.prptytype && touched.prptytype ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="prptyview">
          {errors.prptyview && touched.prptyview
            ? errors.prptyview
            : "Property View"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.prptyview}
          type="text"
          name="prptyview"
          id="prptyview"
          placeholder="Enter property ID"
          className={cn(
            errors.prptyview && touched.prptyview ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="address">
          {errors.address && touched.address
            ? errors.address
            : "Property Address"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.address}
          type="text"
          name="address"
          id="address"
          placeholder="Enter property ID"
          className={cn(
            errors.address && touched.address ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="unitno">
          {errors.unitno && touched.unitno ? errors.unitno : "Unit No"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.unitno}
          type="text"
          name="unitno"
          id="unitno"
          placeholder="Enter property ID"
          className={cn(
            errors.unitno && touched.unitno ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="dealPrice">
          {errors.dealPrice && touched.dealPrice
            ? errors.dealPrice
            : "Deal Price"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.dealPrice}
          type="number"
          name="dealPrice"
          id="dealPrice"
          placeholder="Enter deal price"
          className={cn(
            errors.dealPrice && touched.dealPrice ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="securitydeposit">
          {errors.secruitydeposit && touched.secruitydeposit
            ? errors.secruitydeposit
            : "Security Deposit"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.secruitydeposit}
          type="number"
          name="secruitydeposit"
          id="secruitydeposit"
          placeholder="Enter security deposit"
          className={cn(
            errors.secruitydeposit && touched.secruitydeposit
              ? "border-red-300"
              : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="noofpayment">
          {errors.noofpayment && touched.noofpayment
            ? errors.noofpayment
            : "No. of Payment"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.noofpayment}
          type="number"
          name="noofpayment"
          id="noofpayment"
          placeholder="Enter number of payment"
          className={cn(
            errors.noofpayment && touched.noofpayment ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="dealclourdate">
          {errors.dealclourdate && touched.dealclourdate
            ? errors.dealclourdate
            : "Deal Closure Date"}
        </Label>
        <DatePicker
          name="dealclourdate"
          value={values.dealclourdate}
          onChange={handleChange}
          onDateChange={(date) => setFieldValue("dealclourdate", date)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="agencyFee">
          {errors.agencyFee && touched.agencyFee
            ? errors.agencyFee
            : "Agency Fee"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.agencyFee}
          type="number"
          name="agencyFee"
          id="agencyFee"
          placeholder="Enter agency fee"
          className={cn(
            errors.agencyFee && touched.agencyFee ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="vat">
          {errors.vat && touched.vat ? errors.vat : "VAT"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.vat}
          type="number"
          name="vat"
          id="vat"
          placeholder="Enter VAT"
          className={cn(errors.vat && touched.vat ? "border-red-300" : null)}
        />
      </div>
    
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="agencyFeePaymentMode">
          {errors.agencyFeePaymentMode && touched.agencyFeePaymentMode
            ? errors.agencyFeePaymentMode
            : "Agency Fee Payment Mode"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.agencyFeePaymentMode}
          type="text"
          name="agencyFeePaymentMode"
          id="agencyFeePaymentMode"
          placeholder="Enter agency fee payment mode"
          className={cn(
            errors.agencyFeePaymentMode && touched.agencyFeePaymentMode
              ? "border-red-300"
              : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="agencyPaymentFeeDate">
          {errors.agencyPaymentFeeDate && touched.agencyPaymentFeeDate
            ? errors.agencyPaymentFeeDate
            : "Agency Payment Fee Date"}
        </Label>
        <DatePicker
          name="agencyPaymentFeeDate"
          value={values.agencyPaymentFeeDate}
          onChange={handleChange}
          onDateChange={(date) => setFieldValue("agencyPaymentFeeDate", date)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="status">
          {errors.status && touched.status ? errors.status : "Status"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status}
          type="text"
          name="status"
          id="status"
          placeholder="Enter status"
          className={cn(
            errors.status && touched.status ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="setreminder">
          {errors.setreminder && touched.setreminder
            ? errors.setreminder
            : "Set Reminder"}
        </Label>
        <Switch
          checked={values.setreminder}
          onCheckedChange={(check) => {
            setFieldValue("setreminder", check ? true : false);
          }}
          onBlur={handleBlur}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="ttenancystrtdate">
          {errors.ttenancystrtdate && touched.ttenancystrtdate
            ? errors.ttenancystrtdate
            : "Tenancy Contract Start Date"}
        </Label>
        <DatePicker
          name="ttenancystrtdate"
          value={values.ttenancystrtdate}
          onChange={handleChange}
          onDateChange={(date) => setFieldValue("ttenancystrtdate", date)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="ttenancyenddate">
          {errors.ttenancyenddate && touched.ttenancyenddate
            ? errors.ttenancyenddate
            : "Tenancy End Date"}
        </Label>
        <DatePicker
          name="ttenancyenddate"
          value={values.ttenancyenddate}
          onChange={handleChange}
          onDateChange={(date) => setFieldValue("ttenancyenddate", date)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="remark">
          {errors.remark && touched.remark ? errors.remark : "Remark"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.remark}
          type="text"
          name="remark"
          id="remark"
          placeholder="Enter remark"
          className={cn(
            errors.remark && touched.remark ? "border-red-300" : null
          )}
        />
      </div>
      <div>
        <Label display="flex" ms="4px" fontSize="sm" fontWeight="500" mb="8px">
          Tenancy Contract
        </Label>

        <Dropzone
          // w={{ base: "100%", "2xl": "240px" }}
          me="36px"
          minH={150}
          height={"100%"}
          onFileSelect={(file) => setFieldValue("tenancyContract", file)}
          content={
            <Box>
              <UploadCloudIcon w="70px" h="70px" />
              <Flex justify="center" mx="auto" mb="12px">
                <Text fontSize="md" fontWeight="700">
                  Upload Image
                </Text>
              </Flex>
            </Box>
          }
        />
        {values.tenancyContract.length > 0 && values.tenancyContract.map(item=>{
         const fileLink = `${constant.baseUrl}api/deal/deal-documents/${
              typeof item.path === "string" ? item?.path.split("/")[3] : ""
            }`;
            console.log(fileLink)
          return (
            // <div onClick={onRowClicked}>
            <>
              {fileLink.includes("pdf") ? (
                  <a href={item} download={fileLink[fileLink.length - 1]}>
                    Download
                  </a>
                ) : (
                  <div className="w-[10rem] h-[10rem] relative">
                    <span className="absolute z-10 top-2 right-1 bg-white p-1 rounded-full hover:scale-110 shadow-md">
                    <Cross1Icon  onClick={()=>handleUnselectImage(item.path)} className=" text-black  rounded-full   h-4 w-4 cursor-pointer " />
                    </span>
                  <img
                    onClick={() => handleFileClick(fileLink)}
                    className="w-full h-full object-cover rounded-md shadow-md"
                    src={fileLink}
                    alt=""
                    srcset=" "
                    />
                    </div>
                )}
            </>
            // <Button onClick={()=>handleOpenModal(params)}>Edit</Button>
            // </div>
          );
        
        }) }
      </div>
      
      
      
      
            <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="ownerID">
          {errors.ownerid && touched.ownerid ? errors.ownerid : "Owner ID"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ownerid}
          type="text"
          name="ownerid"
          id="ownerid"
          placeholder="Enter owner ID"
          className={cn(
            errors.ownerid && touched.ownerid ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="tenantID">
          {errors.tenantID && touched.tenantID ? errors.tenantID : "Tenant ID"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.tenantID}
          type="text"
          name="tenantID"
          id="tenantID"
          placeholder="Enter tenant ID"
          className={cn(
            errors.tenantID && touched.tenantID ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="addcClosing">
          {errors.addcClosing && touched.addcClosing
            ? errors.addcClosing
            : "Addc Closing"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.addcClosing}
          type="text"
          name="addcClosing"
          id="addcClosing"
          placeholder="Enter addc closing"
          className={cn(
            errors.addcClosing && touched.addcClosing ? "border-red-300" : null
          )}
        />
      </div>
     

      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <Button onClick={handleSubmit} type="submit">
            Save Deal
          </Button>
        </DrawerClose>
        <DrawerClose asChild>
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </form>
  );
}

export default DealEdit;
