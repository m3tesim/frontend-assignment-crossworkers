// Style
import { FunctionComponent } from "react";
import { object, string } from "yup"; // Import Yup
import { useFormik } from "formik"; // Import Formik
import "./index.scss";

const Task1: FunctionComponent = () => {
  const validationSchema = object({
    email: string()
      .email("Invalid email format")
      .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Invalid email format")
      .required("Email is required"),
    password: string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      alert(`Email: ${values.email} \nPassword: ${values.password}`);
    },
  });

  return (
    <div id="task-1">
      <form onSubmit={formik.handleSubmit}>
        <label>Email</label>
        <input
          data-testid="login-email-input"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder="Examle@domain.com"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error-message">{formik.errors.email}</div> // Added class for styling
        )}

        <label>Password</label>
        <input
          data-testid="login-password-input"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder="Password"
        />
        {formik.touched.password && formik.errors.password && (
          <div className="error-message">{formik.errors.password}</div> // Added class for styling
        )}

        <button data-testid="login-btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Task1;
