import { Icon } from "@chakra-ui/react";
import { HiOutlineDocumentReport, HiUsers } from "react-icons/hi";
import { MdContacts, MdHome, MdLeaderboard, MdLock } from "react-icons/md";
// icon
import React from "react";
import { LiaFileInvoiceSolid, LiaSearchLocationSolid } from "react-icons/lia";
import { LuBuilding2 } from "react-icons/lu";
import { PiPhoneCallBold } from "react-icons/pi";
import { SiGooglemeet } from "react-icons/si";
import { GrMapLocation, GrProjects } from "react-icons/gr";

const Deals = React.lazy(() => import("features/deals/Deals"));
// const RevenueReportsView = React.lazy(() => import("features/revenue-report/RevenueReportView"));
// Admin Imports
const MainDashboard = React.lazy(() => import("views/admin/default"));

// My component

const Users = React.lazy(() => import("features/users/Users"));
const UserView = React.lazy(() => import("views/admin/users/View"));
const SignUp = React.lazy(() => import("views/auth/signup/signup"));

// Auth Imports
const SignInCentered = React.lazy(() => import("views/auth/signIn"));

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },

  // {
  //   name: "Lead",
  //   layout: "/admin",
  //   both: true,
  //   path: "/lead",
  //   icon: <Icon as={MdLeaderboard} width='20px' height='20px' color='inherit' />,
  //   component: Lead,
  // },
  // {
  //   name: "Lead View",
  //   layout: "/admin",
  //   both: true,
  //   under: "lead",
  //   path: "/leadView/:id",
  //   component: LeadView,
  // },

  // {
  //   name: "Customers",
  //   layout: "/admin",
  //   both: true,
  //   path: "/customers",
  //   icon: <Icon as={MdContacts} width="20px" height="20px" color="inherit" />,
  //   component: Contact,
  // },
  // {
  //   name: "Contact View",
  //   layout: "/admin",
  //   both: true,
  //   under: "contacts",
  //   path: "/contactView/:id",
  //   component: ContactView,
  // },

  // {
  //   name: "Sales Order",
  //   layout: "/admin",
  //   both: true,
  //   path: "/sales-order",
  //   icon: <Icon as={LuBuilding2} width="20px" height="20px" color="inherit" />,
  //   component: Properties,
  // },
  // {
  //   name: "Quotations",
  //   layout: "/admin",
  //   both: true,
  //   path: "/quotaions",
  //   icon: <Icon as={GrMapLocation} width="20px" height="20px" color="inherit" />,
  //   component: Location,
  // },

  // {
  //   name: "Invoices",
  //   layout: "/admin",
  //   both: true,
  //   path: "/invoices",
  //   icon: <Icon as={LiaFileInvoiceSolid} width="20px" height="20px" color="inherit" />,
  //   component: Invoices,
  // },
  // {
  //   name: "Property View",
  //   layout: "/admin",
  //   both: true,
  //   under: "properties",
  //   path: "/propertyView/:id",
  //   component: PropertyView,
  // },

  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={HiUsers} width="20px" height="20px" color="inherit" />,
    component: Users,
  },

  {
    name: "Inventory",
    layout: "/admin",
    both: true,
    path: "/inventory",
    icon: <Icon as={LuBuilding2} width="20px" height="20px" color="inherit" />,
    component: Deals,
  },
  // {
  //   name: "Deal View",
  //   layout: "/admin",
  //   both: true,
  //   under: "deals",
  //   path: "/dealView/:id",
  //   component: PropertyView,
  // },

  {
    name: "User View",
    under: "user",
    layout: "/admin",
    path: "/userView/:id",
    component: UserView,
  },
  // {
  //   name: "Suppliers",
  //   layout: "/admin",
  //   both: true,
  //   path: "/suppliers",
  //   icon: <Icon as={GrProjects} width="20px" height="20px" color="inherit" />,
  //   component: Project,
  // },
  // {
  //   name: "Services",
  //   layout: "/admin",
  //   both: true,
  //   path: "/services",
  //   icon: <Icon as={HiOutlineDocumentReport } width="20px" height="20px" color="inherit" />,
  //   component: RevenueReport,
  // },

  {
    name: "Sign In",
    layout: "/auth",
    under: "auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignInCentered,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    under: "auth",
    path: "/sign-up",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: SignUp,
  },
];

export default routes;
