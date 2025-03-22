import PendingRequest from "../pendingRequest/PendingRequest"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Sidebar } from "../sidebar/Sidebar"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"
export default function VendorDashboard() {
  const [activeSection, setActiveSection] = useState("profile")

  const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)
  const [isPending, setIsPending] = useState<boolean>(true)
  useEffect(() => {
    if (vendor) {
      if (vendor?.vendorStatus == 'pending') {
        setIsPending(true)
      }
    }
  }, [])


  return (
    <div className="flex h-screen bg-gray-50 ">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      {isPending && <PendingRequest/>}
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


          </div>
        </motion.div>
      </main>
    </div>
  )
}

