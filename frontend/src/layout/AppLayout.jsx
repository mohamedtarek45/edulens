import { Outlet, useNavigation } from "react-router-dom";
import AppLoader from "../components/AppLoader";


const AppLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="min-h-screen bg-slate-50">
      {isLoading ? <AppLoader /> : <Outlet />}
    </div>
  );
};

export default AppLayout;