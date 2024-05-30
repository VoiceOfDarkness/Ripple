import { Formik, Form, Field, ErrorMessage } from "formik";
import { VisibilityOffOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { craeteUser, login } from "../../store/auth-actions";

export default function LoginForm({ mode }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const validation = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.userName && mode === "signup") {
      errors.userName = "Required";
    } else if (
      mode === "signup" &&
      !/^[a-zA-Z0-9_-]{3,16}$/.test(values.userName)
    ) {
      errors.userName = "Invalid user name.";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z_-\d]{8,}$/.test(values.password)
    ) {
      errors.password =
        "Invalid password. Please write 8 characters and use one letter and number";
    }

    return errors;
  };

  return (
    <div>
      <Formik
        key={mode}
        initialValues={
          mode === "login"
            ? { email: "", password: "" }
            : { userName: "", email: "", password: "" }
        }
        validate={validation}
        onSubmit={async (values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          mode !== "login"
            ? await dispatch(
                craeteUser(values.userName, values.password, values.email)
              )
            : await dispatch(login(values.email, values.password));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, values, handleChange, handleBlur }) => (
          <Form className="text-white flex flex-col gap-6">
            {mode !== "login" && (
              <>
                <Field
                  type="text"
                  name="userName"
                  value={values.userName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="User Name"
                  className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
                />
                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red"
                />
              </>
            )}

            <Field
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Email"
              className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
            />
            <ErrorMessage name="email" component="div" className="text-red" />

            <div className="relative">
              <Field
                type={visible ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              <span
                className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setVisible((prevState) => !prevState)}
              >
                <VisibilityOffOutlined
                  style={{
                    fontSize: "3rem",
                    color: visible ? "#412E76" : "white",
                  }}
                />
              </span>
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className={`bg-buttonPruple rounded-full p-8 w-1/2 self-center ${
                isSubmitting ? "opacity-75" : ""
              } hover:opacity-80 duration-150`}
            >
              {mode === "login" ? "Login" : "Create Account"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
