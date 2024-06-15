import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import api from "../../helpers/request";
import { uiMessageActions } from "../../store/uiMessage";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/category-actions";
import { uiMessage } from "../../helpers/uiMessage";

export default function GigsForm() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const initial = {
    title: "",
    description: "",
    category: categories[0]?.id,
    price: "",
    date: "",
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.currentTarget.files);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) errors.title = "Required";
    if (!values.description) errors.description = "Required";
    if (!values.price) errors.price = "Required";
    if (!values.date) errors.date = "Required";

    return errors;
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category_id", values.category);
    formData.append("price", values.price);
    formData.append("delivery_time", values.date);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    try {
      const response = await api.post("gigs/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(uiMessage("Successfully created gig", "", "success"));
    } catch (error) {
      dispatch(
        uiMessage(
          "Failed to create gig",
          error.response?.data?.detail[0],
          "error"
        )
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initial} validate={validate} onSubmit={handleSubmit}>
      {({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
        <Form
          className="text-white flex flex-col gap-6"
          encType="multipart/form-data"
        >
          <Field
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Write Title"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
          />
          <ErrorMessage name="title" component="div" className="text-red" />

          <Field
            as="textarea"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Description"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none"
          />
          <ErrorMessage
            name="description"
            component="div"
            className="text-red"
          />

          <Field
            as="select"
            name="category"
            placeholder="Category"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Field>
          <ErrorMessage name="category" component="div" className="text-red" />

          <Field
            type="number"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            onBlur={handleBlur}
            min="0"
          />
          <ErrorMessage name="price" component="div" className="text-red" />

          <Field
            type="number"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            name="date"
            placeholder="Day"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="date" component="div" className="text-red" />

          <input
            type="file"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            name="files"
            placeholder="File"
            multiple
            onChange={(event) => {
              handleFileChange(event);
              setFieldValue("files", event.currentTarget.files);
            }}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-buttonPruple rounded-full p-8 w-1/2 self-center ${
              isSubmitting ? "opacity-75" : ""
            } hover:opacity-80 duration-150`}
          >
            Create gig
          </button>
        </Form>
      )}
    </Formik>
  );
}
