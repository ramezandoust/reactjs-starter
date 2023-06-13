import { useContext, useEffect } from "react";
import { Navigate, useRoutes, useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import { Layout } from "../layouts/Layout";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import Auth from "../pages/auth/Auth";

const AppRouting = () => {
  const {
    authState: { access_token },
  } = useContext(AuthContext);

  let element = useRoutes([
    {
      path: "/",
      element: (
        <Layout>
          <Dashboard />
        </Layout>
      ),
    },
    {
      path: "/login",
      element: !access_token ? (
        <Layout type={"full-page"}>
          <Auth />
        </Layout>
      ) : (
        <Navigate to="/" replace={true} />
      ),
    },
    {
      path: "*",
      element: (
        <Layout type={"full-page"}>
          <NotFound />
        </Layout>
      ),
    },
  ]);

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!access_token) {
  //     navigate("/login");
  //   }
  // }, [access_token]);

  return element;
};

export default AppRouting;
