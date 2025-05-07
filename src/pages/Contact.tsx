import React, { useContext } from "react";
import Navbar from "@/components/homepage/Navbar";
import AuthNavbar from "@/components/homepage/AuthNavbar";
import { RoleContext } from "../router/App";

const Contact = () => {
  const { userRole } = useContext(RoleContext);
  const isAuthenticated = !!userRole;

  return (
    <div className="min-h-screen w-full">
      <div className="w-full px-6 py-4">
        {isAuthenticated ? <AuthNavbar /> : <Navbar />}
      </div>

      <div className="mx-auto max-w-[1524px] py-8">
        {/* Heading Shape */}
        <div className="w-[756px] h-[127px] bg-[url('/blue-shape.svg')] bg-cover relative mb-12">
          <div className="absolute w-[239px] h-[89px] top-[18px] left-[396px] text-black font-bold text-5xl font-cairo">
            Contact Us
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-3xl font-bold text-[#0B294B] mb-6">Get in Touch</h2>
                <p className="text-gray-700 mb-6">
                  Have questions about our services? We're here to help! Reach out to us through any of the following channels.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0B294B]">Email</h3>
                      <p className="text-gray-700">support@byteminds.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0B294B]">Phone</h3>
                      <p className="text-gray-700">+1 (555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-[#E5DEFF] rounded-full flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0B294B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0B294B]">Address</h3>
                      <p className="text-gray-700">123 Fitness Street<br />San Francisco, CA 94105</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-[#0B294B] mb-6">Send us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0B294B] focus:ring-[#0B294B]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0B294B] text-white py-2 px-4 rounded-md hover:bg-[#0a2544] focus:outline-none focus:ring-2 focus:ring-[#0B294B] focus:ring-offset-2"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
