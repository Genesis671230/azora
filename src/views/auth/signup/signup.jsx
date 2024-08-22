import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import reception from "../../../assets/img/aston.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { useFormik } from "formik";
import Dropzone from "../../../components/Dropzone";
import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { MdUpload } from "react-icons/md";
import { useState } from "react";
import { postApi } from "services/api";
import { toast } from "react-toastify";
const SignUp = () => {

    const [isLoding, setIsLoding] = useState(false);

    const navigate = useNavigate()

const initialValues = {
    firstName: "",
    lastName: "",
    profilePicture: null,
    email: "",
    password: "",

  };

  
  const formik = useFormik({
    initialValues: initialValues,
    // validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      AddData();
      // resetForm();
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
    resetForm,
  } = formik;

  const AddData = async () => {
    try {
      setIsLoding(true);
      const formData = new FormData();

      if (values?.profilePicture?.length > 0) {
        values?.profilePicture?.forEach((file) => {
          formData?.append("profilePicture", file);
        });
      }

      

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

      if (response && response.status === 200) {
        toast.success("Account created Succefully!");
        console.log("response", response);
        navigate("/auth/sign-in");
        resetForm();
      } else {
        toast.error(response.response.data?.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };
console.log(values,"this is values")

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="hidden h-[100vh] overflow-hidden bg-muted lg:block">
        <img
          src={reception}
          alt="Image"
          width="1280"
          height="300"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input onChange={handleChange} id="firstName" placeholder="Max" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input onChange={handleChange} id="lastName" placeholder="Robinson" required />
                  </div>
                </div>
                <div>
                <Dropzone
                    // w={{ base: "100%", "2xl": "240px" }}
                    me="36px"
                    minH={150}
                    height={"100%"}
                    onFileSelect={(file) =>
                      setFieldValue("profilePicture", file)
                    }
                    content={
                      <Box>
                        <Icon
                          as={MdUpload}
                          w="70px"
                          h="70px"
                        />
                        <Flex justify="center" mx="auto" mb="12px">
                          <Text
                            fontSize="md"
                            fontWeight="700"
                          >
                            Upload Profile Picture
                          </Text>
                        </Flex>
                      </Box>
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    onChange={handleChange}
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input onChange={handleChange} id="password" type="password" />
                </div>
                <Button onClick={AddData} type="submit" className="w-full">
                  Create an account
                </Button>
                
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link to="/auth/sign-in" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            
          </div> */}
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
    
    </div>
  );
};
export default SignUp;
