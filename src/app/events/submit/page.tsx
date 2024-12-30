"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import { Toast } from "@/components/ui/toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { EventFormSchema } from "@/lib/validations/event";
import "react-datepicker/dist/react-datepicker.css";

export default function SubmitEvent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    category: "",
    address: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      const formValues = {
        ...formData,
        image: imageFile,
      };

      const validatedData = EventFormSchema.parse(formValues);

      // Upload image
      const imageUrl = await uploadToCloudinary(imageFile!);

      // Submit event data
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validatedData,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit event");
      }

      setSuccess("Event submitted successfully!");
      setTimeout(() => {
        router.push("/events");
      }, 2000);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Submit New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Event Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded h-32"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) =>
              setFormData({ ...formData, date: date || new Date() })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="cultural">Cultural</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="food">Food & Drink</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2">Address</label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Event Image</label>
          <div className="border-2 border-dashed rounded-lg p-4 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
              id="image-upload"
              required
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <Upload className="w-8 h-8 mb-2" />
              <span>
                {imageFile ? imageFile.name : "Click to upload image"}
              </span>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Event"}
        </button>
      </form>
      {error && (
        <Toast message={error} type="error" onClose={() => setError(null)} />
      )}
      {success && (
        <Toast
          message={success}
          type="success"
          onClose={() => setSuccess(null)}
        />
      )}
    </div>
  );
}
