import PendingRequest from "../pendingRequest/PendingRequest"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import RejectedVendorPage from "../rejectedModal/RejectedVendorPage"
import ImageCropper from "@/components/other components/ImageCropper"
import { useUpdateProfileImageMutation, useUploadeImageToCloudinaryMutation, useVendorLogout, useUpdateVendorDetailsMutation } from "@/hooks/VendorCustomHooks"
import { toast } from "react-toastify"
import { addVendor, removeVendor } from "@/store/slices/vendor/vendorSlice"
import { isAxiosError } from "axios"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { removeVendorToken } from "@/store/slices/vendor/vendorTokenSlice"
import * as Yup from 'yup';
export default function VendorProfile() {
  const vendor = useSelector((state: RootState) => state.vendorSlice.vendor)
  const [isPending, setIsPending] = useState(false)
  const [rejected, setRejected] = useState(false)
  const [showCropper, setShowCropper] = useState<boolean>(false)
  const [croppedImage, setCroppedImage] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<string>('')
  const [changedProfile, setChangedProfile] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [about, setAbout] = useState<string>(vendor?.aboutVendor || '')
  const [phone, setPhone] = useState<string>(vendor?.phone?.toString() || '')
  const [name, setName] = useState<string>(vendor?.name || '')
  const activeSection = 'profile'
  useEffect(() => {
    if (vendor) {
      if (vendor?.vendorStatus === 'pending') {
        setIsPending(true)
      } else if (vendor?.vendorStatus === 'rejected') {
        setRejected(true)
      }
    }
  }, [vendor])


  const dispatch = useDispatch()

  const uploadCloudinary = useUploadeImageToCloudinaryMutation()
  const updateImage = useUpdateProfileImageMutation()


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const imageString = URL.createObjectURL(file);
      setSelectedImage(imageString);
      setShowCropper(true);
      setChangedProfile(true)

    } catch (error) {
      handleError(error, "Error selecting image");
    }
  };

  const handleImageSave = async () => {
    try {
      const formdata = new FormData()
      if (!croppedImage) {
        toast.error("Please crop the image before uploading.");
        return;
      }
      const fileToUpload = croppedImage
      formdata.append('file', fileToUpload)
      formdata.append('upload_preset', 'vendor_id')
      const response = await uploadCloudinary.mutateAsync(formdata)
      if (vendor && vendor._id) {
        updateImage.mutate({ id: vendor._id, imageUrl: response.secure_url }, {
          onSuccess: (data) => {
            toast.success(data.message || 'Profile image updated')
            dispatch(addVendor(data.updatedVendor))
          },
          onError: (err) => {
            handleError(err, "Error uploading profileImage in db")
          }
        })
      }
      setChangedProfile(false)

    } catch (error) {
      handleError(error, "Error uploading image")

    }

  }

  const updateVendorDetails = useUpdateVendorDetailsMutation()

  const nameValidation = Yup.string()
    .required('Name is required')
    .test('three-words', 'Name must contain at least 3 words', value => {
      if (!value) return false;
      const words = value.trim().split(/\s+/);
      return words.length >= 3;
    })
    .matches(/^[A-Za-z ]+$/, 'Name can only contain letters and spaces')
    .test('no-empty-words', 'Name should not contain empty words', value => {
      if (!value) return false;
      return value.trim().split(/\s+/).every(word => word.trim().length > 0);
    });

  const handleUpdateDetails = async () => {
    if (!vendor?._id) return
    try {
      nameValidation.validateSync(name)
      updateVendorDetails.mutate(
        { id: vendor._id, about, phone, name },
        {
          onSuccess: (data) => {
            console.log(data)
            toast.success('Details updated successfully')
            dispatch(addVendor(data.updatedVendor))
            setIsEditing(false)
          },
          onError: (err) => {
            toast.error(err.message)
          },
        }
      )
    } catch (error) {
      // handleError(error, 'Error updating vendor details')
      if (error instanceof Yup.ValidationError) {
        toast.error(error.message);
      } else {
        handleError(error, 'Error updating vendor details');
      }
    }
  }

  const handleError = (error: unknown, message: string) => {
    console.error(message, error);
    if (error instanceof Error) {
      toast.error(error.message);
    }
    if (isAxiosError(error)) {
      toast.error(error.response?.data.message || "An error occurred");
    }
  };

  const vendorLogout = useVendorLogout()
  const navigate = useNavigate()
  const handleLogout = () => {

    vendorLogout.mutate(undefined, {
      onSuccess: () => {
        localStorage.removeItem('vendorId')
        dispatch(removeVendor(null))
        dispatch(removeVendorToken(null))
        navigate('/vendor/login')
        toast.success('Logout SuccesFull')
      },
      onError: (err) => {
        toast.error(err.message)
      }
    })

  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {isPending && <PendingRequest />}
      {rejected && <RejectedVendorPage reason={vendor?.rejectReason} />}
      {showCropper && <ImageCropper showCropper={setShowCropper} onCropComplete={setCroppedImage} image={selectedImage} />}
      <main className="flex-1 p-6 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <header className="mb-8">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            >
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mt-3 text-lg"
            >
              Welcome back, {vendor?.name || 'Vendor'}! Here's your {activeSection} overview.
            </motion.p>
          </header>

          <motion.div
            className="bg-white rounded-xl shadow-lg p-8 backdrop-blur-sm bg-opacity-95"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {activeSection === "profile" && (
              <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-8">
                  <motion.div
                    className="relative h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden relative group">
                      {vendor?.profileImage ? (
                        <img
                          src={croppedImage ? URL.createObjectURL(croppedImage) : vendor?.profileImage}
                          alt={vendor.name || 'Profile'}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-3xl font-semibold">
                          {vendor?.name?.charAt(0) || 'V'}
                        </span>
                      )}
                      <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                          Profile Photo
                        </span>
                      </div>
                    </div>
                  </motion.div>
                  <div className="mt-4 md:mt-0">
                    {isEditing ? (
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-2xl font-bold text-gray-800 border rounded px-2 py-1 mb-2"
                      />
                    ) : (
                      <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                    )}
                    <p className="text-purple-600 font-medium mt-1">Professional Event Vendor</p>
                    <p className="text-sm text-gray-500 mt-2 flex pb-3 items-center">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                      </svg>
                      Vendor ID: {vendor?.vendorId || 'Not Available'}
                    </p>
                    {changedProfile && <Button onClick={handleImageSave}>UPDATE IMAGE</Button>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <motion.div
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="flex items-center">
                        <span className="font-medium mr-2">Email:</span>
                        {vendor?.email || 'Not Available'}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">Phone:</span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border rounded px-2 py-1 text-gray-700"
                          />
                        ) : (
                          <span>{phone || 'Not Available'}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">About:</span>
                        {isEditing ? (
                          <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            className="border rounded px-2 py-1  text-gray-700 w-full"
                            rows={3}
                          />
                        ) : (
                          <span className="line-clamp-3 overflow-y-auto">{about || 'Not Available'}</span>
                        )}
                      </div>
                      <div className="mt-2">
                        {isEditing ? (
                          <div className="space-x-2">
                            <Button onClick={handleUpdateDetails}>Save</Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                          </div>
                        ) : (
                          <Button variant="outline" onClick={() => setIsEditing(true)}>Edit Details</Button>
                        )}
                      </div>
                      <p className="flex items-center">
                        <span className="font-medium mr-2">Status:</span>
                        <span className={`capitalize ${vendor?.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
                          {vendor?.status || 'Not Available'}
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                      </svg>
                      Vendor Status
                    </h3>
                    <div className="space-y-3 text-gray-600">
                      <p className="flex items-center">
                        <span className="font-medium mr-2">Account Type:</span>
                        <span className="capitalize">{vendor?.role || 'Not Available'}</span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium mr-2">Verification Status:</span>
                        <span className={`capitalize ${vendor?.vendorStatus === 'approved' ? 'text-green-600' : vendor?.vendorStatus === 'pending' ? 'text-yellow-600' : 'text-red-600'}`}>
                          {vendor?.vendorStatus || 'Not Available'}
                        </span>
                      </p>
                      <p className="flex items-center">
                        <span className="font-medium mr-2">ID:</span>
                        <span className="font-mono text-sm">{vendor?._id || 'Not Available'}</span>
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}
            <Button onClick={handleLogout}>LOGOUT</Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
