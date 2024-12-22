import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import RTE from "../components/RTE";
import { toast } from "react-toastify";

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

      const response = await fetch("http://localhost:4000/api/blogs", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        setMessage("Blog successfully created!");
        toast.success("Blog successfully created!");
      } else {
        setMessage("Failed to create blog. Try again.");
        toast.error("Failed to create blog. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error occurred while creating blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Create New Blog</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Blog Title */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  placeholder="Enter blog title"
                  required
                />
              )}
            />
          </div>

          {/* Author */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Author
            </label>
            <input
              {...register("author", { required: true })}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter author name"
            />
          </div>

          {/* Blog Content */}
          <div className="mb-4">
            <RTE name="content" control={control} label="Content" />
          </div>

          {/* Blog Images */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Upload Images
            </label>
            <input
              type="file"
              {...register("images", { required: true })}
              className="border border-gray-300 rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
              accept="image/*"
              multiple
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`flex items-center justify-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:bg-blue-600 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div role="status" className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-gray-200 animate-spin fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  Submitting...
                </div>
              ) : (
                "Create Blog"
              )}
            </button>
          </div>
        </form>

        {/* Success/Error Message */}
        {message && (
          <p className="mt-4 text-center text-lg font-medium text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;
