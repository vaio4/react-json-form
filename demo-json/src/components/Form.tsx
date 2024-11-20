import React, { useState, useEffect } from "react";
import FormField from "./FormField";
import "../index.css";
import { handleSuccess } from "../utils/alerts";

interface prop {
  setDark: (value: boolean) => void;
  dark: boolean;
}

const Form: React.FC<prop> = ({ setDark, dark }) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [json, setJson] = useState<any>(null);
  const [jsonText, setJsonText] = useState<string>("");
  const [jsonError, setJsonError] = useState<string | null>(null);

  const initialJsonData = `{
    "title": "Project Requirements Survey",
    "fields": [
      {
        "id": "name",
        "type": "text",
        "label": "Full Name",
        "placeholder": "Enter your full name",
        "required": true
      },
      {
        "id": "email",
        "type": "email",
        "label": "Email Address",
        "placeholder": "you@example.com",
        "required": true,
        "pattern": "^[^\\\\s@]+@[^\\\\s@]+\\\\.[^\\\\s@]+$",
        "validationMessage": "Please enter a valid email address"
      },
      {
        "id": "companySize",
        "type": "select",
        "label": "Company Size",
        "required": true,
        "options": [
          { "value": "1-50", "label": "1-50 employees" },
          { "value": "51-200", "label": "51-200 employees" },
          { "value": "201-1000", "label": "201-1000 employees" },
          { "value": "1000+", "label": "1000+ employees" }
        ]
      },
      {
        "id": "industry",
        "type": "radio",
        "label": "Industry",
        "required": true,
        "options": [
          { "value": "tech", "label": "Technology" },
          { "value": "healthcare", "label": "Healthcare" },
          { "value": "finance", "label": "Finance" },
          { "value": "retail", "label": "Retail" },
          { "value": "other", "label": "Other" }
        ]
      },
      {
        "id": "timeline",
        "type": "select",
        "label": "Project Timeline",
        "required": true,
        "options": [
          { "value": "immediate", "label": "Immediate (within 1 month)" },
          { "value": "short", "label": "Short-term (1-3 months)" },
          { "value": "medium", "label": "Medium-term (3-6 months)" },
          { "value": "long", "label": "Long-term (6+ months)" }
        ]
      },
      {
        "id": "comments",
        "type": "textarea",
        "label": "Additional Comments",
        "placeholder": "Any other details you’d like to share...",
        "required": false
      }
    ]
  }`;

  useEffect(() => {
    setJson(JSON.parse(initialJsonData));
    setJsonText(initialJsonData);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newJsonText = e.target.value;
    setJsonText(newJsonText);

    try {
      const parsedJson = JSON.parse(newJsonText);
      setJson(parsedJson);
      setJsonError(null);
    } catch (error) {
      if (error instanceof Error) {
        setJsonError(`Invalid JSON: ${error.message}`);
        setJson(null);
      } else {
        setJsonError("An unexpected error occurred while parsing JSON.");
        setJson(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSuccess("Form Submitted Successfully","success");
    console.log("Form Data:", formData);
  };

  const handleReset = () => {
    setFormData({});
  };

  const handleDownload = () => {
    handleSuccess("Downloading...","success");
    const dataToDownload = JSON.stringify(formData, null, 2);
    const blob = new Blob([dataToDownload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "form_data.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 p-6 w-full">
      {/* Side-by-side Layout */}
      {/* <div className="flex flex-wrap w-full max-w-screen-xl mx-auto space-x-8 flex-1"> */}
      <div className="flex flex-col md:flex-row justify-between p-4">
        {/* JSON Editor */}
        <div className="w-full md:w-1/2 bg-blue-200 p-2 rounded-md shadow-md mb-4 md:mb-0 md:mr-2">
          <h2 className="text-3xl font-bold mb-2 dark:text-white">
            JSON Editor
          </h2>
          <textarea
            value={jsonText}
            onChange={handleJsonChange}
            rows={20}
            className="w-full p-4 border border-gray-300 rounded-md resize-none text-xl dark:bg-gray-700 dark:text-white"
          ></textarea>
          {jsonError && (
            <div className="mt-4 text-red-500 bg-red-100 p-2 rounded-md">
              <strong>Error:</strong> {jsonError}
            </div>
          )}
        </div>

        {/* Form Preview */}
        <div className="w-full max-h-[90vh] md:w-1/2 bg-green-200 p-2 rounded-md shadow-md">
          {json ? (
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 space-y-4 dark:bg-gray-700 dark:text-white"
            >
              <h1 className="text-2xl font-bold mb-4">{json.title}</h1>
              {json.fields.map((field: any) => (
                <FormField
                  key={field.id}
                  id={field.id}
                  type={field.type}
                  label={field.label}
                  placeholder={field.placeholder}
                  required={field.required}
                  options={field.options}
                  value={formData[field.id] || ""}
                  onChange={handleChange}
                  pattern={field.pattern}
                  validationMessage={field.validationMessage}
                />
              ))}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          ) : (
            jsonError && (
              <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <h1 className="text-2xl font-bold text-red-500">{jsonError}</h1>
              </div>
            )
          )}
        </div>
      </div>

      {/* Buttons at the Bottom */}
      <div className="flex space-x-4 justify-center bg-gray-100 dark:bg-gray-800 p-4 fixed bottom-0 w-full">
        <button
          onClick={() => setDark(!dark)}
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md dark:text-white"
        >
          Toggle Dark Mode
        </button>
        <button
          onClick={handleReset}
          className="p-2 bg-red-500 text-white rounded-md"
        >
          Reset
        </button>
        <button
          onClick={handleDownload}
          className="p-2 bg-green-500 text-white rounded-md"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
};

export default Form;
