import { Outlet } from "react-router-dom";
import FloatingLogout from "../components/LogoutButton";

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <FloatingLogout />
    </>
  );
};

export default HomeLayout;