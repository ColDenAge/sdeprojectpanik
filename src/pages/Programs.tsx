
import React from "react";
import Navbar from "@/components/homepage/Navbar";

const Programs: React.FC = () => {
  return (
    <main className="bg-white flex flex-col overflow-hidden items-stretch text-[rgba(11,41,75,1)]">
      <header className="flex flex-col relative z-10 w-full text-white pt-[9px] px-20 max-md:max-w-full max-md:px-5 bg-[rgba(66,73,81,1)]">
        <div className="relative z-10 mb-8 w-full max-w-[1587px] max-md:max-w-full">
          <Navbar />
        </div>
      </header>

      <section className="flex w-full flex-col px-16 py-12 max-md:max-w-full max-md:px-5">
        <div className="self-center flex w-full max-w-[1440px] items-stretch justify-between gap-5 max-md:max-w-full max-md:flex-wrap">
          <h1 className="text-4xl font-bold my-auto">Our Programs</h1>
          <div className="flex items-stretch gap-4">
            <div className="text-lg font-medium rounded-lg shadow-sm bg-[rgba(11,41,75,1)] text-white justify-center px-8 py-4">
              Weight Lifting
            </div>
            <div className="text-lg font-medium rounded-lg shadow-sm text-[rgba(11,41,75,1)] bg-slate-100 justify-center px-8 py-4">
              Cardio
            </div>
            <div className="text-lg font-medium rounded-lg shadow-sm text-[rgba(11,41,75,1)] bg-slate-100 justify-center px-8 py-4">
              Yoga
            </div>
            <div className="text-lg font-medium rounded-lg shadow-sm text-[rgba(11,41,75,1)] bg-slate-100 justify-center px-8 py-4">
              Swimming
            </div>
          </div>
        </div>
      </section>

      <section className="self-center w-full max-w-[1440px] mt-8 px-16 max-md:px-5 max-md:max-w-full">
        <div className="flex justify-between items-start gap-8 max-md:flex-col">
          {/* Left sidebar */}
          <div className="flex flex-col w-64 gap-4 max-md:w-full">
            <div className="flex w-full flex-col rounded-xl bg-slate-100 p-6 gap-4">
              <h3 className="text-xl font-medium">Filter by</h3>
              
              <div>
                <h4 className="font-medium mb-2">Difficulty</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Beginner</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Intermediate</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Advanced</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Duration</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Under 30 minutes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>30-60 minutes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Over 60 minutes</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Equipment</h4>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>No equipment</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Basic equipment</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" />
                    <span>Full gym</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {/* Programs grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Program cards */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="flex flex-col rounded-xl overflow-hidden shadow-md border border-gray-100">
                <img 
                  src={`https://source.unsplash.com/random/400x300?weights&sig=${item}`} 
                  alt="Program" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">Intermediate</span>
                    <span className="text-sm text-gray-600">45 min</span>
                  </div>
                  <h3 className="text-lg font-bold">Power Lifting {item}</h3>
                  <p className="text-sm text-gray-600">Build strength with our comprehensive power lifting program designed for intermediate lifters.</p>
                  <button className="mt-2 bg-[rgba(11,41,75,1)] text-white py-2 rounded-lg">View Program</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pagination */}
      <div className="self-center flex items-center gap-2 mt-12 mb-16">
        <button className="px-4 py-2 border rounded-md bg-slate-100">Previous</button>
        <button className="px-4 py-2 border rounded-md bg-[rgba(11,41,75,1)] text-white">1</button>
        <button className="px-4 py-2 border rounded-md">2</button>
        <button className="px-4 py-2 border rounded-md">3</button>
        <button className="px-4 py-2 border rounded-md bg-slate-100">Next</button>
      </div>
    </main>
  );
};

export default Programs;
