import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex w-[1197px] max-w-full flex-col ml-[69px] mt-[158px] max-md:mt-10">
      <h1 className="text-5xl font-normal max-md:text-[40px]">GymWatch</h1>
      <p className="text-[32px] font-medium mt-[27px] max-md:max-w-full">
        "Stay on the right track, keep your members back"
      </p>
      <p className="text-xl font-normal mt-6 max-md:max-w-full">
        Automated membership tracker service, membership management, membership
        enrollment, and marketing features.
      </p>
      <button className="bg-[rgba(11,41,75,1)] text-[32px] font-medium text-center ml-[114px] mt-11 px-[53px] py-6 rounded-[10px] max-md:ml-2.5 max-md:mt-10 max-md:px-5">
        Get Started
      </button>
      <div className="bg-[rgba(217,217,217,1)] flex w-[844px] max-w-full flex-col text-black mt-[230px] pt-[39px] pb-[69px] px-20 max-md:mt-10 max-md:px-5">
        <h2 className="text-[32px] font-medium">Gym Management Software</h2>
        <p className="text-xl font-normal mt-[15px] max-md:max-w-full">
          Perfect for both gym members and owners to monitor the activities and
          programs you need.
          <br />
          <br />
          Quick and easy to set-up to streamline the way you can run your gym
          and how can monitor your billing and program.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;