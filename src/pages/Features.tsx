
import React from "react";

const Features: React.FC = () => {
  return (
    <main className="flex flex-col">
      <section className="self-stretch flex w-full flex-col pb-12 px-5 max-md:max-w-full">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/08fb69fc4650a253be7a8b603dd962e67ad927fb?placeholderIfAbsent=true"
          className="aspect-[1.43] object-contain object-center w-full overflow-hidden self-stretch max-md:max-w-full"
          alt="Features header"
        />
        <div className="self-center flex mb-0 w-[1005px] max-w-full flex-col mt-24 px-5 max-md:mt-10">
          <header className="text-black text-5xl font-semibold self-center whitespace-nowrap max-md:text-4xl">
            Features
          </header>
          <div className="text-slate-600 text-center text-lg self-center max-w-[636px] mt-7 max-md:max-w-full">
            A flawless blend of functionality and ease, designed for gym owners
            and fitness enthusiasts alike.
          </div>
          <div className="self-stretch mt-16 max-md:mt-10 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/0baa34b3211a9177b64b302aa06d9ff75675d700?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 justify-center items-center overflow-hidden max-w-full"
                      alt="User Management icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      User Management
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Efficiently handle member profiles, attendance tracking, and
                      membership levels with our intuitive user management system.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/e9d8c738505a09e59655a5aecda8832e972996e2?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Billing and Payments icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Billing & Payments
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Streamline payment processing with automated billing,
                      multiple payment methods, and detailed financial reporting.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/671d26103d7938c5bbec9cfc9e816f77dbd92ea8?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Class Scheduling icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Class Scheduling
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Create, manage, and monitor fitness classes with ease.
                      Members can book sessions directly through the platform.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch mt-10 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/15249c23329657eb8c59e5cf3d0d338ea8d1f703?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Performance Tracking icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Performance Tracking
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Monitor member progress with detailed metrics, goal setting,
                      and personalized workout histories.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/a4deeb2a9fdba7e83794f00e6454fec825b48fdc?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Communication Tools icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Communication Tools
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Stay connected with members through integrated messaging,
                      announcements, and automated notifications.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/3a5fcc02f5332cf23e0305901689cbfdeafe50d2?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Equipment Management icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Equipment Management
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Keep track of gym equipment inventory, maintenance schedules,
                      and utilization rates for optimal facility management.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch mt-10 max-md:max-w-full">
            <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div className="flex flex-col items-stretch w-[33%] max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/deaa98d0b7d9fd3ab5421f3f72980dfe6cfeb212?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Mobile Access icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Mobile Access
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Access your gym management system on the go with our
                      fully-responsive mobile interface for both staff and members.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/19123dd7708d808f177ddd9bcd1f91e63f92718e?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Reporting & Analytics icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Reporting & Analytics
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Gain valuable insights into your gym's performance with
                      comprehensive reporting tools and data visualization.
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch w-[33%] ml-5 max-md:w-full max-md:ml-0">
                <div className="border shadow-sm bg-white flex grow flex-col w-full pt-11 pb-10 px-5 rounded-2xl border-solid border-zinc-200 max-md:mt-6">
                  <div className="flex flex-col pl-4 items-start max-md:pl-2.5">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/cfc59f2c2ec4490aae7dd5de34132da2/77cf0707c5e7ae31d457ee3232abf129f1431229?placeholderIfAbsent=true"
                      className="aspect-square object-contain object-center w-14 overflow-hidden self-start max-w-full"
                      alt="Access Control icon"
                    />
                    <div className="self-stretch text-slate-700 text-2xl font-semibold mt-7">
                      Access Control
                    </div>
                    <div className="self-stretch text-slate-600 text-base mt-5">
                      Secure your facility with integrated access control systems,
                      including keycards, biometric options, and QR code check-ins.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Features;
