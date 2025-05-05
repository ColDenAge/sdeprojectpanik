
import React from "react";
import Navbar from "@/components/homepage/Navbar";

const Features: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full px-5 max-w-[1194px] mx-auto mt-6">
        <Navbar />
      </div>
      <section className="flex flex-col items-stretch gap-5 max-w-full w-[1194px] mt-5 max-md:mt-10">
        <div className="text-slate-800 text-center text-5xl font-bold leading-[58px] tracking-wide self-center max-w-full w-[499px] mt-12 max-md:max-w-full max-md:text-4xl max-md:leading-10 max-md:mt-10">
          Features
        </div>
        <div className="text-stone-500 text-center text-base font-medium leading-6 self-center max-w-full w-[810px] mt-3.5 max-md:max-w-full">
          At ByteMinds Systems, we provide a comprehensive gym and fitness center management solution that streamlines your operations and enhances member satisfaction.
        </div>
        <div className="shadow-sm bg-white self-center flex w-[1098px] max-w-full items-center gap-5 mt-24 px-14 py-12 rounded-2xl max-md:flex-wrap max-md:mt-10 max-md:px-5">
          <div className="flex flex-col items-stretch max-md:max-w-full">
            <div className="text-slate-800 text-3xl font-bold tracking-wide max-md:max-w-full">
              Membership Management
            </div>
            <div className="text-stone-500 text-base font-medium leading-6 mt-2.5 max-md:max-w-full">
              Powerful membership management features that help you grow your business and keep members engaged.
            </div>
            <div className="mt-11 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/f4def0507e86acef0c6822ea8f8fb581a7afcb51?placeholderIfAbsent=true"
                      alt="Membership Lifecycle"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Membership Lifecycle
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Manage all aspects of membership from signup to renewal in one place.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/4e29922125736ce317257e6ac71e90db042c74fa?placeholderIfAbsent=true"
                      alt="Member Profiles"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Member Profiles
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Collect custom data, track progress, and manage member info efficiently.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/99c1860d3516b3024e21274609d5df20aa7da30f?placeholderIfAbsent=true"
                      alt="Access Control"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Access Control
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Secure entry system with card readers, QR codes, and biometric options.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-sm bg-white self-center flex w-[1098px] max-w-full items-center gap-5 mt-8 px-14 py-12 rounded-2xl max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col items-stretch max-md:max-w-full">
            <div className="text-slate-800 text-3xl font-bold tracking-wide max-md:max-w-full">
              Billing & Payments
            </div>
            <div className="text-stone-500 text-base font-medium leading-6 mt-2.5 max-md:max-w-full">
              Streamlined financial management to save time and reduce payment headaches.
            </div>
            <div className="mt-11 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/f8e0bb1d2f78de5ff4deefb324d61797e4a20880?placeholderIfAbsent=true"
                      alt="Recurring Billing"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Recurring Billing
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Automate subscription payments with flexible payment schedules.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/a371a749002d4efa449412d39c4be0e991660aff?placeholderIfAbsent=true"
                      alt="Payment Processing"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Payment Processing
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Secure processing for credit cards, bank transfers, and digital payments.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/597339dff7ccb32bc170be8841a8205aeda6fad5?placeholderIfAbsent=true"
                      alt="Financial Reporting"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Financial Reporting
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Generate detailed financial reports and track revenue metrics easily.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-sm bg-white self-center flex w-[1098px] max-w-full items-center gap-5 mt-8 px-14 py-12 rounded-2xl max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col items-stretch max-md:max-w-full">
            <div className="text-slate-800 text-3xl font-bold tracking-wide max-md:max-w-full">
              Booking & Scheduling
            </div>
            <div className="text-stone-500 text-base font-medium leading-6 mt-2.5 max-md:max-w-full">
              Efficient scheduling tools for classes, facilities, and personal training sessions.
            </div>
            <div className="mt-11 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/1a73d1b01cdf7ea4bba73b283b7234566131c55c?placeholderIfAbsent=true"
                      alt="Class Management"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Class Management
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Organize classes with flexible schedules, waitlists, and instructor assignments.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/ebc0d9cd07f69bc1c5242a29cca0e4810daf50f1?placeholderIfAbsent=true"
                      alt="Facility Booking"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Facility Booking
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Allow members to reserve courts, equipment, and rooms through online booking.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/4417b0117b913aebb1fce471d8aa30008c96b0a8?placeholderIfAbsent=true"
                      alt="PT Scheduling"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      PT Scheduling
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Coordinate trainer availability, client appointments, and session packages.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow-sm bg-white self-center flex w-[1098px] max-w-full items-center gap-5 mt-8 mb-24 px-14 py-12 rounded-2xl max-md:flex-wrap max-md:mb-10 max-md:px-5">
          <div className="flex flex-col items-stretch max-md:max-w-full">
            <div className="text-slate-800 text-3xl font-bold tracking-wide max-md:max-w-full">
              Business Management
            </div>
            <div className="text-stone-500 text-base font-medium leading-6 mt-2.5 max-md:max-w-full">
              Comprehensive tools to run your fitness business more efficiently.
            </div>
            <div className="mt-11 max-md:max-w-full max-md:mt-10">
              <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
                <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/01ede6b7c4df6018abd4c5f896e32c9ba5c7e22f?placeholderIfAbsent=true"
                      alt="Staff Management"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Staff Management
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Handle employee scheduling, permissions, and performance tracking.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/e5de1581409258136d3f46f3e739221799ee6377?placeholderIfAbsent=true"
                      alt="Reporting & Analytics"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Reporting & Analytics
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Data-driven insights on attendance, revenue, and business performance.
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                  <div className="flex flex-col items-center max-md:mt-10">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/daaadd35557446d9766ae81236fe87daaa464557?placeholderIfAbsent=true"
                      alt="Marketing Tools"
                      className="aspect-square object-contain object-center w-12 overflow-hidden"
                    />
                    <div className="text-slate-800 text-xl font-bold self-stretch mt-4">
                      Marketing Tools
                    </div>
                    <div className="text-stone-500 text-base font-medium leading-6 self-stretch mt-2">
                      Email campaigns, referral programs, and promotional tools to grow your business.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
