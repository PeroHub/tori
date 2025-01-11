"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const highlights = [
  {
    title: "The Great Ibeno Beach",
    description:
      "Experience Nigeria's longest beach with pristine sands stretching over 45km along the Atlantic coast.",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736572600/b_jqssvt.jpg",
    link: "",
  },
  {
    title: "Rich Cultural Heritage",
    description:
      "Discover the vibrant traditions of the Ibibio, Annang, and Oron people through festivals and ceremonies.",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735566693/cul_cdl8a9.jpg",
    link: "",
  },
  {
    title: "Sustainable Tourism",
    description:
      "Supporting local communities and preserving our cultural heritage through responsible tourism practices.",
    image:
      "https://res.cloudinary.com/dywd8r6rd/image/upload/v1735566893/sha_xszukm.jpg",
    link: "",
  },
];

export function Highlights() {
  return (
    <section className="py-20 mt-20">
      {highlights.map((highlight, index) => (
        <motion.div
          key={highlight.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={`max-w-7xl mx-auto px-4 mb-20 last:mb-0 ${
            index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
          } flex flex-col lg:flex-row items-center gap-12`}
        >
          <div className="lg:w-1/2">
            <Image
              src={highlight.image}
              alt={highlight.title}
              width={400}
              height={400}
              className="w-full h-[400px] object-cover rounded-lg"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">{highlight.title}</h2>
            <p className="text-lg text-gray-600">{highlight.description}</p>
            <Link
              href={highlight.link}
              className="inline-flex items-center text-primary hover:text-primary/80 transition"
            >
              Learn More <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
