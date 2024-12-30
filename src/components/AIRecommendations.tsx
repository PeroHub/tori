"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface Recommendation {
  destination: string;
  reason: string;
  activities: string[];
}

export default function AIRecommendations() {
  const [preferences, setPreferences] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    if (!preferences.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8 text-center">
        AI Travel Recommendations
      </h2>
      <div className="max-w-3xl mx-auto">
        <textarea
          className="w-full p-4 border rounded-lg mb-4 h-32"
          placeholder="Describe your ideal vacation (e.g., 'I love nature, hiking, and local cuisine. Looking for a peaceful destination with moderate weather.')"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
        />
        <button
          onClick={getRecommendations}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-lg flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            "Get Personalized Recommendations"
          )}
        </button>

        <div className="mt-8 space-y-6">
          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{rec.destination}</h3>
              <p className="text-gray-600 mb-4">{rec.reason}</p>
              <div className="space-y-2">
                <h4 className="font-semibold">Suggested Activities:</h4>
                <ul className="list-disc list-inside">
                  {rec.activities.map((activity, idx) => (
                    <li key={idx} className="text-gray-600">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
