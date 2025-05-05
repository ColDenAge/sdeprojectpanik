
import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

const Choice = (): JSX.Element => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);

  const handleChoice = (role: string) => {
    console.log(`User selected role: ${role}`);
    // In a real app, you would save this preference to a user profile
    // For now, we'll just log it and redirect back to home
    navigate("/");
  };

  return (
    <div className="min-h-screen w-full">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Choice
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#0B294B]">Choose Your Role</h2>
          <p className="text-[#0B294B] mt-2">
            Select whether you want to join as a gym member or manage a gym
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-center md:items-stretch max-w-4xl mx-auto">
          <Card className="w-full md:w-1/2 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#0B294B]">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-24 h-24 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0B294B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B294B] mb-2">Gym Member</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Sign up for gym memberships, book classes, track your progress, and connect with fitness professionals.
              </p>
              <Button 
                onClick={() => handleChoice("member")} 
                className="bg-[#0B294B] hover:bg-[#0a2544] mt-auto w-full"
              >
                Join as Member
              </Button>
            </CardContent>
          </Card>

          <Card className="w-full md:w-1/2 hover:shadow-xl transition-shadow border-2 border-transparent hover:border-[#0B294B]">
            <CardContent className="p-6 flex flex-col items-center text-center h-full">
              <div className="w-24 h-24 bg-[#E5DEFF] rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0B294B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0B294B] mb-2">Gym Manager</h3>
              <p className="text-gray-600 mb-6 flex-grow">
                Manage your gym, handle memberships, schedule classes, track attendance, and grow your fitness business.
              </p>
              <Button 
                onClick={() => handleChoice("manager")} 
                className="bg-[#0B294B] hover:bg-[#0a2544] mt-auto w-full"
              >
                Join as Manager
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Choice;
