
// Mock data for the user's gym memberships
export const activeSubscriptions = [
  {
    id: 1,
    gymName: "FitLife Downtown",
    membershipType: "Premium",
    startDate: "Jan 15, 2023",
    nextPayment: "Jun 15, 2023",
    status: "Active",
    location: "Downtown",
    availablePlans: [
      { id: 1, name: "Standard", price: "$29.99/mo", current: false },
      { id: 2, name: "Premium", price: "$49.99/mo", current: true },
      { id: 3, name: "Premium Plus", price: "$69.99/mo", current: false }
    ]
  },
  {
    id: 2,
    gymName: "Elite Fitness Center",
    membershipType: "Standard",
    startDate: "Mar 10, 2023",
    nextPayment: "Jun 10, 2023",
    status: "Active",
    location: "Westside",
    availablePlans: [
      { id: 1, name: "Basic", price: "$19.99/mo", current: false },
      { id: 2, name: "Standard", price: "$39.99/mo", current: true },
      { id: 3, name: "Premium", price: "$59.99/mo", current: false }
    ]
  }
];

// Mock gym data for subscriptions
export const subscriptionGyms = [
  {
    id: 1,
    name: "FitLife Downtown",
    location: "Downtown",
    amenities: ["Pool", "Sauna", "24/7 Access", "Personal Training", "Group Classes"],
    membershipOptions: [
      { id: 1, name: "Standard", price: "$29.99/month" },
      { id: 2, name: "Premium", price: "$49.99/month" },
      { id: 3, name: "Premium Plus", price: "$69.99/month" }
    ],
    classes: [
      { id: 1, name: "Morning Yoga", instructor: "Jane Smith", schedule: "Mon, Wed, Fri 7:00 AM", capacity: 20, enrolled: 12 },
      { id: 2, name: "HIIT Challenge", instructor: "Mike Johnson", schedule: "Tue, Thu 6:00 PM", capacity: 15, enrolled: 10 },
      { id: 3, name: "Spin Class", instructor: "Sarah Williams", schedule: "Mon, Wed 5:30 PM", capacity: 12, enrolled: 8 }
    ]
  },
  {
    id: 2,
    name: "Elite Fitness Center",
    location: "Westside",
    amenities: ["Weight Room", "Cardio Theater", "Basketball Court", "Nutritional Counseling"],
    membershipOptions: [
      { id: 1, name: "Basic", price: "$19.99/month" },
      { id: 2, name: "Standard", price: "$39.99/month" },
      { id: 3, name: "Premium", price: "$59.99/month" }
    ],
    classes: [
      { id: 1, name: "Power Lifting", instructor: "Chris Peterson", schedule: "Tue, Thu, Sat 8:00 AM", capacity: 10, enrolled: 7 },
      { id: 2, name: "CrossFit", instructor: "Alex Turner", schedule: "Mon, Wed, Fri 6:00 PM", capacity: 12, enrolled: 11 },
      { id: 4, name: "Zumba", instructor: "Lisa Rodriguez", schedule: "Mon, Thu 7:00 PM", capacity: 25, enrolled: 18 }
    ]
  }
];
