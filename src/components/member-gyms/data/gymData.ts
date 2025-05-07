
// Mock data for available gyms
export const availableGyms = [
  {
    id: 1,
    name: "FitLife Downtown",
    location: "123 Main St, Downtown",
    amenities: ["Pool", "Sauna", "24/7 Access", "Towel Service", "Locker Rooms"],
    membershipOptions: [
      { id: 1, name: "Standard", price: "$29.99/mo" },
      { id: 2, name: "Premium", price: "$49.99/mo" },
      { id: 3, name: "Premium Plus", price: "$69.99/mo" }
    ],
    classes: [
      { id: 1, name: "Yoga Basics", instructor: "Sarah Johnson", schedule: "Mon, Wed, Fri 6:00 PM", capacity: 20, enrolled: 15 },
      { id: 2, name: "HIIT Training", instructor: "Mike Thompson", schedule: "Tue, Thu 7:30 AM", capacity: 15, enrolled: 10 },
      { id: 3, name: "Spin Class", instructor: "Emily Davis", schedule: "Mon, Wed 5:30 PM", capacity: 25, enrolled: 20 }
    ]
  },
  {
    id: 2,
    name: "Elite Fitness Center",
    location: "456 Park Ave, Westside",
    amenities: ["Classes", "Personal Training", "Nutrition Counseling", "Protein Bar", "Massage Services"],
    membershipOptions: [
      { id: 1, name: "Basic", price: "$19.99/mo" },
      { id: 2, name: "Standard", price: "$39.99/mo" },
      { id: 3, name: "Premium", price: "$59.99/mo" }
    ],
    classes: [
      { id: 1, name: "CrossFit", instructor: "Chris Miller", schedule: "Mon, Wed, Fri 7:00 PM", capacity: 12, enrolled: 8 },
      { id: 2, name: "Pilates", instructor: "Lisa Wong", schedule: "Tue, Thu 9:00 AM", capacity: 15, enrolled: 12 }
    ]
  },
  {
    id: 3,
    name: "PowerLift Gym",
    location: "789 Strong Blvd, Eastside",
    amenities: ["Weightlifting", "Powerlifting Equipment", "Protein Bar", "24/7 Access", "Chalk Station"],
    membershipOptions: [
      { id: 1, name: "Monthly", price: "$34.99/mo" },
      { id: 2, name: "Quarterly", price: "$29.99/mo (billed quarterly)" },
      { id: 3, name: "Annual", price: "$24.99/mo (billed annually)" }
    ],
    classes: [
      { id: 1, name: "Powerlifting 101", instructor: "Mark Strong", schedule: "Mon, Wed 8:00 PM", capacity: 10, enrolled: 5 },
      { id: 2, name: "Olympic Lifting", instructor: "Jen Taylor", schedule: "Tue, Thu 6:30 PM", capacity: 8, enrolled: 6 }
    ]
  }
];

// Map gym IDs to the corresponding IDs in the manager view
export const gymIdMapping: Record<number, string> = {
  1: "1", // FitLife Downtown -> "1" in manager view
  2: "2", // Elite Fitness Center -> "2" in manager view
  3: "3", // PowerLift Gym -> "3" in manager view
};
