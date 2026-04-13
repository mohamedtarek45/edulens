import  useUserStore  from "../store/userStore";
import { useGetMe } from "../hooks/Auth";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import PageLoader from "./PageLoader";

const ProtectedRoute = ({ TeacherOnly , children }) => {
  const setUser = useUserStore((state) => state.setUser);
  const { data, isPending, isError } = useGetMe();

  useEffect(() => {
    if (data?.user) {
      setUser(data.user); 
    }
  }, [data, setUser]);
  if (isPending) return <PageLoader/>;
  if (isError || !data?.user) return <Navigate to="/login" replace />;

  if (TeacherOnly && data?.user?.role !== "teacher") {
    return <Navigate to="/home" replace />;
  }
  return children;
};

export default ProtectedRoute;
