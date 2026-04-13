import { LogOut } from "lucide-react";
import { useLogout } from "../hooks/Auth";

const FloatingLogout = () => {
  const { mutateAsync: logout, isPending } = useLogout();

  return (
    <button
      onClick={async () => await logout()}
      disabled={isPending}
      className="fixed hover:cursor-pointer bottom-6 right-6 bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white p-4 rounded-full shadow-lg transition-all active:scale-95"
    >
      <LogOut size={20} />
    </button>
  );
};

export default FloatingLogout;
