
import React from "react";

interface FeatureItem {
  title: string;
  description: string;
}

interface FeaturesGridProps {
  leftFeatures: FeatureItem[];
  rightTitle: string;
  rightDescription: string;
  rightImageSrc: string;
  className?: string;
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({
  leftFeatures,
  rightTitle,
  rightDescription,
  rightImageSrc,
  className = "",
}) => {
  return (
    <section className={`bg-[rgba(217,217,217,1)] flex w-full flex-col overflow-hidden items-stretch mt-[75px] pt-[150px] max-md:max-w-full max-md:mt-10 max-md:pt-[100px] ${className}`}>
      <div className="self-center z-10 w-full max-w-[1404px] max-md:max-w-full">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[45%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col items-stretch text-5xl text-[rgba(11,41,75,1)] font-bold max-md:max-w-full max-md:text-[40px] max-md:mt-10">
              {leftFeatures.map((feature, index) => (
                <React.Fragment key={index}>
                  <h2 className="max-md:text-[40px]">{feature.title}</h2>
                  <p className="text-xl font-normal mr-5 mt-[25px] max-md:max-w-full max-md:mr-2.5">
                    {feature.description}
                  </p>
                  {index < leftFeatures.length - 1 && (
                    <div className="mt-[86px] max-md:mt-10"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="w-[55%] ml-5 max-md:w-full max-md:ml-0">
            <div className="grow text-[rgba(11,41,75,1)] max-md:max-w-full max-md:mt-10">
              <div className="flex w-[558px] max-w-full flex-col items-stretch ml-4">
                <h2 className="text-5xl font-bold max-md:text-[40px]">
                  {rightTitle}
                </h2>
                <p className="text-xl font-normal mt-[35px] max-md:max-w-full">
                  {rightDescription}
                </p>
              </div>
              <img
                src={rightImageSrc}
                alt={rightTitle}
                className="aspect-[2.08] object-contain w-full mt-[102px] rounded-[25px] max-md:max-w-full max-md:mt-10"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex w-full flex-col text-[rgba(11,41,75,1)] pt-[27px] pb-[247px] px-20 max-md:max-w-full max-md:pb-[100px] max-md:px-5">
        <div className="mb-[-49px] w-[569px] max-w-full max-md:mb-2.5">
          <h2 className="text-5xl font-bold max-md:max-w-full max-md:text-[40px] max-md:mr-2.5">
            Monitor your subscriptions
          </h2>
          <p className="text-xl font-normal mt-[26px] max-md:max-w-full">
            See each and every single programs or gym subscription you've had.
            Track activities and events created by the gyms you've been
            subscribed to. In addition,{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
