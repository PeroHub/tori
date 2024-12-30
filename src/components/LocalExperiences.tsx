"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";

const experiences = [
  {
    title: "Mbre Cultural Dance Workshop",
    description:
      "Learn the graceful movements of Mbre, the traditional dance of Akwa Ibom, performed during important ceremonies and celebrations",
    location: "Ibom Unity Park, Uyo",
    date: "Every Saturday",
    participants: "10-15 people",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567702/mbre_cuf1uo.jpg",
  },
  {
    title: "Traditional Pottery Making",
    description:
      "Join local artisans in Ikot Ebom Itam to learn the ancient art of pottery making, passed down through generations",
    location: "Ikot Ebom Itam Pottery Village",
    date: "Weekdays",
    participants: "5-8 people",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567855/pottry_r6grhx.jpg",
  },
  {
    title: "Ibibio Cultural Experience",
    description:
      "Immerse yourself in Ibibio traditions, including language lessons, traditional attire wearing, and storytelling",
    location: "Ibibio Unity Museum, Uyo",
    date: "Thursdays and Fridays",
    participants: "8-12 people",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735567997/kulture_ewapem.jpg",
  },
];

export function LocalExperiences() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Local Experiences
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Participate in authentic cultural activities and workshops
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <div className="h-48">
                <img
                  src={experience.image}
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xl font-semibold mb-3">
                  {experience.title}
                </h3>
                <p className="text-gray-600 mb-4">{experience.description}</p>
                <div className="space-y-2 mt-auto">
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{experience.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{experience.date}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{experience.participants}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
