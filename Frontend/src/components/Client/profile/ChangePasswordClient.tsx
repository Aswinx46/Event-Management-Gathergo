import { RootState } from '@/store/store'
import PasswordChange from './ChangePassword'
import { useChangePasswordClient } from '@/hooks/ClientCustomHooks'
import { useSelector } from 'react-redux'

function ChangePasswordClient() {
  const changePasswordClient = useChangePasswordClient()
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)

  return (
    <div>
      {clientId && <PasswordChange changePasswordMutation={changePasswordClient} userId={clientId} />}
    </div>
  )
}

export default ChangePasswordClient
