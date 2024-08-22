  import {
  AddIcon,
  ChevronDownIcon,
  CloseIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  Box,
  // Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  // Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
// import Card from "components/card/Card";
import { HSeparator } from "components/separator/Separator";
import Spinner from "components/spinner/Spinner";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { getApi } from "services/api";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";
import { constant } from "constant";



import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "../../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card"
import { Checkbox } from "../../../components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { Input } from "../../../components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../../../components/ui/sheet"
import UsersEdit from "components/ui/UsersComponents/UsersEdit";
import { Drawer } from "components/ui/drawer";
import { DrawerOverlay } from "components/ui/drawer";
import { DrawerContent } from "components/ui/drawer";
import { DrawerHeader } from "components/ui/drawer";
import { DrawerTitle } from "components/ui/drawer";
import { DrawerDescription } from "components/ui/drawer";









export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">Security</Link>
            <Link href="#">Integrations</Link>
            <Link href="#">Support</Link>
            <Link href="#">Organizations</Link>
            <Link href="#">Advanced</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Store Name</CardTitle>
                <CardDescription>
                  Used to identify your store in the marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <Input placeholder="Store Name" />
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-04-chunk-2">
              <CardHeader>
                <CardTitle>Plugins Directory</CardTitle>
                <CardDescription>
                  The directory within your project, in which your plugins are
                  located.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex flex-col gap-4">
                  <Input
                    placeholder="Project Name"
                    defaultValue="/content/plugins"
                  />
                  <div className="flex items-center space-x-2">
                    <Checkbox id="include" defaultChecked />
                    <label
                      htmlFor="include"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Allow administrators to change the directory.
                    </label>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}



const View = () => {
  const param = useParams();

  const [selectedRowData, setSelectedRowData] = useState(null); // State to hold selected row data
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  
  const [data, setData] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [edit, setEdit] = useState(false);

  const [deleteModel, setDelete] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const size = "lg";
  console.log(data);
  const fetchData = async () => {
    setIsLoding(true);
    let response = await getApi("api/user/view/", param.id);
    setData(response.data);
    setIsLoding(false);
  };

  useEffect(() => {
    fetchData();
  }, [edit]);

  const handleClose = () => {
    setIsModalOpen(false);
    // dispatch(modalClosed());
  };

  return (
    <>
      {isLoding ? (
        <Flex justifyContent={"center"} alignItems={"center"} width="100%">
          <Spinner />
        </Flex>
      ) : (
        <>
          <Add isOpen={isOpen} fetchData={fetchData} onClose={onClose} />
          <Edit isOpen={edit} fetchData={fetchData} onClose={setEdit} />
          <Delete
            isOpen={deleteModel}
            onClose={setDelete}
            method="one"
            url="api/user/delete/"
            id={param.id}
          />

          {/* <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={1}>
            <GridItem colStart={6}>
              <Flex justifyContent={"right"}>
                <Menu>
                  <MenuButton
                    variant="outline"
                    colorScheme="blackAlpha"
                    va
                    mr={2.5}
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                  >
                    Actions
                  </MenuButton>
                  <MenuDivider />
                  <MenuList>
                    <MenuItem onClick={() => onOpen()} icon={<AddIcon />}>
                      Add
                    </MenuItem>
                    <MenuItem onClick={() => setEdit(true)} icon={<EditIcon />}>
                      Edit
                    </MenuItem>
                    
                        <>
                          <MenuDivider />
                          <MenuItem
                            onClick={() => setDelete(true)}
                            icon={<DeleteIcon />}
                          >
                            Delete
                          </MenuItem>
                        </>
                      
                  </MenuList>
                </Menu>
                <Link to="/admin/user">
                  <Button leftIcon={<IoIosArrowBack />} variant="brand">
                    Back
                  </Button>
                </Link>
              </Flex>
            </GridItem>
          </Grid> */}



          <Grid templateColumns="repeat(4, 1fr)" gap={3}>
            <GridItem colSpan={{ base: 4 }}>
              <Card>
                <Grid templateColumns={{ base: "1fr" }} gap={4}>
                  <GridItem colSpan={2}>
                    <Box style={{padding:"20px"}}>
                      <Heading size="md" mb={3} textTransform={"capitalize"}>
                        {data?.firstName || data?.email ? `${data?.firstName}` : "User"}{" "}
                        Information
                      </Heading>
                      <HSeparator />
                    </Box>
                  </GridItem>

                  <GridItem colSpan={{ base: 12 }}>
                    <Card>
                      <Grid templateColumns="repeat(12, 1fr)" gap={4}>
                        <GridItem colSpan={{ base: 12 }}>
                          <Flex
                            flexWrap="wrap"
                            justifyContent="flex-start"
                            alignItems="center"
                            width="100%"
                          >
                            {data?.profilePicture?.map((item, index) => {
                              const imageUrl = `${constant.baseUrl}api/user/user-documents/${item.split("/")[3]}`;
                              console.log(imageUrl);
                              return (
                                <div className="flex w-full">
                                  
                                <Image
                                  key={index}
                                  borderRadius="25%"
                                  height="150px"
                                  width="150px" // Set a fixed width to make it circular
                                  m={1}
                                  src={imageUrl}
                                  alt="Profile Picture"
                                  className="rounded-full object-cover  "
                                  />
                                  <div className="flex flex-col  justify-center ml-2">
                                  <Text fontSize="lg" fontWeight="bold" color={"blackAlpha.900"}>{data?.firstName}</Text>
                                  <Text fontSize="lg" fontWeight="normal" color={"blackAlpha.700"}>{data?.lastName}</Text>
                                  </div>
                                  </div>
                              );
                            })}
                          </Flex>
                        </GridItem>
                      </Grid>
                    </Card>
                  </GridItem>



                  <Grid
                    templateColumns={"repeat(2, 1fr)"}
                    paddingLeft={"3rem"}
                    paddingRight={"3rem"}
                    paddingTop={50}
                    paddingBottom={50}
                    gap={4}
                  >
                   
                    {Object.entries(data || {})
                      .filter(
                        ([key, value]) =>
                          ![
                            "_id",
                            "profilePicture",
                            "__v",
                            "deleted"
                          ].includes(key)
                      )
                      .map(([key, value]) => {
                        return (
                          <GridItem colSpan={{ base: 2, md: 1 }}>
                            <Text
                              fontSize="sm"
                              textStyle={"capitalize"}
                              fontWeight="bold"
                              color={"blackAlpha.900"}
                            >
                              {" "}
                              {key}{" "}
                            </Text>
                            <Text>{value ? value : " - "}</Text>
                          </GridItem>
                        );
                      })}
                    
                  </Grid>
                </Grid>
              </Card>
            </GridItem>
          </Grid>
          <Card mt={3}>
            <Grid templateColumns="repeat(6, 1fr)" gap={1}>
              <GridItem colStart={6}>
                <Flex justifyContent={"right"}>
                  <Button
                    onClick={() => {
                      setSelectedRowData(data)
                      setIsModalOpen(true);
                    }}
                    leftIcon={<EditIcon />}
                    mr={2.5}
                    variant="outline"
                    colorScheme="green"
                  >
                    Edit
                  </Button>
                  {data?.role !== "admin" &&
                    JSON.parse(localStorage.getItem("user"))?.role ===
                    "admin" && (
                      <Button
                        style={{ background: "red.800" }}
                        onClick={() => setDelete(true)}
                        leftIcon={<DeleteIcon />}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    )}
                </Flex>
              </GridItem>
            </Grid>
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
          </Card>
        </>
      )}
    </>
  );
};

export default View;



