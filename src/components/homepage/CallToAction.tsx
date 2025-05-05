import React from "react";

interface CallToActionProps {
  title: string;
  buttonText: string;
  imageSrc: string;
}

const CallToAction: React.FC<CallToActionProps> = ({
  title,
  buttonText,
  imageSrc,
}) => {
  return (
    <section className="bg-white flex w-full flex-col overflow-hidden items-center justify-center px-[70px] py-[216px] max-md:max-w-full max-md:px-5 max-md:py-[100px]">
      <div className="mb-[-46px] w-full max-w-[1476px] ml-[25px] max-md:max-w-full max-md:mb-2.5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          <div className="w-[44%] max-md:w-full max-md:ml-0">
            <div className="flex flex-col self-stretch items-stretch text-center my-auto max-md:max-w-full max-md:mt-10">
              <h2 className="text-[rgba(11,41,75,1)] text-5xl font-bold max-md:max-w-full max-md:text-[40px]">
                {title}
              </h2>
              <button className="bg-[rgba(11,41,75,1)] self-center w-[270px] max-w-full text-[32px] text-white font-medium mt-9 px-[52px] py-6 rounded-[10px] max-md:px-5">
                {buttonText}
              </button>
            </div>
          </div>
          <div className="w-[56%] ml-5 max-md:w-full max-md:ml-0">
            <img
              src={imageSrc}
              alt="Call to action"
              className="aspect-[1.85] object-contain w-full grow rounded-[25px] max-md:max-w-full max-md:mt-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;