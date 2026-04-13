import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useGetMe } from "../hooks/Auth";
import { Navigate } from "react-router-dom";
import AppLoader from "../components/AppLoader";

const AuthPage = () => {
  const { data, isPending, isError } = useGetMe();
  const [isLogin, setIsLogin] = useState(true);
  if (isPending) return <AppLoader />;
  if (isError || !data?.user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-sm">
          {isLogin ? (
            <LoginForm />
          ) : (
            <RegisterForm goToLogin={() => setIsLogin(true)} />
          )}

          <p className="text-center text-sm text-gray-400 mb-8 mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-blue-500 hover:text-blue-600 font-medium transition"
            >
              {isLogin ? "Create account" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    );
  }

  return <Navigate to="/home" replace />;
};

export default AuthPage;