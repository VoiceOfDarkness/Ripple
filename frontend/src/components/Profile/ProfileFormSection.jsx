import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import api from "@/helpers/request";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store/profile-slice";
import { Formik, Form, Field } from "formik";

export default function ProfileFormSection({ user }) {
  const dispatch = useDispatch();
  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await api.patch(
      "user/profile",
      {
        first_name: values.first_name,
        last_name: values.last_name,
        user_name: values.user_name,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(profileActions.setProfile(response.data));
    setSubmitting(false);
  };

  return (
    <div className="mb-2 text-black" data-id="element-24">
      <Formik
        initialValues={{
          user_name: user.profile?.user_name || "",
          first_name: user.profile?.first_name || "",
          last_name: user.profile?.last_name || "",
        }}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur, isSubmitting }) => (
          <Form className="flex flex-col text-white gap-6">
            <Input
              type="text"
              placeholder="First Name"
              className="py-8 px-14 w-full text-xl bg-inputGray"
              data-id="element-25"
              value={values.first_name}
              onChange={handleChange}
              onBlur={handleBlur}
              name="first_name"
            />
            <Input
              type="text"
              placeholder="Last Name"
              className="py-8 px-14 w-full text-xl bg-inputGray"
              data-id="element-26"
              value={values.last_name}
              name="last_name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              type="text"
              placeholder="Username"
              className="py-8 px-14 w-full text-xl bg-inputGray"
              data-id="element-27"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user_name}
              name="user_name"
            />
            <Textarea
              placeholder="Overview"
              className="py-8 px-14 w-full text-xl bg-inputGray"
              data-id="element-47"
            />
            <Button
              variant="outline"
              type="submit"
              className={`mt-4 p-8 border-none w-full bg-gray-800 text-white text-xl ${
                isSubmitting
                  ? "opacity-45 cursor-not-allowed"
                  : "opacity-100 cursor-pointer"
              }`}
              data-id="element-28"
            >
              Edit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
