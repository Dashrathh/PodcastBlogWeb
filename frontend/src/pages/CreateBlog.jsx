import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import RTE from "../components/RTE";

const CreateBlog = () => {
  const { handleSubmit, control, register } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      formData.append("author", data.author);

      // Append multiple images
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("http://localhost:4000/api/blogs/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Blog successfully created!");
      } else {
        setMessage("Failed to create blog. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while creating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-5">Create New Blog</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      
        {/* Blog Title */}
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <Controller
            name="title"   //This is the name of the field
            control={control} //Linking React Hook Form with Controller
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="border p-2 w-full"
                placeholder="Enter blog title"
                required
              />
            )}
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-gray-700">Author</label>
          <input
            {...register("author", { required: true })}
            className="border p-2 w-full"
            placeholder="Enter author name"
          />
        </div>

        {/* Blog Content */}
        <div className="mb-4">
          <RTE name="content" control={control} label="Content" />
        </div>

        {/* Blog Images */}
        <div className="mb-4">
          <label className="block text-gray-700">Upload Images</label>
          <input
            type="file"
            {...register("images", { required: true })}
            className="border p-2 w-full"
            accept="image/*"
            multiple
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-blue-500 text-white px-4 py-2 rounded ${
              loading ? "opacity-50" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Blog"}
          </button>
        </div>
      </form>

      {/* Success/Error Message */}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreateBlog;
