import React from "react";
import { AboutUsTab } from "./AboutUsTab";
import { ContactTab } from "./ContactTab";
import { FaqTab } from "./FaqTab";
import { HomeTab } from "./HomeTab";
import { Login } from "./Login";
import { SignUpComponent } from "./SignUpComponent";
import logo from "./logo.png";

export const NavBarPopup = (): JSX.Element => {
  return (
    <div className="relative w-[1920px] h-36 bg-[#d9d9d9]">
      <div className="absolute w-[1290px] h-[37px] top-[53px] left-[460px]">
        <SignUpComponent className="!absolute !left-[1151px] !top-0" />
        <Login className="!absolute !left-[960px] !top-[5px]" />
        <ContactTab className="!absolute !left-[765px] !top-[5px]" />
        <AboutUsTab className="!absolute !left-[574px] !top-[5px]" />
        <FaqTab className="!absolute !left-[383px] !top-[5px]" />
        <div className="h-7 top-[5px] left-48 absolute w-[139px]">
          <div className="absolute w-[139px] -top-px left-0 [font-family:'Fredoka-Regular',Helvetica] font-normal text-[#b42318] text-2xl text-center tracking-[0] leading-[normal] whitespace-nowrap">
            Features
          </div>
        </div>

        <HomeTab className="!absolute !left-0 !top-[5px]" />
      </div>

      <div className="absolute w-[337px] h-[126px] top-0 left-[72px]">
        <div className="relative w-[335px] h-[126px]">
          <div className="absolute w-[335px] top-[95px] left-0 [font-family:'Kode_Mono-Bold',Helvetica] font-bold text-black text-2xl text-center tracking-[0] leading-[normal]">
            ByteMinds Systems
          </div>

          <img
            className="absolute w-[104px] h-[104px] top-0 left-[116px] object-cover"
            alt="Logo"
            src={logo}
          />
        </div>
      </div>
    </div>
  );
};