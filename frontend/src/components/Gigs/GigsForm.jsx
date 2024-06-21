import { Formik, Field, Form, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import api from "../../helpers/request";
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
        <Form className="max-w-full flex flex-col gap-10 p-8 bg-black text-white mt-10 mr-24 rounded-2xl">
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">Gig title</Label>
            <p className="mb-2">
              As your Gig storefront, your{" "}
              <strong>title is the most important place</strong> to include
              keywords that buyers would likely use to search for a service like
              yours.
            </p>
            <Input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="I will do something I'm really good at"
              className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full border-none text-2xl"
            />
            {/* <span className="text-gray-500">0 / 80 max</span> */}
            <ErrorMessage name="title" component="div" className="text-red" />
          </div>
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">Category</Label>
            <p className="mb-2">
              Choose the category most suitable for your Gig.
            </p>
            <div className="flex space-x-4">
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
            </div>
          </div>
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">Description</Label>
            <p className="mb-2">Provide a detailed description of your Gig.</p>
            <Textarea
              placeholder="Describe your service..."
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className="bg-inputBack py-8 px-14 rounded-xl text-2xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full border-none"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red"
            />
          </div>
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">Price</Label>
            <p className="mb-2">Set a price for your service.</p>
            <Input
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              type="number"
              placeholder="Enter price"
              className="bg-inputBack py-8 px-14 text-2xl rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full border-none"
            />
            <ErrorMessage name="price" component="div" className="text-red" />
          </div>
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">
              Delivery Time
            </Label>
            <p className="mb-2">Specify the delivery time for your service.</p>
            <Input
              type="number"
              name="date"
              value={values.date}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter delivery time in days"
              className="bg-inputBack py-8 px-14 text-2xl rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full border-none"
            />
            <ErrorMessage name="date" component="div" className="text-red" />
          </div>
          <div className="mb-6">
            <Label className="block font-bold mb-2 text-4xl">Images</Label>
            <p className="mb-2">Upload images that represent your service.</p>
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
          </div>
          <Button
            type="submit"
            className={`bg-purple-600 w-1/5 text-white text-4xl bg-purple px-12 py-10 rounded-2xl ${
              isSubmitting
                ? "opacity-45 cursor-not-allowed"
                : "opacity-100 cursor-pointer"
            }`}
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  );
}

{
  /* <Formik initialValues={initial} validate={validate} onSubmit={handleSubmit}>
{({ isSubmitting, values, handleChange, handleBlur, setFieldValue }) => (
  <Form
    className="text-white flex flex-col gap-6 mt-10 mr-24"
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
</Formik> */
}
