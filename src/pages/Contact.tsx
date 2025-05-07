
import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { AuthContext } from "../App";

const Contact: React.FC = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen w-full">
      {/* Navigation Bar */}
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="relative mx-auto max-w-[1524px] py-12">
        {/* Heading */}
        <div className="mb-12 bg-[url('/blue-shape.svg')] bg-cover py-6 px-4">
          <h1 className="text-5xl font-bold font-cairo text-slate-800 ml-[396px]">
            Contact Us
          </h1>
        </div>

        {/* Contact profiles container */}
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Dan Steven R. Leonardo */}
          <div className="flex items-center gap-8">
            <div className="w-[200px] h-[200px] rounded-full bg-[#FFFFFF] overflow-hidden flex-shrink-0">
              {/* Profile image placeholder */}
            </div>
            <div>
              <h2 className="font-bold text-[#0b294b] text-4xl font-cairo mb-4">
                Dan Steven R. Leonardo
              </h2>
              <p className="text-[#0b294b] text-lg leading-relaxed font-cairo">
                <strong>Gmail:</strong> leonardo.dansteven04@gmail.com<br />
                <strong>Contact No:</strong> +63 951 939 3066<br />
                <strong>Blog:</strong> http://www.tumblr.com/systemforge
              </p>
            </div>
          </div>

          {/* Denver Jay B. Palabon */}
          <div className="flex items-center gap-8 flex-row-reverse">
            <div className="w-[200px] h-[200px] rounded-full bg-[#FFFFFF] overflow-hidden flex-shrink-0">
              {/* Profile image placeholder */}
            </div>
            <div className="text-right">
              <h2 className="font-bold text-[#0b294b] text-4xl font-cairo mb-4">
                Denver Jay B. Palabon
              </h2>
              <p className="text-[#0b294b] text-lg leading-relaxed font-cairo">
                <strong>Gmail:</strong> palabon.denverjay@gmail.com<br />
                <strong>Contact No:</strong> +63 975 909 0034<br />
                <strong>Blog:</strong> https://www.tumblr.com/blog/gymprojectsystem
              </p>
            </div>
          </div>

          {/* Jelord G. Seguis */}
          <div className="flex items-center gap-8">
            <div className="w-[200px] h-[200px] rounded-full bg-[#FFFFFF] overflow-hidden flex-shrink-0">
              {/* Profile image placeholder */}
            </div>
            <div>
              <h2 className="font-bold text-[#0b294b] text-4xl font-cairo mb-4">
                Jelord G. Seguis
              </h2>
              <p className="text-[#0b294b] text-lg leading-relaxed font-cairo">
                <strong>Gmail:</strong> seguisjelord@gmail.com<br />
                <strong>Contact No:</strong> +63 963 956 8548
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
