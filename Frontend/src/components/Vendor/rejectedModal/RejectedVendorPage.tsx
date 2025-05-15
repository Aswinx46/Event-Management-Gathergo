import { useDispatch } from 'react-redux'
import { removeVendor } from '@/store/slices/vendor/vendorSlice'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { removeVendorToken } from '@/store/slices/vendor/vendorTokenSlice'


interface RejectedVendorPageProps {
  reason?: string; // Optional string type
}


export default function RejectedVendorPage({ reason }: RejectedVendorPageProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(removeVendor({}))
    dispatch(removeVendorToken({}))
    navigate('/vendor/login')
  }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full relative"
        >
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-600 rounded-t-xl" />

          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Access Denied</h2>
            <p className="text-gray-600">
              Your vendor account has been rejected and you no longer have access to the platform.
            </p>
          </div>

          <div className="bg-red-50 rounded-lg p-4 mb-6 border border-red-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Reason for Rejection:</h3>
            <p className="text-gray-700">
              {reason || 'Your application does not meet our current requirements.'}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 text-center">
              If you believe this is a mistake or would like to appeal this decision,
              please contact our support team at support@gathergo.com
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              Logout
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}