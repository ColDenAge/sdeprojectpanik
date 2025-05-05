
import React from "react";
import Navbar from "@/components/homepage/Navbar";

const AboutUs: React.FC = () => {
  return (
    <main className="flex flex-col min-h-screen bg-[#D9D9D9]">
      <div className="px-5 md:px-20 pt-[9px]">
        <Navbar />
      </div>

      <div className="flex flex-col items-center px-5 max-w-[1152px] mx-auto w-full pt-12 pb-24">
        <h1 className="text-slate-800 text-5xl font-bold tracking-wide mb-6 text-center">
          About ByteMinds Systems
        </h1>
        <p className="text-black text-base font-medium leading-6 mb-16 text-center max-w-[810px]">
          Learn more about our company, mission, and the team behind our innovative gym management software.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1000px]">
          <div className="flex flex-col">
            <h2 className="text-slate-800 text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-black text-base font-medium leading-6 mb-6">
              ByteMinds Systems was founded in 2019 by a team of fitness enthusiasts and software engineers who saw a need for better technology solutions in the fitness industry. What started as a simple check-in system for a local gym has evolved into a comprehensive management platform used by fitness centers worldwide.
            </p>
            <p className="text-black text-base font-medium leading-6">
              Our journey began with a simple mission: to help gym owners focus on what they do best—creating great fitness experiences—while we handle the complex technology that powers their business operations.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-[400px]">
              <img 
                src="https://placehold.co/400x250/e2e8f0/1e293b?text=Our+Story" 
                alt="ByteMinds Systems story" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
        </div>
        
        <div className="w-full max-w-[1000px] h-px bg-gray-300 my-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[1000px]">
          <div className="flex items-center justify-center md:order-1 order-2">
            <div className="bg-white rounded-lg shadow-md p-6 max-w-[400px]">
              <img 
                src="https://placehold.co/400x250/e2e8f0/1e293b?text=Our+Mission" 
                alt="ByteMinds Systems mission" 
                className="w-full h-auto rounded"
              />
            </div>
          </div>
          <div className="flex flex-col md:order-2 order-1">
            <h2 className="text-slate-800 text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-black text-base font-medium leading-6 mb-6">
              At ByteMinds Systems, we're committed to revolutionizing how fitness businesses operate through intuitive, powerful software solutions that streamline operations and enhance member experiences.
            </p>
            <p className="text-black text-base font-medium leading-6">
              We believe that technology should empower gym owners and staff, not complicate their lives. That's why we focus on creating software that's both powerful and easy to use, with features designed specifically for the unique needs of the fitness industry.
            </p>
          </div>
        </div>
        
        <div className="w-full max-w-[1000px] h-px bg-gray-300 my-16"></div>
        
        <div className="w-full max-w-[1000px]">
          <h2 className="text-slate-800 text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-slate-800 text-xl font-bold mb-3">Innovation</h3>
              <p className="text-black text-base font-medium leading-6">
                We continuously push the boundaries of what's possible in gym management software, staying ahead of industry trends and technological advancements.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-slate-800 text-xl font-bold mb-3">Reliability</h3>
              <p className="text-black text-base font-medium leading-6">
                Our customers depend on our software every day to run their businesses. We take this responsibility seriously and build our systems with reliability as a top priority.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-slate-800 text-xl font-bold mb-3">Customer Focus</h3>
              <p className="text-black text-base font-medium leading-6">
                We listen to our users and develop solutions that address their real needs. Our success is measured by our customers' success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
