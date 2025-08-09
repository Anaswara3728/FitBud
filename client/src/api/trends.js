export const fetchTrends = async () => {
  // Simulated API response
  return [
    {
      id: 1,
      category: "Featured",
      title: "The Science of Sleep: How to Optimize Your Rest",
      summary: "Explore the latest research on sleep cycles and learn practical tips to improve your sleep quality for better health and performance.",
      time: "5 min read",
      image: "sleep.jpg",
    },
    {
      id: 2,
      category: "Nutrition",
      title: "Fuel Your Workouts: Pre and Post-Exercise Nutrition",
      summary: "Discover the best foods to eat before and after your workouts to maximize energy, enhance recovery, and support muscle growth.",
      image: "nutrition.jpeg",
    },
    {
      id: 3,
      category: "Nutrition",
      title: "The Ultimate Guide to Hydration: Beyond Water",
      summary: "Learn about the importance of hydration and explore various beverages and foods that help keep you hydrated.",
      image: "hydration.jpeg",
    },
    {
      id: 4,
      category: "Wellness",
      title: "Mindfulness for Stress Reduction: Techniques and Benefits",
      summary: "Explore mindfulness practices such as meditation and deep breathing to reduce stress and improve well-being.",
      image: "stress.jpeg",
    },
    {
      id: 5,
      category: "Wellness",
      title: "The Power of Positive Thinking: Cultivating a Growth Mindset",
      summary: "Learn how to shift your mindset towards positivity and resilience, fostering personal growth and overcoming challenges.",
      image: "growth.png",
    },
    {
      id: 6,
      category: "Health Studies",
      title: "New Study Reveals Benefits of Regular Exercise on Cognitive Function",
      summary: "A recent study highlights the positive impact of regular physical activity on memory, attention, and performance.",
      image: "brain.jpg",
    },
    {
      id: 7,
      category: "Health Studies",
      title: "Breakthrough in Understanding the Gut-Brain Connection",
      summary: "Researchers uncover new insights into how the gut microbiome influences brain health, mood, and behavior.",
      image: "gut.png",
    },
  ];
};
