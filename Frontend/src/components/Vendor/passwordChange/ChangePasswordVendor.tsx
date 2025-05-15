import PasswordChange from '@/components/Client/profile/ChangePassword'
import { useVendorChangePassword } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'

function ChangePasswordVendor() {
    const changePasswordVendorMutation = useVendorChangePassword()
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    return (
        <div>
            {vendorId && <PasswordChange changePasswordMutation={changePasswordVendorMutation} userId={vendorId} />}
        </div>
    )
}

export default ChangePasswordVendor
