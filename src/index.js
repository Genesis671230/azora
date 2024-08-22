import "./index.css";
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "assets/css/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./index.css";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import UserLayout from "layouts/user";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";
import { fetchDealsAsync } from "features/deals/dealSlice";
import { fetchUsersAsync } from "features/users/userSlice";
// store.dispatch(fetchRevenueReportsAsync())
// store.dispatch(fetchInvoicesAsync())
store.dispatch(fetchDealsAsync());
// store.dispatch(fetchPropertiesAsync())
// store.dispatch(fetchLocationsAsync())
// store.dispatch(fetchLeadsAsync())
// store.dispatch(fetchContactsAsync())
store.dispatch(fetchUsersAsync());
function App() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, [token]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {token ? (
          <Route path="/*" element={<AdminLayout />} />
        ) : (
          <Route path="/*" element={<AuthLayout />} />
        )}
      </Routes>
    </>
  );
}
const root = createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <Provider store={store}>
      <React.StrictMode>
        <ThemeEditorProvider>
          <Router>
            <App />
          </Router>
        </ThemeEditorProvider>
      </React.StrictMode>
    </Provider>
  </ChakraProvider>
);
