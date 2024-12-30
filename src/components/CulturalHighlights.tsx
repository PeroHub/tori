"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Ekpo Masquerade Festival",
    description:
      "Experience the mystical Ekpo masquerade performances, a traditional display of spiritual and cultural heritage",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567173/ekpo_b2t4dh.jpg",
  },
  {
    title: "Akwa Ibom Cuisine",
    description:
      "Savor local delicacies like Afang soup, Edikan Ikong, and fresh seafood from our coastal regions",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567323/cuisine_oftrkj.jpg",
  },
  {
    title: "Raffia Craft Heritage",
    description:
      "Explore Ikot Ekpene, the Raffia City, known for its exquisite raffia crafts and traditional weaving",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567474/rafia_y8k0z8.jpg",
  },
];

export function CulturalHighlights() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Cultural Highlights
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Immerse yourself in the rich cultural heritage of Akwa Ibom
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <motion.div
              key={highlight.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={highlight.image}
                  alt={highlight.title}
                  className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">{highlight.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
