
import React from "react";
import { Link } from "react-router-dom";

const HelpPageHeader = () => {
  return (
    <div className="w-full mb-8">
      <Link to="/contact" className="hover:opacity-80 transition-opacity">
        <h1 className="text-3xl font-bold">Help & Support</h1>
      </Link>
    </div>
  );
};

export default HelpPageHeader;
