import React from "react";

interface InfoBoxProps {
  title: string;
  description: string;
  imageSrc?: string;
  backgroundColor?: string;
  textColor?: string;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  description,
  imageSrc,
  backgroundColor = "rgba(217,217,217,1)",
  textColor = "rgba(11,41,75,1)",
}) => {
  return (
    <div
      className={`bg-[${backgroundColor}] self-center flex w-[1388px] max-w-full flex-col items-center text-[${textColor}] justify-center mt-[75px] px-20 py-[69px] rounded-[25px] max-md:mt-10 max-md:px-5`}
    >
      <div className="flex w-[826px] max-w-full flex-col">
        <h2 className="text-5xl font-bold max-md:max-w-full max-md:text-[40px]">
          {title}
        </h2>
        <p className="text-xl font-normal mt-[25px] max-md:max-w-full">
          {description}
        </p>
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="aspect-[2.35] object-contain w-full self-stretch mt-[45px] rounded-[25px] max-md:max-w-full max-md:mt-10"
          />
        )}
      </div>
    </div>
  );
};

export default InfoBox;