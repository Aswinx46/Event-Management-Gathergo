"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "../sidebar/Sidebar"

export default function VendorDashboard() {
  const [activeSection, setActiveSection] = useState("profile")

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </h1>
            <p className="text-gray-600 mt-2">Welcome back, Vendor! Here's your {activeSection} overview.</p>
          </header>

          {/* Placeholder content for each section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            {activeSection === "profile" && (
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Photo</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">John Doe</h2>
                    <p className="text-gray-600">Professional Photographer</p>
                    <p className="text-sm text-gray-500 mt-1">Member since Jan 2023</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                    <p className="text-gray-600">Email: john.doe@example.com</p>
                    <p className="text-gray-600">Phone: (123) 456-7890</p>
                    <p className="text-gray-600">Location: New York, NY</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Business Details</h3>
                    <p className="text-gray-600">Business Name: JD Photography</p>
                    <p className="text-gray-600">Tax ID: XXX-XX-XXXX</p>
                    <p className="text-gray-600">Years in Business: 5</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "checkStatus" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Service Status</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Wedding Photography Package</h3>
                      <p className="text-sm text-gray-600">Submitted on March 15, 2023</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Approved
                    </span>
                  </div>
                  <div className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">Corporate Event Coverage</h3>
                      <p className="text-sm text-gray-600">Submitted on April 2, 2023</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "service" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Services</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Wedding Photography</h3>
                    <p className="text-gray-600 mt-1">Full day coverage with edited photos and albums</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-lg font-bold">$1,500</span>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Portrait Session</h3>
                    <p className="text-gray-600 mt-1">1-hour session with 10 edited photos</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-lg font-bold">$250</span>
                      <button className="text-blue-600 hover:text-blue-800">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "workSamples" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Work Samples</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">Sample {item}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Upload New Sample
                </button>
              </div>
            )}

            {activeSection === "bookings" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Wedding Photography</h3>
                      <span className="text-sm font-medium text-blue-600">$1,500</span>
                    </div>
                    <p className="text-gray-600 mt-1">Client: Sarah & Michael</p>
                    <p className="text-gray-600">Date: June 15, 2023 • 10:00 AM - 8:00 PM</p>
                    <p className="text-gray-600">Location: Grand Plaza Hotel</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Corporate Event</h3>
                      <span className="text-sm font-medium text-blue-600">$800</span>
                    </div>
                    <p className="text-gray-600 mt-1">Client: Acme Inc.</p>
                    <p className="text-gray-600">Date: June 22, 2023 • 1:00 PM - 5:00 PM</p>
                    <p className="text-gray-600">Location: Acme Headquarters</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "events" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Photography Workshop</h3>
                    <p className="text-gray-600 mt-1">Date: July 10, 2023 • 2:00 PM - 5:00 PM</p>
                    <p className="text-gray-600">Location: Creative Studio</p>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">Host</span>
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Photography Exhibition</h3>
                    <p className="text-gray-600 mt-1">Date: August 5-7, 2023</p>
                    <p className="text-gray-600">Location: City Art Gallery</p>
                    <div className="mt-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                        Participant
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "changePassword" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Change Password</h2>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            )}

            {activeSection === "wallet" && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Wallet</h2>
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 text-white mb-6">
                  <p className="text-sm opacity-80">Available Balance</p>
                  <p className="text-3xl font-bold mt-1">$2,450.00</p>
                  <div className="flex space-x-2 mt-4">
                    <button className="px-4 py-2 bg-white text-blue-700 rounded-lg font-medium text-sm">
                      Withdraw
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white border border-white rounded-lg font-medium text-sm">
                      View History
                    </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Recent Transactions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border-b">
                      <div>
                        <p className="font-medium">Wedding Photography</p>
                        <p className="text-sm text-gray-600">May 15, 2023</p>
                      </div>
                      <span className="text-green-600 font-medium">+$1,500.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b">
                      <div>
                        <p className="font-medium">Withdrawal to Bank</p>
                        <p className="text-sm text-gray-600">May 10, 2023</p>
                      </div>
                      <span className="text-red-600 font-medium">-$1,000.00</span>
                    </div>
                    <div className="flex justify-between items-center p-3 border-b">
                      <div>
                        <p className="font-medium">Portrait Session</p>
                        <p className="text-sm text-gray-600">May 5, 2023</p>
                      </div>
                      <span className="text-green-600 font-medium">+$250.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  )
}

