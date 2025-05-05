
import React, { useContext } from "react";
import { AuthContext } from "../App";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Calendar, Users, Dumbbell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen w-full bg-background">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        <AuthNavbar />
      </div>

      <div className="mx-auto max-w-[1524px] py-8 px-6">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Dashboard
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0B294B]">Welcome, {userRole === "member" ? "Gym Member" : "Gym Manager"}</h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your {userRole === "member" ? "fitness journey" : "gym"} today.
          </p>
        </div>

        {/* Dashboard Content - Conditionally rendered based on role */}
        {userRole === "member" ? (
          // Member Dashboard
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Upcoming Classes
                </CardTitle>
                <Calendar className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">3</div>
                <p className="text-xs text-gray-600">Classes scheduled this week</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Workout Streak
                </CardTitle>
                <Dumbbell className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">8 days</div>
                <p className="text-xs text-gray-600">Keep it up!</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Fitness Goals
                </CardTitle>
                <BarChart className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">2/5</div>
                <p className="text-xs text-gray-600">Goals completed this month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Personal Trainers
                </CardTitle>
                <Users className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">5</div>
                <p className="text-xs text-gray-600">Available for booking</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Manager Dashboard
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Active Members
                </CardTitle>
                <Users className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">245</div>
                <p className="text-xs text-gray-600">7% increase from last month</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Class Attendance
                </CardTitle>
                <Calendar className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">89%</div>
                <p className="text-xs text-gray-600">Average attendance rate</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  Revenue
                </CardTitle>
                <BarChart className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">$24.5k</div>
                <p className="text-xs text-gray-600">Month to date</p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-[#0B294B]">
                  New Sign-ups
                </CardTitle>
                <Users className="h-4 w-4 text-[#0B294B]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#0B294B]">12</div>
                <p className="text-xs text-gray-600">In the last 7 days</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Additional Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#0B294B]">
                {userRole === "member" ? "Your Upcoming Classes" : "Scheduled Classes Today"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {userRole === "member" ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">Yoga Basics</h3>
                      <p className="text-sm text-gray-600">10:00 AM - 11:00 AM</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-[#0B294B] rounded text-xs">Booked</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">HIIT Workout</h3>
                      <p className="text-sm text-gray-600">2:00 PM - 3:00 PM</p>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-[#0B294B] rounded text-xs">Booked</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">Strength Training</h3>
                      <p className="text-sm text-gray-600">4:00 PM - 5:00 PM</p>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">Available</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">Morning Yoga</h3>
                      <p className="text-sm text-gray-600">7:00 AM - 8:00 AM</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">15 attendees</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">Spin Class</h3>
                      <p className="text-sm text-gray-600">12:00 PM - 1:00 PM</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">20 attendees</span>
                  </div>
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#0B294B]">Evening HIIT</h3>
                      <p className="text-sm text-gray-600">6:00 PM - 7:00 PM</p>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">8 attendees</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-[#0B294B]">
                {userRole === "member" ? "Quick Links" : "Quick Actions"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {userRole === "member" ? (
                  <>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Book a Class
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      View Schedule
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Update Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Track Progress
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Contact Support
                    </button>
                  </>
                ) : (
                  <>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Add New Class
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Manage Members
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Schedule Trainers
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      View Reports
                    </button>
                    <button className="w-full text-left px-4 py-2 text-[#0B294B] bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                      Billing & Payments
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
