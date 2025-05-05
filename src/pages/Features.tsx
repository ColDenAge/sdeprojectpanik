
import React from "react";

const Features: React.FC = () => {
  return (
    <main className="flex flex-col w-full">
      {/* Header section with blue background */}
      <div className="bg-[#0b294b] w-full py-8 relative">
        <div className="container mx-auto px-5">
          <h1 className="text-white text-4xl font-bold">Features</h1>
        </div>
        {/* Diagonal cut shape */}
        <div className="absolute bottom-0 right-0 w-full h-16 bg-white" 
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}></div>
      </div>

      {/* Memberships Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-5 max-w-5xl">
          <h2 className="text-[#0b294b] text-3xl font-bold mb-6">Memberships</h2>
          <p className="text-[#363b40] mb-4">
            In GymWatch, you can apply for memberships and programs to a gym establishment if they support the use of
            GymWatch as one of their tools. From there, you can watch promotions or activities created or enacted by the gym
            establishment. As a member, you can then monitor and track your billings and activities through an automated and
            systematic process.
          </p>
        </div>
      </section>

      {/* Billings Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-5 max-w-5xl">
          <h2 className="text-[#0b294b] text-3xl font-bold mb-6">Billings</h2>
          <p className="text-[#363b40] mb-4">
            Payments are automatically processed and systematic notifications regarding about the due deadlines are featured in
            GymWatch. This allows you to look and analyze your overall payments and information, seeing details about the
            programs you signed up for.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="w-full py-16 bg-white">
        <div className="container mx-auto px-5 max-w-5xl">
          <h2 className="text-[#0b294b] text-3xl font-bold mb-6">Booking</h2>
          <p className="text-[#363b40] mb-4">
            Arrange consultations and meetings with the established partners of the gym or have a meeting with the coaches that
            you wish to consult with for your physical fitness program.
          </p>
        </div>
      </section>

      {/* Management Section with gray background */}
      <section className="w-full py-16 bg-[#e1e1e1]">
        <div className="container mx-auto px-5 max-w-5xl">
          <h2 className="text-[#0b294b] text-3xl font-bold mb-6">Management</h2>
          <p className="text-[#363b40] mb-4">
            GymWatch supports the creation and management of businesses through using this tool to monitor and assess the
            members of your establishment. GymWatch allows you to communicate, oversee, and promote your growing business
            for more members.
          </p>
        </div>
        {/* Bottom diagonal shape */}
        <div className="relative h-20 mt-10">
          <div className="absolute bottom-0 right-0 w-full h-20 bg-white" 
            style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 0 0)" }}></div>
        </div>
      </section>
    </main>
  );
};

export default Features;
