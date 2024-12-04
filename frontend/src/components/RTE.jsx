import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
          apiKey="8dvjwy7kyskn2wadh5obpxz6ou22v5f61c82gssglo5qtwij" // Add API Key here

            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "image", "advlist", "autolink", "lists", "link", "charmap",
                "preview", "anchor", "searchreplace", "visualblocks", "code",
                "fullscreen", "insertdatetime", "media", "table", "help",
                "wordcount", "codesample", "emoticons", "autosave", "spellchecker"
              ],
              toolbar:
                "undo redo | formatselect | bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | codesample emoticons fullscreen",
              content_style: `
                body { font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6; }
                img { max-width: 100%; height: auto; }
              `,
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

