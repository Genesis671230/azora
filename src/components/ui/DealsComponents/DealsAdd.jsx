import React, { useEffect, useState } from "react";
// import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Form, useFormik } from "formik";
import { cn } from "lib/utils.ts";
import { postApi, getApi } from "services/api";
import * as Yup from "yup";
import { Button } from "../button";
import { Calendar } from "../calendar";
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
import { Input } from "../input";
import { Label } from "../label";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Switch } from "../switch";
import {
  modalClosed, 
  modalData,
} from "../../../redux/slices/editModalSlice/editModalSlice.js";
import { modalOpened } from "../../../redux/slices/editModalSlice/editModalSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { CloseIcon } from "@chakra-ui/icons";
import { Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import Dropzone from "components/Dropzone";
import { IconBase } from "react-icons";
import { UploadCloudIcon } from "lucide-react";

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

function ProfileForm({ className }) {
  const [isLoding, setIsLoding] = React.useState(false);
  const dispatch = useDispatch();
  
  const initialValues = {
    type: "",
    userid: JSON.parse(localStorage.getItem("user"))._id, // Assuming this is the current user ID
    ownerid: "",
    customerid: "",
    propertyid: "",
    unitno: "",
    prptytype: "",
    prptyview: "",
    address: "",
    noofpayment: "",
    secruitydeposit: "",
    name: "",
    price: "",
    emiamount1: "",
    emiamount2: "",
    emiamount3: "",
    emiamount4: "",
    emiamount5: "",
    emiamount6: "",
    emiamount7: "",
    emiamount8: "",
    emiamount9: "",
    emiamount10: "",
    emiamount11: "",
    emiamount12: "",
    emidate1: "",
    emidate2: "",
    emidate3: "",
    emidate4: "",
    emidate5: "",
    emidate6: "",
    emidate7: "",
    emidate8: "",
    emidate9: "",
    emidate10: "",
    emidate11: "",
    emidate12: "",
    emirmdtstus1: "",
    emirmdtstus2: "",
    emirmdtstus3: "",
    emirmdtstus4: "",
    emirmdtstus5: "",
    emirmdtstus6: "",
    emirmdtstus7: "",
    emirmdtstus8: "",
    emirmdtstus9: "",
    emirmdtstus10: "",
    emirmdtstus11: "",
    emirmdtstus12: "",
    dealclourdate: "",
    commsntenant: "",
    commsnowner: "",
    cmmsnpayment: "",
    ttenancystrtdate: "",
    ttenancyenddate: "",
    setreminder: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    img6: "",
    img7: "",
    img8: "",
    img9: "",
    img10: "",
    imgtitle1: "",
    imgtitle2: "",
    imgtitle3: "",
    imgtitle4: "",
    imgtitle5: "",
    imgtitle6: "",
    imgtitle7: "",
    imgtitle8: "",
    imgtitle9: "",
    imgtitle10: "",
    descr: "",
    map: "",
    date: "",
    dealPrice: "",
    agencyFee: "",
    vat: 0,
    agencyFeePaymentMode: "",
    agencyPaymentFeeDate: "",
    status: "Draft",
    tenancyContract: [],
    tenancyContractStartDate: "",
    tenancyEndDate: "",
    remark: "",
    createdBy: JSON.parse(localStorage.getItem("user"))._id,
    createdAt: Date.now(),
    deleted: false,
  };
  

  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: contactSchema,
    onSubmit: (values, { resetForm }) => {
      AddData();
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

  
 const AddData = async () => {
    try {
      setIsLoding(true);
      const formData = new FormData();

      if (values?.tenancyContract?.length > 0) {
        values?.tenancyContract?.forEach((file) => {
          formData?.append("tenancyContract", file);
        });
      }

     
      

   console.log(formData);
      const res = Object.entries(values);
      res?.forEach((item) => {
        if (
          ![
            "tenancyContract",
          ].includes(item[0])
        ) {
          formData.append(item[0], item[1]);
        }
      });

      
      
      let response = await postApi("api/deal/add", formData);
      if (response.status === 200) {
        console.log(formik);
        
        toast.success("Data Submitted Successfully")
        handleCancel();
      }
    } catch (e) {
      console.log(e);
      toast.warning("Data not added ")
    } finally {
      setIsLoding(false);
    }
  };



  

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/user/agents')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setAgents(data);
      })
      .catch(error => {
        console.error('Error fetching agents:', error);
      });
  }, []);

  const handleCancel = () => {
    formik.resetForm();
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
    <form className={cn("grid  items-start gap-4 overflow-auto", className)} onSubmit={handleSubmit}>
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
        <Select value={values?.userid} onValueChange={(value) => setFieldValue("userid", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a Coordinator" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Coordinator</SelectLabel>
              {dropdownData?.owners?.map((owner) => (
                <SelectItem key={owner?._id} value={owner?._id}>{owner.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>


      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="assignTo">
          {errors.assignTo && touched.assignTo ? errors.assignTo : "AssignTo"}
        </Label>
        <Select value={values?.assignTo} onValueChange={(value) => setFieldValue("assignTo", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>AssignTo</SelectLabel>
              {agents.map((agent) => (
                <SelectItem key={agent?._id} value={agent?._id}>{agent.name}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> 

      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="assignTo">
          {errors.assignTo && touched.assignTo ? errors.assignTo : "AssignTo"}
        </Label>
        <Select value={values?.assignTo} onValueChange={(value) => setFieldValue("assignTo", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select an Agent" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>AssignTo</SelectLabel>
              {agents.map((agent) => (
                <SelectItem key={agent?._id} value={agent?._id}>{agent.name}</SelectItem>
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
          className={cn(
            errors.name && touched.name ? "border-red-300" : null
          )}
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
          {errors.unitno && touched.unitno
            ? errors.unitno
            : "Unit No"}
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
          // onChange={handleChange}
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
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="agencyFeePaid">
          {errors.agencyFeePaid && touched.agencyFeePaid
            ? errors.agencyFeePaid
            : "Agency Fee Paid"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.agencyFeePaid}
          type="number"
          name="agencyFeePaid"
          id="agencyFeePaid"
          placeholder="Enter agency fee paid"
          className={cn(
            errors.agencyFeePaid && touched.agencyFeePaid
              ? "border-red-300"
              : null
          )}
        />
      </div> */}
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
          // onChange={handleChange}
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
      <div>
                <Label
                  display="flex"
                  ms="4px"
                  fontSize="sm"
                  fontWeight="500"
                  mb="8px"
                >
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
                      <UploadCloudIcon
                        w="70px"
                        h="70px"
                      />
                      <Flex justify="center" mx="auto" mb="12px">
                        <Text fontSize="md" fontWeight="700" >
                          Upload Image
                        </Text>
                      </Flex>
                    </Box>
                  }
                />

                <Input
                  fontSize="sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emiratesIdRemarks}
                  name="emiratesIdRemarks"
                  placeholder="Remarks"
                  fontWeight="500"
                  borderColor={
                    errors.emiratesIdRemarks && touched.emiratesIdRemarks
                      ? "red.300"
                      : null
                  }
                />
                <Text mb="10px" color={"red"}>
                  {" "}
                  {errors.emiratesIdRemarks &&
                    touched.emiratesIdRemarks &&
                    errors.emiratesIdRemarks}
                </Text>
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
          // onChange={handleChange}
          onDateChange={(date) =>
            setFieldValue("ttenancystrtdate", date)
          }
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
          // onChange={handleChange}
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
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="tenancyContract">
          {errors.tenancyContract && touched.tenancyContract
            ? errors.tenancyContract
            : "Tenancy Contract"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.tenancyContract}
          type="text"
          name="tenancyContract"
          id="tenancyContract"
          placeholder="Enter tenancy contract"
          className={cn(
            errors.tenancyContract && touched.tenancyContract
              ? "border-red-300"
              : null
          )}
        />
      </div> */}
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
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="coolingNoc">
          {errors.coolingNoc && touched.coolingNoc
            ? errors.coolingNoc
            : "Cooling Noc"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.coolingNoc}
          type="text"
          name="coolingNoc"
          id="coolingNoc"
          placeholder="Enter cooling noc"
          className={cn(
            errors.coolingNoc && touched.coolingNoc ? "border-red-300" : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="mou">
          {errors.mou && touched.mou ? errors.mou : "MOU"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.mou}
          type="text"
          name="mou"
          id="mou"
          placeholder="Enter MOU"
          className={cn(errors.mou && touched.mou ? "border-red-300" : null)}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="offerLetter">
          {errors.offerLetter && touched.offerLetter
            ? errors.offerLetter
            : "Offer Letter"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.offerLetter}
          type="text"
          name="offerLetter"
          id="offerLetter"
          placeholder="Enter offer letter"
          className={cn(
            errors.offerLetter && touched.offerLetter ? "border-red-300" : null
          )}
        />
      </div> */}
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="applicationForm">
          {errors.applicationForm && touched.applicationForm
            ? errors.applicationForm
            : "Application Form"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.applicationForm}
          type="text"
          name="applicationForm"
          id="applicationForm"
          placeholder="Enter application form"
          className={cn(
            errors.applicationForm && touched.applicationForm
              ? "border-red-300"
              : null
          )}
        />
      </div> */}
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="developerConfirmation">
          {errors.developerConfirmation && touched.developerConfirmation
            ? errors.developerConfirmation
            : "Developer Confirmation"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.developerConfirmation}
          type="text"
          name="developerConfirmation"
          id="developerConfirmation"
          placeholder="Enter developer confirmation"
          className={cn(
            errors.developerConfirmation && touched.developerConfirmation
              ? "border-red-300"
              : null
          )}
        />
      </div> */}
      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="ownerORDeveloperPaymentProof">
          {errors.ownerORDeveloperPaymentProof &&
            touched.ownerORDeveloperPaymentProof
            ? errors.ownerORDeveloperPaymentProof
            : "Owner or Developer Payment Proof"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.ownerORDeveloperPaymentProof}
          type="text"
          name="ownerORDeveloperPaymentProof"
          id="ownerORDeveloperPaymentProof"
          placeholder="Enter owner or developer payment proof"
          className={cn(
            errors.ownerORDeveloperPaymentProof &&
              touched.ownerORDeveloperPaymentProof
              ? "border-red-300"
              : null
          )}
        />
      </div>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="agencyFeePaymentProof">
          {errors.agencyFeePaymentProof && touched.agencyFeePaymentProof
            ? errors.agencyFeePaymentProof
            : "Agency Fee Payment Proof"}
        </Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.agencyFeePaymentProof}
          type="text"
          name="agencyFeePaymentProof"
          id="agencyFeePaymentProof"
          placeholder="Enter agency fee payment proof"
          className={cn(
            errors.agencyFeePaymentProof && touched.agencyFeePaymentProof
              ? "border-red-300"
              : null
          )}
        />
      </div> */}

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

function DealsAdd() {
  const dispatch = useDispatch();
  const { isOpen } = useSelector(modalData);

  const handleClose = () => {
    dispatch(modalClosed());
  };
  const handleOpen = () => {
    dispatch(modalOpened());
  };

  return (
    <Drawer open={isOpen} direction="right" className="overflow-scroll">
      <DrawerOverlay onClick={handleClose} />
      <DrawerTrigger asChild>
        <Button
          onClick={handleOpen}
          variant="outline"
          className="bg-blue-700 text-white"
        >
          <BiPlus /> Add Deal
        </Button>
      </DrawerTrigger>
      <DrawerContent className="right-0 z-50 left-auto h-full w-[45rem] overflow-auto">
        <div className="mx-auto w-full">
          <IconButton
            className="float-end"
            onClick={handleClose}
            icon={<CloseIcon />}
          />
          <DrawerHeader className="text-left">
            <DrawerTitle>Add Deal</DrawerTitle>
            <DrawerDescription>
              Add a deal. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <ProfileForm className="px-4" />
          {/* <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button onClick={handleClose} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default DealsAdd;
