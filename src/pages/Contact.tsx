import React from "react";
import image from "./image.png";
import profilePic1 from "./profile-pic1.png";
import profilePic3 from "./profile-pic3.png";

export const Box = (): JSX.Element => {
  return (
    <div className="relative w-[1524px] h-[1154px]">
      <div className="fixed w-[1524px] h-[1154px] top-0 left-0">
        {/* Dan Steven R. Leonardo */}
        <div className="absolute w-[853px] h-64 top-[198px] left-[396px]">
          <img className="absolute w-[255px] h-64 top-0 left-0" alt="Profile" src={profilePic1} />
          <div className="absolute w-[569px] h-[221px] top-1.5 left-72">
            <p className="w-[408px] top-[104px] left-0 absolute font-normal text-[#0b294b] text-xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              <span className="font-bold">Gmail:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">leonardo.dansteven04@gmail.com<br /></span>
              <span className="font-bold">Contact No:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">+63 951 939 3066<br /></span>
              <span className="font-bold">Blog:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">http://www.tumblr.com/systemforge</span>
            </p>
            <div className="absolute w-[565px] h-[89px] top-0 left-0 font-bold text-[#0b294b] text-5xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              Dan Steven R. Leonardo
            </div>
          </div>
        </div>

        {/* Denver Jay B. Palabon */}
        <div className="absolute w-[840px] h-64 top-[577px] left-[684px]">
          <img className="absolute w-[255px] h-64 top-0 left-[585px]" alt="Profile" src={image} />
          <div className="absolute w-[569px] h-[206px] top-[13px] left-0">
            <p className="w-[484px] top-[89px] left-[81px] text-right absolute font-normal text-[#0b294b] text-xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              <span className="font-bold">Gmail:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">palabon.denverjay@gmail.com<br /></span>
              <span className="font-bold">Contact No:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">+63 975 909 0034<br /></span>
              <span className="font-bold">Blog:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">https://www.tumblr.com/blog/gymprojectsystem</span>
            </p>
            <div className="text-right absolute w-[565px] h-[89px] top-0 left-0 font-bold text-[#0b294b] text-5xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              Denver Jay B. Palabon
            </div>
          </div>
        </div>

        {/* Jelord G. Seguis */}
        <div className="absolute w-[853px] h-64 top-[898px] left-[396px]">
          <img className="absolute w-[255px] h-64 top-0 left-0" alt="Profile" src={profilePic3} />
          <div className="absolute w-[569px] h-[221px] top-[17px] left-72">
            <p className="w-[408px] top-[104px] left-0 absolute font-normal text-[#0b294b] text-xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              <span className="font-bold">Gmail:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">seguisjelord@gmail.com<br /></span>
              <span className="font-bold">Contact No:</span>{" "}
              <span className="font-[Cairo-Regular,Helvetica]">+63 963 956 8548</span>
            </p>
            <div className="absolute w-[565px] h-[89px] top-0 left-0 font-bold text-[#0b294b] text-5xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
              Jelord G. Seguis
            </div>
          </div>
        </div>

        {/* Heading Shape */}
        <div className="absolute w-[756px] h-[127px] top-0 left-0 bg-[url('/blue-shape.svg')] bg-[100%_100%]">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] font-bold text-white text-5xl leading-normal tracking-[0] font-[Cairo-Bold,Helvetica]">
            Contact Us
          </div>
        </div>
      </div>
    </div>
  );
};
