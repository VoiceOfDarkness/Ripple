import { Formik, Field, Form, ErrorMessage } from "formik";

export default function GigsForm() {
  const initial = {
    title: "",
    description: "",
    fileImg: "",
    category: "IT",
    price: "",
    date: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.title) errors.title = "Required";
    if (!values.description) errors.description = "Required";
    if (!values.price) errors.price = "Required";
    if (!values.date) errors.date = "Required";

    return errors;
  };

  return (
    <Formik
      initialValues={initial}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values, handleChange, handleBlur }) => (
        <Form className="text-white flex flex-col gap-6">
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
            placeholder="Password"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option value="IT">İT</option>
            <option value="Design">Design</option>
            <option value="Business">Business</option>
            <option value="Marketing">Marketing</option>
          </Field>
          <ErrorMessage name="password" component="div" className="text-red" />

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
            type="date"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            name="date"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <ErrorMessage name="date" component="div" className="text-red" />

          <Field
            type="file"
            className="bg-inputBack py-8 px-14 rounded-xl placeholder:text-white focus:border-purple focus:border-2 focus:outline-none w-full"
            name="fileImg"
            placeholder="File"
            onChange={handleChange}
            onBlur={handleBlur}
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

//Title
// Description
// File img
//Category
// Price
// Time
