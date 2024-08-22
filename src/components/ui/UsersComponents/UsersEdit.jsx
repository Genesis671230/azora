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
import { fetchUsersAsync } from "features/users/userSlice.js";


function UsersEdit({ className, dealRowData, setIsModalOpen }) {
  const [isLoding, setIsLoding] = React.useState(false);
  const dispatch = useDispatch();


  
  const initialValues = {
    firstName: dealRowData?.firstName ?? "",  
    lastName: dealRowData?.lastName ?? "",
    email: dealRowData?.email ?? "",
    password: dealRowData?.password ?? "",
    profilePicture: dealRowData?.profilePicture ?? [],
    
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
      let response = await putApi(`api/user/edit/${dealRowData._id}`, values);
      if (response.status === 200) {
        toast.success("Data Edited Successfully");
        dispatch(fetchUsersAsync());
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

    formik.setFieldValue("profilePicture", updatedContract);
  };

  const handleCancel = () => {
    formik.resetForm();
    setIsModalOpen(false);
    dispatch(modalClosed());
  };

  return (
    <form
      className={cn("grid  items-start gap-4 overflow-auto", className)}
      onSubmit={handleSubmit}
    >
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
          className={cn(
            errors.firstName && touched.firstName ? "border-red-300" : null
          )}
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
          className={cn(
            errors.lastName && touched.lastName ? "border-red-300" : null
          )}
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
          className={cn(
            errors.email && touched.email ? "border-red-300" : null
          )}
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
          className={cn(
            errors.password && touched.password ? "border-red-300" : null
          )}
        />
      </div>

      {/* <div className="grid border-[1px] p-2  gap-2">
        <Label htmlFor="profilePicture">Profile Picture</Label>
        <Input
          fontSize="sm"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.profilePicture}
          type="file"
          name="profilePicture"
          id="profilePicture"
          className={cn(
            errors.profilePicture && touched.profilePicture
              ? "border-red-300"
              : null
          )}
        />
      </div> */}

      <div>
        <Label display="flex" ms="4px" fontSize="sm" fontWeight="500" mb="8px">
        profilePicture
        </Label>

        <Dropzone
          // w={{ base: "100%", "2xl": "240px" }}
          me="36px"
          minH={150}
          height={"100%"}
          onFileSelect={(file) => setFieldValue("profilePicture", file)}
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
        {values.profilePicture?.length > 0 &&
          values.profilePicture.map((item) => {
            const fileLink = `${constant.baseUrl}api/user/user-documents/${
              typeof item.path === "string" ? item?.path.split("/")[3] : ""
            }`;
            console.log(fileLink);
            return (
              // <div onClick={onRowClicked}>
              <>
                <div className="w-[10rem] h-[10rem] relative">
                  <span className="absolute z-10 top-2 right-1 bg-white p-1 rounded-full hover:scale-110 shadow-md">
                    <Cross1Icon
                      onClick={() => handleUnselectImage(item.path)}
                      className=" text-black  rounded-full   h-4 w-4 cursor-pointer "
                    />
                  </span>
                  <img
                    onClick={() => handleFileClick(fileLink)}
                    className="w-full h-full object-cover rounded-md shadow-md"
                    src={fileLink}
                    alt=""
                    srcset=" "
                  />
                </div>
              </>
              // <Button onClick={()=>handleOpenModal(params)}>Edit</Button>
              // </div>
            );
          })}
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

export default UsersEdit;
