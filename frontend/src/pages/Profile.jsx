import React from "react";
import GradientAnimation from "../components/MorphingGradient/GradientAnimation";
import UserContainer from "../components/UserContainer";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { getProfile } from "../store/profile-slice";
import api from "../helpers/request";
import { profileActions } from "../store/profile-slice";
import { Field, Form, Formik } from "formik";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.profile);
  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const response = await api.patch(
      "user/profile",
      { user_image: file },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(profileActions.setProfile(response.data));
  };

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, user.profile?.user_name]);

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

  console.log(user.profile?.user_name);

  return (
    <div className="rounded-3xl mt-10 mr-24 p-5 bg-black relative">
      <GradientAnimation />
      <UserContainer>
        <div className="flex justify-between w-full">
          <div className="flex flex-col justify-start gap-16">
            <div className="flex items-center gap-16">
              {user.profile?.user_image ? (
                <img
                  src={`${
                    user.profile?.user_image.includes("http")
                      ? ""
                      : "http://localhost:8000/app/media/"
                  }${user.profile?.user_image}`}
                  className=" w-80 h-80 rounded-full"
                />
              ) : (
                <div className="w-80 h-80 rounded-full text-9xl flex justify-center items-center bg-purple">
                  {user.profile?.user_name[0].toUpperCase()}
                </div>
              )}
              <p className="text-5xl text-white font-semibold mt-10 mb-7">
                {user.profile?.user_name}
              </p>
            </div>
            <div className="w-100">
              <button
                onClick={handleUploadClick}
                className="bg-purple p-5 rounded-full w-1/2"
              >
                Upload image
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
          </div>
          <div className="w-1/2">
            <Formik
              initialValues={{
                user_name: user.profile?.user_name,
                first_name: user.profile?.first_name,
                last_name: user.profile?.last_name,
              }}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ values, handleChange, handleBlur, isSubmitting }) => (
                <Form className="text-white flex flex-col gap-6">
                  <Field
                    type="text"
                    value={values.user_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="user_name"
                    className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white placeholder:opacity-40 focus:border-purple focus:border-2 focus:outline-none"
                    placeholder="Username"
                  />
                  <Field
                    type="text"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="first_name"
                    className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white placeholder:opacity-40 focus:border-purple focus:border-2 focus:outline-none"
                    placeholder="First Name"
                  />
                  <Field
                    type="text"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="last_name"
                    className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white placeholder:opacity-40 focus:border-purple focus:border-2 focus:outline-none"
                    placeholder="Last Name"
                  />
                  <button
                    type="submit"
                    className={`bg-purple p-5 rounded-full w-1/2 ${
                      isSubmitting ? "opacity-50" : "opacity-100"
                    }`}
                  >
                    Change infos
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>

        {/* <DetailHeaders />
        <div className="border-l border-slate-300 mr-24 relative flex flex-col items-center">
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-28 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-14 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-60 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-64 -ml-[0.69rem]"
          />
          <FiberManualRecordIcon
            fontSize="small"
            className="mb-10 -ml-[0.69rem]"
          />
        </div>
        <ProfileInfoes /> */}
      </UserContainer>
    </div>
  );
};

export default Profile;
