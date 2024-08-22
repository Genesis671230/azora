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
import { fetchUsersAsync } from "features/users/userSlice";

const userSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});


function ProfileForm({ className }) {
  const [isLoding, setIsLoding] = React.useState(false);
  const dispatch = useDispatch();
  
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profilePicture: null,
    deleted: false,
  };
  

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
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
          formData?.append("profilePicture", file);
        });
      }

     
      

   console.log(formData);
      const res = Object.entries(values);
      res?.forEach((item) => {
        if (
          ![
            "profilePicture",
          ].includes(item[0])
        ) {
          formData.append(item[0], item[1]);
        }
      });

      
      
      let response = await postApi("api/user/register", formData);
      if (response.status === 200) {
        console.log(formik);
        
        toast.success("Data Submitted Successfully")
        dispatch(fetchUsersAsync())
        handleCancel();
      }
    } catch (e) {
      console.log(e);
      toast.warning("Data not added ")
    } finally {
      setIsLoding(false);
    }
  };



  

  const handleCancel = () => {
    formik.resetForm();
    dispatch(modalClosed());
  };

  return (
    <form className={cn("grid  items-start gap-4 overflow-auto", className)} onSubmit={handleSubmit}>
      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          type="text"
          name="firstName"
          id="firstName"
          placeholder="Enter first name"
          className={cn(errors.firstName && touched.firstName ? "border-red-300" : null)}
        />
      </div>

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Enter last name"
          className={cn(errors.lastName && touched.lastName ? "border-red-300" : null)}
        />
      </div>

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          type="email"
          name="email"
          id="email"
          placeholder="Enter email"
          className={cn(errors.email && touched.email ? "border-red-300" : null)}
        />
      </div>

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          className={cn(errors.password && touched.password ? "border-red-300" : null)}
        />
      </div>

      <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.profilePicture}
          type="file"
          name="profilePicture"
          id="profilePicture"
          className={cn(errors.profilePicture && touched.profilePicture ? "border-red-300" : null)}
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
  )};

function UsersAdd() {
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
          <BiPlus /> Add User
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
            <DrawerTitle>Add User</DrawerTitle>
            <DrawerDescription>
              Add a user. Click save when you're done.
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

export default UsersAdd;
