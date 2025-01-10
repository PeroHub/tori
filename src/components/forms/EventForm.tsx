"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2 } from "lucide-react";
import DatePicker from "react-datepicker";
import { Toast } from "@/components/ui/toast";
import { uploadToCloudinary } from "@/lib/cloudinary";
import "react-datepicker/dist/react-datepicker.css";

export function EventForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    category: "",
    location: {
      address: "",
      coordinates: {
        lat: 5.033333, // Default to Uyo coordinates
        lng: 7.926667,
      },
    },
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!imageFile) {
        throw new Error("Please select an image");
      }

      // Upload image to Cloudinary
      let imageUrl;
      try {
        imageUrl = await uploadToCloudinary(imageFile);
        if (!imageUrl) {
          throw new Error("Failed to get image URL");
        }
      } catch (uploadError) {
        console.error("Image upload error:", uploadError);
        throw new Error(
          "Failed to upload image. Please try again with a different image."
        );
      }

      // Prepare event data
      let eventData = {
        title: formData.title,
        description: formData.description,
        date: formData.date,
        category: formData.category,
        image: imageUrl,
        location: {
          address: formData.location.address,
          coordinates: {
            lat: formData.location.coordinates.lat,
            lng: formData.location.coordinates.lng,
          },
        },
      };

      const dbData = {
        ...eventData,
        status: "pending",
      };

      // Submit event data
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit event");
      }

      setSuccess("Event submitted successfully! Awaiting approval.");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Submission error:", error);
      setError(
        error instanceof Error ? error.message : "Failed to submit event"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Event Title</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Event Date</label>
        <DatePicker
          selected={formData.date}
          onChange={(date) =>
            setFormData({ ...formData, date: date || new Date() })
          }
          className="w-full p-2 border rounded-lg"
          minDate={new Date()}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Category</label>
        <select
          required
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select a category</option>
          <option value="cultural">Cultural</option>
          <option value="sports">Sports</option>
          <option value="music">Music</option>
          <option value="food">Food & Drink</option>
          <option value="technology">Technology</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Venue Address</label>
        <input
          type="text"
          required
          value={formData.location.address}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: {
                ...formData.location,
                address: e.target.value,
              },
            })
          }
          placeholder="Enter venue address"
          className="w-full p-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Event Image</label>
        <div className="border-2 border-dashed rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center cursor-pointer"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">
                  Click to upload image
                </span>
              </>
            )}
          </label>
          {imageFile && !imagePreview && (
            <p className="mt-2 text-sm text-gray-500">{imageFile.name}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Submitting...
          </span>
        ) : (
          "Submit Event"
        )}
      </button>

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
    </form>
  );
}
