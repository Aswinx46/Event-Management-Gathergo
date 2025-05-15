import Pagination from '@/components/other components/Pagination'
import { WalletCard } from '@/components/other components/wallet/Wallet'
import { useFindWalletClient } from '@/hooks/ClientCustomHooks'
import { RootState } from '@/store/store'
import  { useState } from 'react'
import { useSelector } from 'react-redux'

function ClientWallet() {
  const clientId = useSelector((state: RootState) => state.clientSlice.client?._id)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const findWalletDetails = useFindWalletClient(clientId!, currentPage)
  const walletDetails = findWalletDetails.data?.wallet
  console.log(walletDetails)
  const transactions = findWalletDetails.data?.transactions
  const totalPages = findWalletDetails.data?.totalPages
  return (
    <div>
      <WalletCard wallet={walletDetails} transactions={transactions} />
      <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages}/>
    </div>
  )
}

export default ClientWallet
