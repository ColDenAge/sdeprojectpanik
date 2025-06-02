import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { RoleContext } from "../router/App";

const Members = () => {
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  const teamMembers = [
    {
      name: "Dan Steven R. Leonardo",
      role: "Lead Developer",
      email: "leonardo.dansteven04@gmail.com",
      phone: "+63 951 939 3066",
      blog: "http://www.tumblr.com/systemforge"
    },
    {
      name: "Denver Jay B. Palabon",
      role: "UI/UX Designer",
      email: "palabon.denverjay@gmail.com",
      phone: "+63 975 909 0034",
      blog: "https://www.tumblr.com/blog/gymprojectsystem"
    },
    {
      name: "Jelord G. Seguis",
      role: "Backend Developer",
      email: "seguisjelord@gmail.com",
      phone: "+63 963 956 8548"
    }
  ];

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Our Team
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="space-y-16">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex items-center gap-8">
                <div className="w-[200px] h-[200px] rounded-full bg-[#FFFFFF] overflow-hidden flex-shrink-0">
                  {/* Profile image placeholder */}
                </div>
                <div>
                  <h2 className="font-bold text-[#0b294b] text-4xl font-cairo mb-4">
                    {member.name || member.email || 'Unknown Member'}
                  </h2>
                  <p className="text-[#0b294b] text-lg leading-relaxed font-cairo">
                    <strong>Role:</strong> {member.role}<br />
                    <strong>Email:</strong> {member.email}<br />
                    <strong>Phone:</strong> {member.phone}<br />
                    {member.blog && (
                      <>
                        <strong>Blog:</strong> {member.blog}
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;
