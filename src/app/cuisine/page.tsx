export default function CuisinePage() {
  const localCuisine = [
    {
      id: 1,
      title: "Tori Traditional Restaurant",
      description:
        "Experience authentic local flavors and traditional cooking methods.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736244760/restau_ngdivp.jpg",
      specialties: ["Seafood Curry", "Coconut Rice", "Local Spices"],
      location: "Central Tori",
      priceRange: "$$",
      hours: "11:00 AM - 10:00 PM",
    },
    {
      id: 2,
      title: "Beachside Grill",
      description: "Fresh seafood grilled to perfection with ocean views.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736244984/beachside_nnltey.jpg",
      specialties: ["Grilled Fish", "Prawn Curry", "Local Herbs"],
      location: "South Beach",
      priceRange: "$$$",
      hours: "12:00 PM - 11:00 PM",
    },
    {
      id: 3,
      title: "Market Food Court",
      description:
        "Local street food and traditional snacks in a vibrant setting.",
      image:
        "https://res.cloudinary.com/dywd8r6rd/image/upload/v1736245807/market_kma1gh.jpg",
      specialties: ["Street Food", "Local Desserts", "Fresh Juices"],
      location: "Tori Market",
      priceRange: "$",
      hours: "8:00 AM - 8:00 PM",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Local Cuisine</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localCuisine.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{place.title}</h3>
                  <span className="text-gray-600">{place.priceRange}</span>
                </div>
                <p className="text-gray-600 mb-4">{place.description}</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Specialties:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {place.specialties.map((item) => (
                        <span
                          key={item}
                          className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">📍 {place.location}</p>
                  <p className="text-sm text-gray-500">🕒 {place.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
