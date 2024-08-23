import { Icon } from "@chakra-ui/react";
import { HiOutlineDocumentReport, HiUsers } from "react-icons/hi";
import { MdContacts, MdHome, MdLeaderboard, MdLock } from "react-icons/md";
// icon
import React from "react";

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



  {
    name: "Users",
    layout: "/admin",
    path: "/users",
    icon: <Icon as={HiUsers} width="20px" height="20px" color="inherit" />,
    component: Users,
  },

 


  {
    name: "User View",
    under: "user",
    layout: "/admin",
    path: "/userView/:id",
    component: UserView,
  },


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
