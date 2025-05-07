
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

      <div className="relative mx-auto max-w-[1524px] h-[1154px]">
        {/* Dan Steven R. Leonardo */}
        <div className="absolute w-[853px] h-64 top-[198px] left-[396px] flex items-start gap-8">
          <div className="w-[255px] h-64 rounded-full bg-[#FFFFFF] overflow-hidden">
            {/* D9D9D9 circular shape instead of image */}
          </div>
          <div className="w-[569px] h-[221px] mt-1.5">
            <h2 className="font-bold text-[#0b294b] text-5xl font-cairo mb-2">
              Dan Steven R. Leonardo
            </h2>
            <p className="text-[#0b294b] text-xl leading-relaxed font-cairo">
              <strong>Gmail:</strong> leonardo.dansteven04@gmail.com<br />
              <strong>Contact No:</strong> +63 951 939 3066<br />
              <strong>Blog:</strong> http://www.tumblr.com/systemforge
            </p>
          </div>
        </div>

        {/* Denver Jay B. Palabon */}
        <div className="absolute w-[840px] h-64 top-[577px] left-[684px] flex items-start gap-8 flex-row-reverse">
          <div className="w-[255px] h-64 rounded-full bg-[#FFFFFF] overflow-hidden">
            {/* D9D9D9 circular shape instead of image */}
          </div>
          <div className="w-[569px] h-[206px] mt-[13px] text-right">
            <h2 className="font-bold text-[#0b294b] text-5xl font-cairo mb-2">
              Denver Jay B. Palabon
            </h2>
            <p className="text-[#0b294b] text-xl leading-relaxed font-cairo">
              <strong>Gmail:</strong> palabon.denverjay@gmail.com<br />
              <strong>Contact No:</strong> +63 975 909 0034<br />
              <strong>Blog:</strong> https://www.tumblr.com/blog/gymprojectsystem
            </p>
          </div>
        </div>

        {/* Jelord G. Seguis */}
        <div className="absolute w-[853px] h-64 top-[898px] left-[396px] flex items-start gap-8">
          <div className="w-[255px] h-64 rounded-full bg-[#FFFFFF] overflow-hidden">
            {/* D9D9D9 circular shape instead of image */}
          </div>
          <div className="w-[569px] h-[221px] mt-[17px]">
            <h2 className="font-bold text-[#0b294b] text-5xl font-cairo mb-2">
              Jelord G. Seguis
            </h2>
            <p className="text-[#0b294b] text-xl leading-relaxed font-cairo">
              <strong>Gmail:</strong> seguisjelord@gmail.com<br />
              <strong>Contact No:</strong> +63 963 956 8548
            </p>
          </div>
        </div>

        {/* Heading Shape */}
        <div className="absolute w-[856px] h-[127px] top-0 left-0 bg-[url('/blue-shape.svg')] bg-cover">
          <div className="absolute w-[339px] h-[89px] top-[18px] left-[396px] text-slate-800 font-bold text-5xl font-cairo">
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
