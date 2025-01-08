export default function FestivalsPage() {
  const festivals = [
    {
      id: 1,
      title: "Tori Cultural Festival",
      description: "Annual celebration of local traditions, music, and dance.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736245948/festival_gx1kai.jpg",
      date: "July 15-17, 2024",
      location: "Tori City Center",
      highlights: [
        "Traditional Dance",
        "Live Music",
        "Food Stalls",
        "Craft Market",
      ],
      admission: "Free",
    },
    {
      id: 2,
      title: "Beach Music Festival",
      description: "Three days of music and entertainment by the beach.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736246117/dance_vfwkuh.jpg",
      date: "August 5-7, 2024",
      location: "Sunset Bay",
      highlights: ["Live Bands", "DJ Sets", "Beach Activities", "Food Vendors"],
      admission: "$30",
    },
    {
      id: 3,
      title: "Harvest Festival",
      description: "Celebration of local agriculture and traditional farming.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736246225/harvest_u0mr69.jpg",
      date: "September 20-22, 2024",
      location: "Tori Farmlands",
      highlights: [
        "Farming Demos",
        "Local Produce",
        "Traditional Games",
        "Cultural Shows",
      ],
      admission: "$10",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">
          Festivals & Events
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {festivals.map((festival) => (
            <div
              key={festival.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={festival.image}
                  alt={festival.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{festival.title}</h3>
                <p className="text-gray-600 mb-4">{festival.description}</p>
                <div className="space-y-3">
                  <p className="text-sm text-gray-500">📅 {festival.date}</p>
                  <p className="text-sm text-gray-500">
                    📍 {festival.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    💰 Admission: {festival.admission}
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Highlights:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {festival.highlights.map((item) => (
                        <span
                          key={item}
                          className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
