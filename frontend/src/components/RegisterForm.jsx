import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { useRegister } from "../hooks/Auth";
export default function RegisterForm({ goToLogin }) {
  const { mutateAsync ,isPending } = useRegister();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "student",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "At least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      //   role: Yup.string().oneOf(["teacher", "student"]),
    }),
    onSubmit: async (values) => {
      const { confirmPassword, ...data } = values;
      try {
        const res = await mutateAsync(data);
        if (!res?.user) return;
        toast.success("Register success you can now login");
        goToLogin();
      } catch (err) {
        toast.error(err.message);
        console.log(err.message);
      }
    },
  });

  const inputClass = (field) =>
    `w-full px-3.5 py-2.5 text-sm rounded-lg border bg-gray-50 focus:bg-white outline-none transition
    ${
      formik.touched[field] && formik.errors[field]
        ? "border-red-300 focus:border-red-400"
        : "border-gray-200 focus:border-blue-400"
    }`;

  return (
    <div className=" flex items-center justify-center py-5">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Create account
        </h2>
        <p className="text-sm text-gray-400 mb-7">
          Fill in your details to get started
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className={inputClass("name")}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-400 text-xs mt-1">{formik.errors.name}</p>
            )}
          </div>

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
              className={inputClass("email")}
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
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={inputClass("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-400 text-xs mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={inputClass("confirmPassword")}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {formik.errors.confirmPassword}
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
              "Create account"
            )}
       
          </button>
        </form>
      </div>
    </div>
  );
}
