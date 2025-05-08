
import React from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  imageSecondary?: string;
  reversed?: boolean;
  backgroundColor?: string;
  textColor?: string;
  className?: string;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  imageSecondary,
  reversed = false,
  backgroundColor = "rgba(217,217,217,1)",
  textColor = "rgba(11,41,75,1)",
  className = "",
}) => {
  const textContent = (
    <div className={`flex flex-col self-stretch items-stretch text-[${textColor}] my-auto max-md:max-w-full max-md:mt-10`}>
      <h2 className="text-5xl font-bold max-md:max-w-full max-md:text-[40px]">
        {title}
      </h2>
      <p className="text-xl font-normal mt-[25px] max-md:max-w-full">
        {description}
      </p>
    </div>
  );

  const imageContent = (
    <div className="flex grow flex-col max-md:max-w-full max-md:mt-10">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="aspect-[2.35] object-contain w-[826px] z-10 max-w-full rounded-[25px]"
      />
      {imageSecondary && (
        <img
          src={imageSecondary}
          alt={`${imageAlt} secondary`}
          className="aspect-[2.5] object-contain w-[866px] max-w-full"
        />
      )}
    </div>
  );

  return (
    <section
      className={`bg-[${backgroundColor}] w-full overflow-hidden ${
        reversed ? "pr-20" : "pl-20"
      } pt-[229px] max-md:max-w-full max-md:${
        reversed ? "pr-5" : "pl-5"
      } max-md:pt-[100px] ${className}`}
    >
      <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
        {reversed ? (
          <>
            <div className="w-[58%] max-md:w-full max-md:ml-0">
              {imageContent}
            </div>
            <div className="w-[42%] ml-5 max-md:w-full max-md:ml-0">
              {textContent}
            </div>
          </>
        ) : (
          <>
            <div className="w-[41%] max-md:w-full max-md:ml-0">
              {textContent}
            </div>
            <div className="w-[59%] ml-5 max-md:w-full max-md:ml-0">
              {imageContent}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
