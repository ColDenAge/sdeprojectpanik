
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ContactSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Support</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-8">
          {/* Dan Steven R. Leonardo */}
          <div className="flex items-center gap-8">
            <div className="w-[150px] h-[150px] rounded-full bg-[#FFFFFF] overflow-hidden shrink-0">
              {/* Placeholder for profile image */}
            </div>
            <div>
              <h2 className="font-bold text-[#0b294b] text-3xl font-cairo mb-2">
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
            <div className="w-[150px] h-[150px] rounded-full bg-[#FFFFFF] overflow-hidden shrink-0">
              {/* Placeholder for profile image */}
            </div>
            <div className="text-right">
              <h2 className="font-bold text-[#0b294b] text-3xl font-cairo mb-2">
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
            <div className="w-[150px] h-[150px] rounded-full bg-[#FFFFFF] overflow-hidden shrink-0">
              {/* Placeholder for profile image */}
            </div>
            <div>
              <h2 className="font-bold text-[#0b294b] text-3xl font-cairo mb-2">
                Jelord G. Seguis
              </h2>
              <p className="text-[#0b294b] text-lg leading-relaxed font-cairo">
                <strong>Gmail:</strong> seguisjelord@gmail.com<br />
                <strong>Contact No:</strong> +63 963 956 8548
              </p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link to="/contact" className="inline-block bg-[#0B294B] text-white px-6 py-2 rounded-lg hover:bg-[#0a2544] transition-colors">
              View Contact Page
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSection;
