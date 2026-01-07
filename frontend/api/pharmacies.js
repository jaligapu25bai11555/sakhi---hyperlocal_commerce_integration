export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      name: "Apollo Pharmacy",
      lat: 12.9716,
      lng: 77.5946,
      delivery_time: "15 mins",
      categories: ["Menstrual Care", "Pain Relief", "Wellness"],
    },
    {
      id: 2,
      name: "MedPlus",
      lat: 12.975,
      lng: 77.6,
      delivery_time: "20 mins",
      categories: ["Pregnancy", "Baby Care", "Pain Relief"],
    },
    {
      id: 3,
      name: "Local Medical Store",
      lat: 12.969,
      lng: 77.59,
      delivery_time: "10 mins",
      categories: ["Menstrual Care", "Emergency"],
    },
  ]);
}
