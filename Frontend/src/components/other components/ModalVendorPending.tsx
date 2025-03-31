import React from "react"

function ModalVendorPending() {
  return (
    <div className='absolute z-50 top-0 backdrop-blur-2xl right-0 h-screen w-screen flex justify-center items-center'>
      <div className='rounded-2xl bg-white'>
        <p className='text-2xl'>Account created please wait for the Admin Approval... You can check the status in the home page</p>

      </div>
    </div>
  )
}
export default React.memo(ModalVendorPending)
