import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
// Chakra imports
import {
  Box,
  Button, Checkbox, Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue
} from "@chakra-ui/react";
import bgBlackTeamVideo from "../../../assets/img/AI-Motherboard-scaled.jpg";

// Custom components
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/logo/logo_purple_blackTeam.png";

import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { postApi } from "services/api";
import { loginSchema } from "schema";
import { toast } from "react-toastify";
import Spinner from "components/spinner/Spinner";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [isLoding, setIsLoding] = React.useState(false)
  const [checkBox, setCheckBox] = React.useState(true)

  const [show, setShow] = React.useState(false);
  const showPass = () => setShow(!show);

  const initialValues = {
    email: '',
    password: ''
  }
  const { errors, values, touched, handleBlur, handleChange, resetForm, handleSubmit } = useFormik({
    initialValues: initialValues,
    // validationSchema: loginSchema,
    onSubmit: (values, { resetForm }) => {
      login()
    }
  })
  const navigate = useNavigate()

  const login = async () => {
    try {
      setIsLoding(true)
      let response = await postApi('api/user/login', values, checkBox)
      if (response && response.status === 200) {
        navigate('/admin')
        toast.success("Login Successfully!")
        resetForm();
      } else {
        toast.error(response?.response.data?.error)
      }
    }
    catch (e) {
      console.log(e)
    }
    finally {
      setIsLoding(false)
    }
  }

  return (
    <>
    <div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <img src={bgBlackTeamVideo} className="z-20 absolute inset-0 object-cover h-full overflow-hidden max-h-[100vh]" width={960} height={6}/>
         
      
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Agora is leading innovation, hospitality company.&rdquo;
            </p>
            <footer className="text-sm">Huzaifa "CEO @ Oculivus"</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-muted-foreground">
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>
          {/* <UserAuthForm /> */}



                 <form onSubmit={handleSubmit}>
             <FormControl isInvalid={errors.email && touched.email} >
               <FormLabel
                display='flex'
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                mb='8px'>
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                fontSize='sm'
                onChange={handleChange} onBlur={handleBlur}
                value={values.email}
                name="email"
                ms={{ base: "0px", md: "0px" }}
                type='email'
                placeholder='mail@gmail.com'
                mb={errors.email && touched.email ? undefined : '24px'}
                fontWeight='500'
                size='lg'
                borderColor={errors.email && touched.email ? "red.300" : null}
                className={errors.email && touched.email ? "isInvalid" : null}
              />
              {errors.email && touched.email && <FormErrorMessage mb='24px'> {errors.email}</FormErrorMessage>}
            </FormControl>

            <FormControl isInvalid={errors.password && touched.password} mb="24px">
              <FormLabel
                ms='4px'
                fontSize='sm'
                fontWeight='500'
                color={textColor}
                display='flex'>
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size='md'>
                <Input
                  isRequired={true}
                  fontSize='sm'
                  placeholder='Enter Your Password'
                  name='password'
                  mb={errors.password && touched.password ? undefined : '24px'}
                  value={values.password} onChange={handleChange} onBlur={handleBlur}
                  size='lg'
                  variant='auth'
                  type={show ? "text" : "password"}
                  borderColor={errors.password && touched.password ? "red.300" : null}
                  className={errors.password && touched.password ? "isInvalid" : null}
                />
                <InputRightElement display='flex' alignItems='center' mt='4px'>
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={showPass}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password && <FormErrorMessage mb='24px'> {errors.password}</FormErrorMessage>}
              <Flex justifyContent='space-between' align='center' mb='24px'>
                <FormControl display='flex' alignItems='center'>
                  <Checkbox
                    onChange={(e) => setCheckBox(e.target.checked)}
                    id='remember-login'
                    value={checkBox}
                    defaultChecked
                    className="bg-[#f5f5f5]"
                    colorScheme='brandScheme'
                    me='10px'
                  />
                  <FormLabel
                    htmlFor='remember-login'
                    mb='0'
                    fontWeight='normal'
                    color={textColor}
                    fontSize='sm'>
                    Keep me logged in
                  </FormLabel>
                </FormControl>
              </Flex>

              <Flex justifyContent='space-between' align='center' mb='24px'>
              </Flex>
              <Button
                fontSize='sm'
                variant='brand'
                fontWeight='500'
                w='100%'
                h='50'
                type="submit"
                mb='24px'
                disabled={isLoding ? true : false}
              >
                {isLoding ? <Spinner /> : 'Sign In'}
              </Button>
            </FormControl>
          </form>



          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking login, you agree to our{" "}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
         <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/auth/sign-up" className="underline">
              Sign up
            </Link>
          </div>
      </div>
    </div>
  </>
   
  );
}

export default SignIn;
