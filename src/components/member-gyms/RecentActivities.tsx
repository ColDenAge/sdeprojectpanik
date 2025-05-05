
import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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

const RecentActivities = () => {
  return (
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
  );
};

export default RecentActivities;
