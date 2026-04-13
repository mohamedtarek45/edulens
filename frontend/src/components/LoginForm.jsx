import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useLogin } from "../hooks/Auth";
import { useNavigate } from "react-router";
import useUserStore from "../store/userStore";
export default function LoginForm() {

  const { mutateAsync, isPending } = useLogin();
  let navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await mutateAsync(values);
        if (!res?.user) return;
        toast.success("Login success");
        setUser(res.user);
        navigate("/home");
      } catch (err) {
        toast.error("Login failed");
        console.log(err.message);
      }
    },
  });

  return (
    <div className=" bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Welcome back
        </h2>
        <p className="text-sm text-gray-400 mb-7">Sign in to your account</p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-gray-50 focus:bg-white outline-none transition
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-gray-50 focus:bg-white outline-none transition
                ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-300 focus:border-red-400"
                    : "border-gray-200 focus:border-blue-400"
                }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2.5 rounded-lg transition mt-2"
          >
            {isPending ? (
              <>
                <div className="size-5 border-b-2 border-b-white rounded-full animate-spin mx-auto" />
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
