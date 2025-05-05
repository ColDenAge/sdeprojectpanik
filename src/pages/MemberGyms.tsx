
import React, { useContext } from "react";
import { AuthContext } from "../App";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Building2, 
  Clock, 
  Calendar, 
  Activity,
  MapPin,
  UserCheck,
  Users
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const MemberGyms = () => {
  const { userRole } = useContext(AuthContext);

  // Mock data for the user's gym memberships
  const activeSubscriptions = [
    {
      id: 1,
      gymName: "FitLife Downtown",
      membershipType: "Premium",
      startDate: "Jan 15, 2023",
      nextPayment: "Jun 15, 2023",
      status: "Active",
      location: "Downtown"
    },
    {
      id: 2,
      gymName: "Elite Fitness Center",
      membershipType: "Standard",
      startDate: "Mar 10, 2023",
      nextPayment: "Jun 10, 2023",
      status: "Active",
      location: "Westside"
    }
  ];

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      date: "May 3, 2023",
      activity: "Group Class: Yoga",
      location: "FitLife Downtown",
      duration: "60 min"
    },
    {
      id: 2,
      date: "May 2, 2023",
      activity: "Personal Training",
      location: "Elite Fitness Center",
      duration: "45 min"
    },
    {
      id: 3,
      date: "Apr 30, 2023",
      activity: "Gym Access",
      location: "FitLife Downtown",
      duration: "90 min"
    },
    {
      id: 4,
      date: "Apr 29, 2023",
      activity: "Group Class: HIIT",
      location: "Elite Fitness Center",
      duration: "45 min"
    }
  ];

  // Mock data for available gyms
  const availableGyms = [
    {
      id: 1,
      name: "FitLife Downtown",
      location: "123 Main St, Downtown",
      amenities: "Pool, Sauna, 24/7 Access",
      membershipOptions: "Standard, Premium, Premium Plus",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    {
      id: 2,
      name: "Elite Fitness Center",
      location: "456 Park Ave, Westside",
      amenities: "Classes, Personal Training, Nutrition Counseling",
      membershipOptions: "Basic, Standard, Premium",
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80"
    },
    {
      id: 3,
      name: "PowerLift Gym",
      location: "789 Strong Blvd, Eastside",
      amenities: "Weightlifting, Powerlifting Equipment, Protein Bar",
      membershipOptions: "Monthly, Quarterly, Annual",
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  ];

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Gyms</h1>
        <button className="bg-[#0B294B] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-[#0a2544] transition-colors">
          <MapPin className="h-5 w-5" />
          Find New Gyms
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Memberships</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Across 2 different gyms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activities</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">In the last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Class</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">May 6</div>
            <p className="text-xs text-muted-foreground">Yoga at FitLife Downtown</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Subscriptions */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Active Subscriptions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Gym</TableHead>
                  <TableHead>Membership</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Location</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeSubscriptions.map((subscription) => (
                  <TableRow key={subscription.id}>
                    <TableCell className="font-medium">{subscription.gymName}</TableCell>
                    <TableCell>{subscription.membershipType}</TableCell>
                    <TableCell>{subscription.startDate}</TableCell>
                    <TableCell>{subscription.nextPayment}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {subscription.status}
                      </span>
                    </TableCell>
                    <TableCell>{subscription.location}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card className="mb-8">
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activities
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Duration</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell>{activity.date}</TableCell>
                    <TableCell className="font-medium">{activity.activity}</TableCell>
                    <TableCell>{activity.location}</TableCell>
                    <TableCell>{activity.duration}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Available Gyms */}
      <Card>
        <CardHeader className="bg-muted/50">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Explore Available Gyms
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGyms.map((gym) => (
              <Card key={gym.id} className="overflow-hidden border border-border">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={gym.image} 
                    alt={gym.name} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="p-4">
                  <CardTitle className="text-lg">{gym.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {gym.location}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">AMENITIES</p>
                      <p className="text-sm">{gym.amenities}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">MEMBERSHIP OPTIONS</p>
                      <p className="text-sm">{gym.membershipOptions}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border flex justify-end">
                    <button className="text-[#0B294B] font-medium hover:underline">View Details</button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default MemberGyms;
