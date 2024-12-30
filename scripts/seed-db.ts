const seedDatabase = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/seed", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to seed database");
    }

    const data = await response.json();
    console.log(data.message);
  } catch (error) {
    console.error("Error:", error);
  }
};

seedDatabase();
